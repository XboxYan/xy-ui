import './xy-button.js';

export default class XyPagination extends HTMLElement {

    static get observedAttributes() { return ['pagesize','total'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:flex;
            font-size:14px;
        }
        xy-button {
            margin: 0 .3em;
            width: 2.3em;
            height: 2.3em;
            padding: 1px;
            font-size: inherit;
            box-sizing: content-box;
        }
        .simple-page{
            width:auto;
            padding:0 .625em;
        }
        xy-button[tabindex]{
            justify-content: center;
            align-items: center;
            pointer-events: none;
        }
        .page-ellipsis xy-icon{
            margin:auto;
        }
        xy-button[current] {
            background: var(--themeBackground,var(--themeColor,#42b983));
            border-color: var(--themeColor,#42b983);
            color:#fff;
        }
        .page{
            display:inline-flex;
        }
        .icon{
            width:1em;
            height:1em;
            fill: currentColor;
        }
        </style>
        <xy-button type="flat" id="left" ${this.href?"href=1":""} target="_self">
            <svg class="icon" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
        </xy-button>
        <div class="page" id="page"></div>
        <xy-button type="flat" id="right" ${this.href?"href=1":""} target="_self">
            <svg class="icon" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path></svg>
        </xy-button>
        `
    }

    get defaultcurrent() {
        return this.getAttribute('defaultcurrent')||1;
    }

    get pagesize() {
        return this.getAttribute('pagesize')||1;
    }

    get simple() {
        return this.getAttribute('simple')!==null;
    }

    get total() {
        return this.getAttribute('total')||0;
    }

    get current(){
        return this.$current;
    }

    get href(){
        //?page=1
        return this.getAttribute('href');
    }

    set current(current){
        if(this.$current!==current){
            current = Math.min(Math.max(1,current),this.count);
            this.$current = current;
            this.updatePage(current);
            if(this.init){
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        current: current,
                        pagesize: this.pagesize,
                        total: this.total,
                    }
                }));
            }
        }
    }

    set defaultvalue(value){
        this.setAttribute('defaultvalue', value);
    }

    set pagesize(value){
        this.setAttribute('pagesize', value);
    }

    set total(value){
        this.setAttribute('total', value);
    }

    render(pagesize,total){
        this.count = Math.ceil(total/pagesize);
        const current = Math.min(Math.max(1,this.current),this.count);
        if(this.simple){
            const html = `<xy-button class="simple-page" tabindex="-1" type="flat">${current} / ${this.count}</xy-button>`;
            this.page.innerHTML = html;
        }else{
            const html = Array.from({length:this.count},(el,i)=>i).splice(0,9).map(el=>`<xy-button ${this.href?"href="+(el+1):""} target="_self" ${el+1==current?"current":""} type="flat" data-current="${el+1}">${el+1}</xy-button>`).join('');
            this.page.innerHTML = html;
        }
        this.updatePage(current);
    }

    updatePage(current=this.current){
        this.left.disabled = current==1;
        this.right.disabled = current==this.count;
        if(this.href){
            this.left.href = this.href + '=' + (current-1);
            this.right.href = this.href + '=' + (current+1);
        }
        if(this.simple){
            this.page.querySelector('.simple-page').textContent = current + ' / ' + this.count;
        }else{
            if( this.count>9 ){
                let place = [];
                switch (current) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        place = [1,2,3,4,5,6,7,'next',this.count];
                        break;
                    case this.count:
                    case this.count-1:
                    case this.count-2:
                    case this.count-3:
                    case this.count-4:
                        place = [1,'pre',this.count-6,this.count-5,this.count-4,this.count-3,this.count-2,this.count-1,this.count];
                        break;
                    default:
                        place = [1,'pre',current-2,current-1,current,current+1,current+2,'next',this.count];
                        break;
                }
                this.page.querySelectorAll('xy-button').forEach((el,i)=>{
                    if( typeof place[i] === 'number'){
                        el.dataset.current = place[i];
                        el.textContent = place[i];
                        el.disabled = false;
                        if(place[i]==current){
                            el.setAttribute("current","");
                            el.focus();
                        }else{
                            el.removeAttribute("current");
                        }
                        el.removeAttribute("tabindex");
                        if(this.href){
                            el.href = this.href + '=' + place[i];
                        }
                    }else{
                        el.textContent = '...';
                        el.removeAttribute("current");
                        el.setAttribute("tabindex",-1);
                    }
                })
            }else{
                this.page.querySelectorAll('xy-button').forEach((el,i)=>{
                    if(el.dataset.current==current){
                        el.setAttribute("current","");
                        el.focus();
                    }else{
                        el.removeAttribute("current");
                    }
                    if(this.href){
                        el.href = this.href + '=' + el.dataset.current;
                    }
                })
            }
        }
    }

    connectedCallback() {
        this.page = this.shadowRoot.getElementById('page');
        this.left = this.shadowRoot.getElementById('left');
        this.right = this.shadowRoot.getElementById('right');
        this.$current = this.defaultcurrent;
        this.render(this.pagesize,this.total);
        this.page.addEventListener('click',(ev)=>{
            const item = ev.target.closest('xy-button');
            if(item){
                this.current = Number(item.dataset.current);
            }
        })
        this.addEventListener('keydown',(ev)=>{
            switch (ev.keyCode) {
                case 37://ArrowLeft
                    this.current--;
                    break;
                case 39://ArrowRight
                    this.current++;
                    break;
                default:
                    break;
            }
        })
        this.left.addEventListener('click',(ev)=>{
            this.current--;
        })
        this.right.addEventListener('click',(ev)=>{
            this.current++;
        })
        this.init = true;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'pagesize' && this.page) {
            this.render(newValue,this.total);
        }
        if (name == 'total' && this.page) {
            this.render(this.pagesize,newValue);
        }
    }
}

if(!customElements.get('xy-pagination')){
    customElements.define('xy-pagination', XyPagination);
}

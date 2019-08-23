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
            padding: 0;
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
            background-color: var(--themeColor,#42b983);
            border-color: var(--themeColor,#42b983);
            color:#fff;
        }
        .page{
            display:inline-flex;
        }
        </style>
        <xy-button type="flat" icon="left" id="left"></xy-button>
        <div class="page" id="page"></div>
        <xy-button type="flat" icon="right" id="right"></xy-button>
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
            const html = [...new Array(this.count).keys()].splice(0,9).map(el=>`<xy-button ${el+1==current?"current":""} type="flat" data-current="${el+1}">${el+1}</xy-button>`).join('');
            this.page.innerHTML = html;
        }
        this.updatePage(current);
    }

    updatePage(current=this.current){
        this.left.disabled = current==1;
        this.right.disabled = current==this.count;
        if(this.simple){
            this.page.querySelector('.simple-page').innerText = current + ' / ' + this.count;
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
                        el.innerText = place[i];
                        el.disabled = false;
                        if(place[i]==current){
                            el.setAttribute("current","");
                            el.focus();
                        }else{
                            el.removeAttribute("current");
                        }
                        el.removeAttribute("tabindex");
                    }else{
                        el.innerText = '...';
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

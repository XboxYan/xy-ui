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
        .page-ellipsis{
            display:flex;
            margin: 0 .3em;
            width: 2.3em;
            height: 2.3em;
            justify-content: center;
            align-items: center;
            color: var(--fontColor,#333);
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
            display:inline-flex
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

    get total() {
        return this.getAttribute('total')||0;
    }

    get current(){
        return Math.min(Math.max(0,this.$current),this.count);
    }

    set current(current){
        /*
        const pre = this.page.querySelector(`xy-button[current]`);
        if(pre){
            pre.removeAttribute('current');
        }
        this.left.disabled = current==1;
        this.right.disabled = current==this.count;
        this.$current = current;
        const cur = this.page.querySelector(`xy-button[data-current="${current}"]`);
        cur.setAttribute('current','');
        if(this.count>9){
            // const p = cur.previousElementSibling;
            // const pp = p&&p.previousElementSibling;
            // p&&p.
        }
        */
        if(this.$current!==current){
            this.$current = current;
            this.render(this.pagesize,this.total,current);
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

    render(pagesize,total,current=this.current){
        this.count = Math.ceil(total/pagesize);
        this.left.disabled = current==1;
        this.right.disabled = current==this.count;
        if( this.count>9 ){
            let place = [];
            switch (current) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    place = [2,3,4,5,6,7,'next'];
                    break;
                case this.count:
                case this.count-1:
                case this.count-2:
                case this.count-3:
                case this.count-4:
                    place = ['pre',this.count-6,this.count-5,this.count-4,this.count-3,this.count-2,this.count-1];
                    break;
                default:
                    place = ['pre',current-2,current-1,current,current+1,current+2,'next'];
                    break;
            }
            const html = [1,...place,this.count].map(el=>{
                switch (el) {
                    case 'pre':
                    case 'next':
                        return `<span class="page-ellipsis">...</span>`;
                        break;
                    default:
                        return `<xy-button type="flat" ${el==current?"current":""} data-current="${el}">${el}</xy-button>`;
                        break;
                }
            }).join('');
            this.page.innerHTML = html;
        }else{
            const html = [...new Array(this.count).keys()].map(el=>`<xy-button ${el+1==current?"current":""} data-current="${el+1}">${el+1}</xy-button>`).join('');
            this.page.innerHTML = html;
        }
    }

    connectedCallback() {
        this.page = this.shadowRoot.getElementById('page');
        this.left = this.shadowRoot.getElementById('left');
        this.right = this.shadowRoot.getElementById('right');
        this.$current = this.defaultcurrent;
        this.render(this.pagesize,this.total,this.defaultcurrent);
        this.page.addEventListener('click',(ev)=>{
            const item = ev.target.closest('xy-button');
            if(item){
                this.current = Number(item.dataset.current);
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

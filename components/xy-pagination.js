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
        xy-button[current] {
            background-color: var(--themeColor,#42b983);
            border-color: var(--themeColor,#42b983);
            color:#fff;
        }
        .page{
            display:inline-flex
        }
        </style>
        <xy-button icon="left" id="left"></xy-button>
        <div class="page" id="page"><xy-button>1</xy-button><xy-button>1</xy-button></div>
        <xy-button icon="right" id="right"></xy-button>
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
        const pre = this.page.querySelector(`xy-button[current]`);
        if(pre){
            pre.removeAttribute('current');
        }
        this.left.disabled = current==1;
        this.right.disabled = current==this.count;
        this.$current = current;
        this.page.querySelector(`xy-button[data-current="${current}"]`).setAttribute('current','');
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
        this.left.disabled = this.current==1;
        this.right.disabled = this.current==this.count;
        const html = [...new Array(this.count).keys()].map(el=>`<xy-button ${el+1==this.current?"current":""} data-current="${el+1}">${el+1}</xy-button>`).join('');
        this.page.innerHTML = html;
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
                this.current = item.dataset.current;
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

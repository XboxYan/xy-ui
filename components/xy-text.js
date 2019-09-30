export default class XyText extends HTMLElement {

    static get observedAttributes() { return ['rows','draggable'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            font-size:14px;
            color:var(--fontColor,#333);
        }
        :host([type="warning"]){
            color:var(--waringColor,#faad14);
        }
        :host([type="error"]){
            color:var(--errorColor,#f4615c);
        }
        :host([type="success"]){
            color:var(--successColor,#52c41a);
        }
        :host([mark]){
            background:var(--waringColor,#faad14);
        }
        :host([code]){
            font-family: 'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace;
            margin: 0 .2em;
            padding: .2em .3em;
            font-size: 85%;
            border-radius: .2em;
            background-color: #f8f8f8;
            color: #e96900;
        }
        :host([rows]){
            display:block;
        }
        :host([draggable]){
            cursor:default;
        }
        :host([rows]) span{
            --rows:${this.rows};
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: var(--rows,1);
            overflow: hidden;
        }
        </style>
        <span id="txt"><slot></slot></span>
        `
    }

    get rows() {
        return this.getAttribute('rows');
    }

    get draggable() {
        return this.getAttribute('draggable')!==null;
    }

    get truncated() {
        return this.getAttribute('truncated')!==null;
    }

    set rows(value) {
        this.setAttribute('rows', value);
    }
    
    set truncated(value) {
        if(value===null||value===false){
            this.removeAttribute('truncated');
        }else{
            this.setAttribute('truncated', '');
        }
    }

    set draggable(value) {
        if(value===null||value===false){
            this.removeAttribute('draggable');
        }else{
            this.setAttribute('draggable', true);
        }
    }

    connectedCallback(){
        this.txt = this.shadowRoot.getElementById('txt');
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                this.truncated = this.txt.scrollHeight>height;
            }
        });
        this.draggable = this.draggable;
        if(this.draggable){
            this.addEventListener('dragstart',(ev)=>{
                ev.dataTransfer.setData("text",this.textContent);
            })
        }
        this.resizeObserver.observe(this.txt);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'rows' && this.txt){
            this.txt.style.setProperty('--rows',newValue);
        }
    }

    disconnectedCallback() {
        this.resizeObserver.unobserve(this.txt);
    }
}

if(!customElements.get('xy-text')){
    customElements.define('xy-text', XyText);
}

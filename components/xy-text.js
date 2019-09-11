export default class XyText extends HTMLElement {

    static get observedAttributes() { return ['rows'] }

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
            --rows:${this.rows};
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: var(--rows,1);
            overflow: hidden;
        }
        </style>
        <slot></slot>
        `
    }

    get rows() {
        return this.getAttribute('rows');
    }

    set rows(value) {
        this.setAttribute('rows', value);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'rows' && this.shadowRoot){
            this.style.setProperty('--rows',newValue);
        }
    }
}

if(!customElements.get('xy-text')){
    customElements.define('xy-text', XyText);
}

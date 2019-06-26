import './xy-tips.mjs';

export default class XyInput extends HTMLElement {

    static get observedAttributes() { return ['value','type','label'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            box-sizing:border-box;
            display:inline-block;
            border:1px solid #d9d9d9;
            border-radius:3px;
            line-height: 30px;
            transition:border-color .3s,box-shadow .3s;
            padding: 4px 10px;
            color: #333;
        }
        :host(:focus-within){
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
        }
        :host([block]){
            display:block
        }
        :host(:focus-within),:host(:hover){
            border-color:var(--themeColor,dodgerblue);
        }
        :host([disabled]){ 
            opacity:.8; 
            --themeColor:#999; 
            cursor:not-allowed; 
        }
        :host([label]) .input::placeholder{
            color:transparent;
        }
        :host .input::placeholder{
            color:#999;
        }
        xy-tips{  
            display:flex;
            align-items:center;
        }
        .input{
            padding:0;
            color:currentColor;
            border:0;
            outline:0;
            line-height: inherit;
            font-size:inherit;
            flex:1;
            background: none;
        }
        ::-moz-focus-inner,::-moz-focus-outer{
            border:0;
            outline : 0;
        }
        :host([showtips]){
            pointer-events:all;
        }
        .input-label{
            pointer-events:none;
            margin-left:-2px;
            position:absolute;
            transition: transform .3s, color .3s, background-color .3s;
            transform-origin: left;
            padding:0 2px;
            color:#999;
        }
        .input:not(:placeholder-shown) ~ .input-label,
        .input:focus ~ .input-label{
            background-color: #fff;
            color:var(--themeColor,dodgerblue);
            transform: translateY( calc( -50% - 6px ) ) scale(0.8);
        }

        </style>
        <xy-tips id="input-con" dir="top">
            <input id="input" class="input" min=${this.min} max=${this.max} step=${this.step} ${this.disabled?"disabled":""} type="text" placeholder=${this.placeholder}>
            ${
                this.label?
                '<label class="input-label">'+this.label+'</label>'
                :
                ''
            }
        </xy-tips>
        `
    } 
    
    connectedCallback() {
        
    }

    get value() {
        return this.getAttribute('value')||0;
    }

    get min() {
        return this.getAttribute('min')||0;
    }

    get max() {
        return this.getAttribute('max')||100;
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get label() {
        return this.getAttribute('label');
    }

    get placeholder() {
        return this.getAttribute('placeholder')||this.label;
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    set placeholder(value) {
        this.setAttribute('placeholder', value);
    }

    get step() {
        return this.getAttribute('step')||1;
    }

    set value(value) {
        this.setAttribute('value', value);
    }

    set min(value) {
        this.setAttribute('min', value);
    }

    set max(value) {
        this.setAttribute('max', value);
    }

    set step(value) {
        this.setAttribute('step', value);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        
    }
    
}

if(!customElements.get('xy-input')){
    customElements.define('xy-input', XyInput);
}
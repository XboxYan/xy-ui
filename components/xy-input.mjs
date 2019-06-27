import './xy-tips.mjs';

export default class XyInput extends HTMLElement {

    static get observedAttributes() { return ['type','label'] }

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
            font-size: 14px;
        }
        :host(:focus-within){
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
            transform: translateY( calc( -50% - 6px ) ) scale(0.8);
        }
        .input:not(:placeholder-shown) ~ .input-label::after,
        .input:focus ~ .input-label::after{
            background:#fff;
        }
        .input-label::after{
            content:'';
            position:absolute;
            z-index:-1;
            left:0;
            right:0;
            height:1px;
            top:50%;
            transform:translateY( calc(-50% + 2px ) ) scaleY(1.5);
        }
        .icon-pre{
            margin-right:4px;
            transition:none;
            color:#999;
        }

        :host(:focus-within) .icon-pre,:host(:hover) .icon-pre,:host(:hover) .input-label,:host(:focus-within) .input-label{
            color:var(--themeColor,dodgerblue);
        }

        </style>
        <xy-tips id="input-con" dir="top">
            ${
                this.icon?
                '<xy-icon class="icon-pre" name='+this.icon+'></xy-icon>'
                :
                ''
            }
            <input id="input" class="input" min=${this.min} max=${this.max} step=${this.step} ${this.disabled?"disabled":""} value="${this.defaultvalue}" type="text" placeholder=${this.placeholder}>
            ${
                this.label&&!this.icon?
                '<label class="input-label">'+this.label+'</label>'
                :
                ''
            }
        </xy-tips>
        `
    } 
    
    connectedCallback() {
        this.input = this.shadowRoot.getElementById('input');
        this.input.addEventListener('input',()=>{
            this.dispatchEvent(new CustomEvent('input',{
                detail:{
                    value:this.value
                }
            }));
        })
        this.input.addEventListener('change',()=>{
            this.dispatchEvent(new CustomEvent('change',{
                detail:{
                    value:this.value
                }
            }));
        })
    }

    get value() {
        return this.input.value;
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||'';
    }

    get icon() {
        return this.getAttribute('icon');
    }

    get type() {
        return this.getAttribute('type');
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get label() {
        return this.getAttribute('label')||'';
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

    set icon(value) {
        this.setAttribute('icon', value);
    }

    set placeholder(value) {
        this.setAttribute('placeholder', value);
    }

    set value(value) {
        this.input.value = value;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        
    }
    
}

if(!customElements.get('xy-input')){
    customElements.define('xy-input', XyInput);
}
import './xy-tips.mjs';
import './xy-button.mjs';

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
            -webkit-appearance: none;
            -moz-appearance: textfield;
            background: none;
        }
        input[type="number"]::-webkit-inner-spin-button{
            display:none;
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
        .input:-moz-ui-invalid{
            box-shadow:none;
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
            color:#999;
        }

        .btn-right{
            width:2em;
            height:2em;
            margin-right:-5px;
            color:#999;
            font-size:inherit;
        }
        .btn-number{
            display:flex;
            flex-direction:column;
            width:1em;
        }
        .btn-number xy-button{
            display: block;
            color: #999;
            border-radius:0;
            width:1em;
            flex:1;
            transition:.2s;
        }

        .btn-number xy-button:hover{
            flex:1.5;
        }

        xy-button:hover,xy-button:focus-within{
            color:var(--themeColor,dodgerblue);
        }

        :host(:focus-within) .icon-pre,:host(:hover) .icon-pre,:host(:hover) .input-label,:host(:focus-within) .input-label{
            color:var(--themeColor,dodgerblue);
        }

        </style>
        <xy-tips id="input-con" dir="top" type="error">
            ${
                this.icon?
                '<xy-icon class="icon-pre" name='+this.icon+'></xy-icon>'
                :
                ''
            }
            <input id="input" class="input" ${this.type === 'number'?'min="'+this.min+'" max="'+this.max+'" step="'+this.step+'"':""} ${this.disabled?"disabled":""} ${this.required?"required":""} ${this.pattern?"pattern='"+this.pattern+"'":""} value="${this.defaultvalue}" type="${this.typeMap(this.type)}" placeholder="${this.placeholder}" minlength="${this.minlength}" maxlength="${this.maxlength}">
            ${
                this.label&&!this.icon?
                '<label class="input-label">'+this.label+'</label>'
                :
                ''
            }
            ${
                this.type === 'password'?
                '<xy-button id="btn-pass" class="btn-right" icon="eye-close" type="flat" shape="circle"></xy-button>'
                :
                ''
            }
            ${
                this.type === 'search'?
                '<xy-button id="btn-search" class="btn-right" icon="search" type="flat" shape="circle"></xy-button>'
                :
                ''
            }
            ${
                this.type === 'number'?
                '<div class="btn-right btn-number"><xy-button id="btn-add" icon="caret-up" type="flat"></xy-button><xy-button id="btn-sub" icon="caret-down" type="flat"></xy-button></div>'
                :
                ''
            }
        </xy-tips>
        `
    }

    checkValidity(){
        if(this.input.checkValidity()){
            this.inputCon.show = false;
        }else{
            this.inputCon.show = true;
            if(this.input.validity.valueMissing){
                this.inputCon.tips = this.input.validationMessage;
            }else{
                this.inputCon.tips = this.errortips||this.input.validationMessage;
            }
        }
    }
    
    connectedCallback() {
        this.input = this.shadowRoot.getElementById('input');
        this.inputCon = this.shadowRoot.getElementById('input-con');
        this.btnPass = this.shadowRoot.getElementById('btn-pass');
        this.btnAdd = this.shadowRoot.getElementById('btn-add');
        this.btnSub = this.shadowRoot.getElementById('btn-sub');
        this.btnSearch = this.shadowRoot.getElementById('btn-search');
        this.input.addEventListener('input',()=>{
            this.checkValidity();
            this.dispatchEvent(new CustomEvent('input',{
                detail:{
                    value:this.value
                }
            }));
        })
        this.input.addEventListener('focus',()=>{
            this.checkValidity();
            this.dispatchEvent(new CustomEvent('focus',{
                detail:{
                    value:this.value
                }
            }));
        })
        this.input.addEventListener('keydown',(ev)=>{
            switch (ev.keyCode) {
                case 13://Enter
                    this.dispatchEvent(new CustomEvent('submit',{
                        detail:{
                            value:this.value
                        }
                    }));
                    break;
                default:
                    break;
            }
        })
        if(this.btnSearch){
            this.btnSearch.addEventListener('click',()=>{
                this.dispatchEvent(new CustomEvent('submit',{
                    detail:{
                        value:this.value
                    }
                }));
            })
        }
        if(this.btnPass){
            this.btnPass.addEventListener('click',()=>{
                this.password = !this.password;
                if(this.password){
                    this.input.setAttribute('type','text');
                    this.btnPass.icon = 'eye';
                }else{
                    this.input.setAttribute('type','password');
                    this.btnPass.icon = 'eye-close';
                }
                this.input.focus();
            })
        }
        if(this.btnAdd){
            this.btnAdd.addEventListener('click',()=>{
                if(this.value<this.max){
                    this.value = Number(this.value)+Number(this.step); 
                }
            })
        }
        if(this.btnSub){
            this.btnSub.addEventListener('click',()=>{
                if(this.value>this.min){
                    this.value = Number(this.value)-Number(this.step);
                }
            })
        }
    }

    typeMap(type) {
        switch (type) {
            case 'password':
            case 'number':
            case 'email':
            case 'tel':
                break;
            default:
                type = 'text'
                break;
        }
        return type;
    }

    get value() {
        return this.input.value;
    }

    get validity() {
        return this.input.checkValidity();
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

    get min() {
        return this.getAttribute('min')||0;
    }

    get max() {
        return this.getAttribute('max')||Infinity;
    }

    get minlength() {
        return this.getAttribute('minlength')||'';
    }

    get maxlength() {
        return this.getAttribute('maxlength')||'';
    }

    get step() {
        return this.getAttribute('step')||1;
    }

    get required() {
        return this.getAttribute('required')!==null;
    }

    get pattern() {
        return this.getAttribute('pattern');
    }

    get errortips() {
        return this.getAttribute('errortips');
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set required(value) {
        if(value===null||value===false){
            this.removeAttribute('required');
        }else{
            this.setAttribute('required', '');
        }
    }

    set pattern(value) {
        if(value===null||value===false){
            this.removeAttribute('pattern');
        }else{
            this.setAttribute('pattern', '');
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
        this.checkValidity();
        this.dispatchEvent(new CustomEvent('change',{
            detail:{
                value:this.value
            }
        }));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        
    }
    
}

if(!customElements.get('xy-input')){
    customElements.define('xy-input', XyInput);
}
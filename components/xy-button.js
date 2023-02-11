import './xy-loading.js';
import './xy-icon.js';

export default class XyButton extends HTMLElement {
    //https://mladenplavsic.github.io/css-ripple-effect
    static get observedAttributes() { return ['disabled','icon','loading','href','htmltype','size'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ 
            position:relative; 
            display: inline-flex; 
            gap: 4px;
            padding: 4px 15px;
            box-sizing: border-box; 
            height: 32px;
            align-items:center;
            justify-content: center;
            border:1px solid var(--borderColor, #d9d9d9); 
            font-size: 14px; 
            color: var(--fontColor, rgba(0,0,0,.88));  
            border-radius: var(--borderRadius,4px); 
            transition: .2s;
        }
        :host([shape="circle"]){ 
            border-radius:50%; 
        }
        :host(:not([disabled])){
            cursor: pointer;
        }
        :host([disabled]),:host([loading]){
            pointer-events: none; 
            opacity:.6; 
        }
        :host([block]){ 
            width: -webkit-fill-available;
        }
        :host([disabled]:not([type])){ 
            background:rgba(0,0,0,.1); 
        }
        :host([disabled]),:host([loading]){ 
            cursor: default; 
            pointer-events: all; 
        }
        :host(:not([type="primary"]):not([disabled]):hover),
        :host([type="flat"][focus]){ 
            color:var(--themeColor,#42b983); 
            border-color: var(--themeColor,#42b983); 
        }
        :host([type="primary"]){ 
            color: #fff; 
            background:var(--themeBackground,var(--themeColor,#42b983));
        }
        :host([danger]){ 
            --themeColor: var(--dangerColor,#ff7875);
        }
        :host([danger]:not([type="primary"])){ 
            color: var(--themeColor);
            border-color: var(--themeColor);
        }
        :host([type="dashed"]){ 
            border-style:dashed 
        }
        :host([type="flat"]),:host([type="link"]),:host([type="primary"]){ 
            border:0;
        }
        :host([type="link"]) {
            color: var(--themeColor,#42b983);
        }
        :host([type="flat"]) .btn::before{ 
            content:''; 
            background:var(--themeColor,#42b983);
        }
        :host([type="flat"]:not([disabled]):hover) .btn::before{ 
            opacity:.1 
        }
        :host(:not([disabled]):hover){ 
            z-index:1 
        }
        :host([type="flat"][focus]) .btn:before{ 
            opacity:.2; 
        }
        .btn{ 
            position: absolute; 
            background:none; 
            outline:0;
            border:0; 
            inset: 0;
            user-select: none;
            cursor: unset;
            border-radius: inherit;
        }
        ::-moz-focus-inner{
            border:0;
        }
        .btn::before{
            content: "";
            position: absolute;
            inset :0;
            transition:.2s;
            background:#fff;
            border-radius: inherit;
            opacity:0;
        }
        .btn::after{
            content: "";
            position: absolute;
            inset :0;
            border-radius: inherit;
            opacity: 0;
            transition:.2s;
            box-shadow: 0 0 0 4px var(--themeColor)
        }
        .btn:focus-visible::after{
            opacity: .2;
        }
        :host([type=primary]:not([disabled]):hover),
        :host([type=link]:not([disabled]):hover){ 
            filter: brightness(1.1)
        }
        :host(:not([disabled]):not([type=flat]):not([type=link]):not([type=primary]):active) .btn::before{ 
            background-color: var(--themeColor);
            opacity: .1;
        }
        :host(:not([disabled])[type=flat]:active) .btn::before{ 
            opacity: .3;
        }
        :host([type=primary]:not([disabled]):active),
        :host([type=link]:not([disabled]):active){ 
            filter: brightness(0.9)
        }
        :host([size=small]){ 
            height: 24px;
            padding: 0 7px;
        }
        :host([size=small]){ 
            height: 24px;
            padding: 0 7px;
        }
        :host([size=large]){ 
            font-size: 16px;
            height: 40px;
            padding: 6px 15px;
            border-radius: 8px;
        }
        xy-icon{
            transition: none;
        }
        :host(:empty) xy-icon{
            margin: auto;
        }
        :host(:empty){
            padding: 0;
            width: 32px;
        }
        :host([size=small]:empty){
            width: 24px;
        }
        :host([size=large]:empty){
            width: 40px;
        }
        ::slotted(xy-icon){
            transition: none;
        }
        </style>
        <${this.href?'a':'button'} ${this.htmltype?'type="'+this.htmltype+'"':''} ${(this.download&&this.href)?'download="'+this.download+'"':''} ${this.href?'href="'+this.href+'" target="'+this.target+'" rel="'+this.rel+'"':''} class="btn" id="btn"></${this.href?'a':'button'}>${!this.loading && this.icon && this.icon!='null'?'<xy-icon id="icon" name='+this.icon+'></xy-icon>':''}<slot></slot>
        `
    }

    focus() {
        this.btn.focus();
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get toggle() {
        return this.getAttribute('toggle')!==null;
    }

    get htmltype() {
        return this.getAttribute('htmltype');
    }

    get name() {
        return this.getAttribute('name');
    }

    get checked() {
        return this.getAttribute('checked')!==null;
    }

    get href() {
        return this.getAttribute('href');
    }

    get target() {
        return this.getAttribute('target')||'_blank';
    }

    get rel() {
        return this.getAttribute('rel');
    }

    get size() {
        return this.getAttribute('size') || 'default';
    }

    get download() {
        return this.getAttribute('download');
    }

    get icon() {
        return this.getAttribute('icon');
    }

    get loading() {
        return this.getAttribute('loading')!==null;
    }

    set icon(value) {
        this.setAttribute('icon', value);
    }

    set htmltype(value) {
        this.setAttribute('htmltype', value);
    }

    set href(value) {
        this.setAttribute('href', value);
    }

    set size(value) {
        this.setAttribute('size', value);
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set checked(value) {
        if(value===null||value===false){
            this.removeAttribute('checked');
        }else{
            this.setAttribute('checked', '');
        }
    }

    set loading(value) {
        if(value===null||value===false){
            this.removeAttribute('loading');
        }else{
            this.setAttribute('loading', '');
        }
    }

    connectedCallback() {
        this.btn = this.shadowRoot.getElementById('btn');
        this.ico = this.shadowRoot.getElementById('icon');
        this.load = document.createElement('xy-loading');
        this.load.style.color = 'inherit';
        this.addEventListener('click',function(){
            if(this.toggle){
                this.checked=!this.checked;
            }
        })
        this.btn.addEventListener('keydown', (ev) => {
            switch (ev.key) {
                case 'Enter'://Enter
                    ev.stopPropagation();
                    break;
                default:
                    break;
            }
        })
        this.disabled = this.disabled;
        this.loading = this.loading;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if(name == 'disabled' && this.btn){
            if(newValue!==null){
                this.btn.toggleAttribute('disabled', true);
                if(this.href){
                    this.btn.removeAttribute('href');
                }
            }else{
                this.btn.toggleAttribute('disabled', false);
                if(this.href){
                    this.btn.href = this.href;
                }
            }
        }
        if( name == 'loading' && this.btn){
            if(newValue!==null){
                this.shadowRoot.prepend(this.load);
                this.btn.toggleAttribute('disabled', true);
            }else{
                this.shadowRoot.removeChild(this.load);
                this.btn.toggleAttribute('disabled', false);
            }
        }
        if( name == 'icon' && this.ico){
            this.ico.name = newValue;
        }
        if( name == 'href' && this.btn){
            if(!this.disabled){
                this.btn.href = newValue;
            }
        }
        if( name == 'htmltype' && this.btn){
            this.btn.type = newValue;
        }
    }
}

if(!customElements.get('xy-button')){
    customElements.define('xy-button', XyButton);
}

class XyButtonGroup extends HTMLElement {
    static get observedAttributes() { return ['disabled'] }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:inline-flex;
        }
        ::slotted(xy-button:not(:first-of-type):not(:last-of-type)){
            border-radius:0;
        }
        ::slotted(xy-button){
            margin:0!important;
        }
        ::slotted(xy-button:not(:first-of-type)){
            margin-left:-1px!important;
        }
        ::slotted(xy-button[type]:not([type="dashed"]):not(:first-of-type)){
            margin-left:1px!important;
        }
        ::slotted(xy-button:first-of-type){
            border-top-right-radius: 0;
            border-bottom-right-radius: 0px;
        }
        ::slotted(xy-button:last-of-type){
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        </style>
        <slot></slot>
        `
    }


    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    set disabled(value) {
        if(value===null||value===false){
            this.toggleAttribute('disabled', false);
        }else{
            this.toggleAttribute('disabled', true);
        }
    }

    connectedCallback() {
        
    }

    attributeChangedCallback (name, oldValue, newValue) {
        
    }
}

if(!customElements.get('xy-button-group')){
    customElements.define('xy-button-group', XyButtonGroup);
}

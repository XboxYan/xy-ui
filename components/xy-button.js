import './xy-loading.js';
import './xy-icon.js';

export default class XyButton extends HTMLElement {
    //https://mladenplavsic.github.io/css-ripple-effect
    static get observedAttributes() { return ['disabled','icon','loading','href','htmltype'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ 
            position:relative; 
            display:inline-flex; 
            padding: .25em .625em;
            box-sizing:border-box; 
            vertical-align: middle;
            line-height: 1.8;
            overflow:hidden; 
            align-items:center;
            justify-content: center;
            border:1px solid var(--borderColor,#d9d9d9); 
            font-size: 14px; 
            color: var(--fontColor,#333);  
            border-radius: var(--borderRadius,.25em); 
            transition:background .3s,box-shadow .3s,border-color .3s,color .3s;
        }
        :host([shape="circle"]){ 
            border-radius:50%; 
        }
        :host([disabled]),:host([loading]){
            pointer-events: none; 
            opacity:.6; 
        }
        :host([block]){ 
            display:flex; 
        }
        :host([disabled]:not([type])){ 
            background:rgba(0,0,0,.1); 
        }
        :host([disabled]) .btn,:host([loading]) .btn{ 
            cursor: not-allowed; 
            pointer-events: all; 
        }
        :host(:not([type="primary"]):not([disabled]):hover),
        :host(:not([type="primary"]):focus-within){ 
            color:var(--themeColor,#42b983); 
            border-color: var(--themeColor,#42b983); 
        }
        :host(:not([type="primary"])) .btn::after{ 
            background-image: radial-gradient(circle, var(--themeColor,#42b983) 10%, transparent 10.01%); 
        }
        :host([type="primary"]){ 
            color: #fff; background: 
            var(--themeColor,#42b983) 
        }
        :host([type="dashed"]){ 
            border-style:dashed 
        }
        :host([type="flat"]),:host([type="primary"]){ 
            border:0;
            padding: calc( .25em + 1px ) calc( .625em + 1px );
        }
        :host([type="flat"]) .btn::before{ 
            content:''; 
            position:absolute; 
            background: var(--themeColor,#42b983); 
            pointer-events:none; 
            left:0; 
            right:0; 
            top:0; 
            bottom:0; 
            opacity:0; 
            transition:.3s;
        }
        :host([type="flat"]:not([disabled]):hover) .btn::before{ 
            opacity:.1 
        }
        :host([type="flat"]:focus-within) .btn:before{ 
            opacity:.2; 
        }
        :host(:focus-within){ 
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/ 
        }
        .btn{ 
            background:none; 
            outline:0; 
            border:0; 
            position: 
            absolute; 
            left:0; 
            top:0;
            width:100%;
            height:100%;
            padding:0;
            user-select: none;
            cursor: unset;
        }
        xy-loading{ 
            margin-right: 0.35em;  
        }
        ::-moz-focus-inner{
            border:0;
        }
        .btn::after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: var(--x,0); 
            top: var(--y,0);
            pointer-events: none;
            background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
            background-repeat: no-repeat;
            background-position: 50%;
            transform: translate(-50%,-50%) scale(10);
            opacity: 0;
            transition: transform .3s, opacity .8s;
        }
        .btn:not([disabled]):active::after {
            transform: translate(-50%,-50%) scale(0);
            opacity: .3;
            transition: 0s;
        }
        xy-icon{
            margin-right: 0.35em;
            transition: none;
        }
        :host(:empty) xy-icon{
            margin: auto;
        }
        :host(:empty){
            padding: .65em;
        }
        :host([type="flat"]:empty),:host([type="primary"]:empty){ 
            padding: calc( .65em + 1px );
        }
        ::slotted(xy-icon){
            transition: none;
        }
        :host([href]){
            cursor:pointer;
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
        this.btn.addEventListener('mousedown',function(ev){
            //ev.preventDefault();
            //ev.stopPropagation();
            const { left, top } = this.getBoundingClientRect();
            this.style.setProperty('--x',(ev.clientX - left)+'px');
            this.style.setProperty('--y',(ev.clientY - top)+'px');
        })
        this.addEventListener('click',function(ev){
            if(this.toggle){
                this.checked=!this.checked;
            }
        })
        this.disabled = this.disabled;
        this.loading = this.loading;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if(name == 'disabled' && this.btn){
            if(newValue!==null){
                this.btn.setAttribute('disabled', 'disabled');
                if(this.href){
                    this.btn.removeAttribute('href');
                }
            }else{
                this.btn.removeAttribute('disabled');
                if(this.href){
                    this.btn.href = this.href;
                }
            }
        }
        if( name == 'loading' && this.btn){
            if(newValue!==null){
                this.shadowRoot.prepend(this.load);
                this.btn.setAttribute('disabled', 'disabled');
            }else{
                this.shadowRoot.removeChild(this.load);
                this.btn.removeAttribute('disabled');
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


export default class XyRadio extends HTMLElement {

    static get observedAttributes() { return ['disabled','checked'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ 
            display:inline-block;
            font-size:14px;
            color:#333;
            -webkit-tap-highlight-color: transparent;
        }
        :host([disabled]){ 
            pointer-events: none; 
            opacity:.6; 
        }
        :host([disabled]) label{ 
            pointer-events: all;  
            cursor: not-allowed; 
        }
        #radio{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
            border-color:var(--themeColor,#42b983);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            z-index:1;
        }
        :host([disabled]) .cheked{ 
            background:rgba(0,0,0,.1);
        }
        label{
            box-sizing:border-box;
            cursor:pointer;
            display:flex;
            align-items:center;
            outline:0;
        }
        .cheked{
            position:relative;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            display: flex;
            border-radius:50%;
            border: 1px solid var(--themeBorderColor,#d9d9d9);
            transition:.3s;
            margin-right:5px;
        }
        .cheked::before{
            content:'';
            width:8px;
            height:8px;
            margin:auto;
            border-radius:50%;
            background:var(--themeColor,#42b983);
            transform: scale(0);
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        .cheked::after{
            position:absolute;
            content:'';
            width:100%;
            height:100%;
            background:var(--themeColor,#42b983);
            border-radius:50%;
            opacity:.2;
            transform:scale(0);
            z-index:-1;
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        /*
        :host(:focus-within) .cheked::after,:host(:not([disabled]):active) .cheked::after{ 
            transform:scale(2.5);
        }
        */
        #radio:focus-visible+label .cheked::after{
            transform:scale(2.5);
        }
        #radio:checked+label .cheked::before{
            transform: scale(1);
        }
        #radio:checked+label .cheked{
            border-color:var(--themeColor,#42b983);
        }
        </style>
        <input type="checkbox" id="radio" ><label id="label" for="radio"><span class="cheked"></span><slot></slot></label>
        `
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get checked() {
        return this.getAttribute('checked')!==null;
    }

    get name() {
        return this.getAttribute('name');
    }

    get value() {
        return this.getAttribute('value')||this.textContent;
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

    set value(value) {
        this.setAttribute('value', value);
    }

    focus() {
        this.radio.focus();
    }
    
    tocheck() {
        const selector = this.group?`xy-radio[checked]`:`xy-radio[name="${this.name}"][checked]`;
        const prev = this.parent.querySelector(selector);
        if( prev ){
            prev.checked = false;
        }
        this.checked = true;
    }

    connectedCallback() {
        this.group = this.closest('xy-radio-group');
        this.parent = this.group||this.getRootNode();
        this.radio = this.shadowRoot.getElementById('radio');
        this.disabled = this.disabled;
        this.checked = this.checked;
        this.radio.addEventListener('change',(ev)=>{
            this.tocheck();
        })
        this.radio.addEventListener('keydown', (ev) => {
            switch (ev.keyCode) {
                case 13://Enter
                    this.tocheck();
                    break;
                default:
                    break;
            }
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled' && this.radio){
            if(newValue!==null){
                this.radio.setAttribute('disabled', 'disabled');
            }else{
                this.radio.removeAttribute('disabled');
            }
        }
        if( name == 'checked' && this.radio){
            if(newValue!==null){
                this.radio.checked = true;
            }else{
                this.radio.checked = false;
            }
            if (oldValue !== newValue) {
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        checked: this.checked
                    }
                }));
            }
        }
    }
}

if(!customElements.get('xy-radio')){
    customElements.define('xy-radio', XyRadio);
}

class XyRadioGroup extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:inline-block;
        }
        :host(:focus-within) xy-tips{
            z-index:2;
        }
        xy-tips[show=show]{
            --themeColor:#f5222d;
            --themeBorderColor:#f5222d;
        }
        </style>
        <xy-tips id="tip" type="error"><slot></slot></xy-tips>
        `
    }

    get name() {
        return this.getAttribute('name');
    }

    get required() {
        return this.getAttribute('required')!==null;
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||"";
    }

    get value() {
        const radio = this.querySelector('xy-radio[checked]');
        return radio?radio.value:'';
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get validity() {
        return this.value!=='';
    }

    set value(value) {
        this.elements.forEach(el=>{
            if(value == el.value){
                el.checked = true;
            }else{
                el.checked = false;
            }
        })
        if(this.init){
            console.log(555)
            this.checkValidity();
            this.dispatchEvent(new CustomEvent('change',{
                detail:{
                    value:value
                }
            }));
        }
    }

    set required(value) {
        if(value===null||value===false){
            this.removeAttribute('required');
        }else{
            this.setAttribute('required', '');
        }
    }

    set novalidate(value) {
        if(value===null||value===false){
            this.removeAttribute('novalidate');
        }else{
            this.setAttribute('novalidate', '');
        }
    }

    focus(){
        if(getComputedStyle(this.tip).zIndex!=2){
            this.elements[0].focus();
        }
    }

    reset() {
        this.elements.forEach(el=>{
            el.checked = false;
        })
        this.error = false;
        this.tip.show = false;
    }

    checkValidity(){
        if(this.novalidate||this.form&&this.form.novalidate){
            return true;
        }
        if(this.validity){
            this.tip.show = false;
            return true;
        }else{
            this.focus();
            this.tip.show = 'show';
            this.tip.tips = '请选择1项';
            return false;
        }
    }

    connectedCallback() {
        this.form = this.closest('xy-form');
        this.elements  = this.querySelectorAll('xy-radio');
        this.tip  = this.shadowRoot.getElementById('tip');
        this.value = this.defaultvalue;
        this.elements.forEach(el=>{
            el.addEventListener('change',()=>{
                if(el.checked){
                    this.checkValidity();
                    this.dispatchEvent(new CustomEvent('change',{
                        detail:{
                            value:this.value
                        }
                    }));
                }
            })
        })
        this.init = true;
    }
}

if(!customElements.get('xy-radio-group')){
    customElements.define('xy-radio-group', XyRadioGroup);
}
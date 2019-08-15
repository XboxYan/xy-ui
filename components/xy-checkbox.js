import './xy-tips.js';
export default class XyCheckbox extends HTMLElement {

    static get observedAttributes() { return ['disabled','checked','required'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ 
            display:inline-block;
            font-size:14px;
            color:var(--fontColor,#333);
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
        #checkbox{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
            border-color:var(--themeColor,#42b983);
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
            z-index:1;
        }
        :host(:focus-within) #checkbox,:host(:active) #checkbox{
            z-index:2
        }
        :host([disabled]) .cheked{ 
            background:rgba(0,0,0,.1);
        }
        label{
            box-sizing:border-box;
            cursor:pointer;
            display:flex;
            align-items:center;
        }
        xy-tips{
            display:block;
            padding-left: 8px;
            margin-left: -8px;
        }
        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        .cheked{
            margin-right:5px;
            position:relative;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            border: 1px solid var(--borderColor,#d9d9d9);
            border-radius: 2px;
            transition:.3s;
        }
        .cheked::before{
            position:absolute;
            content:'';
            width:4px;
            height:9px;
            margin:0px 4px;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            transform: rotate(45deg) scale(0);
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
        :host(:focus-within) .cheked::after,:host(:active:not([disabled])) .cheked::after{ 
            transform:scale(2.5);
        }
        */

        #checkbox:focus-visible+label .cheked::after{
            transform:scale(2.5);
        }
        #checkbox:checked+label .cheked::before{
            transform: rotate(45deg) scale(1);
        }
        #checkbox:checked+label .cheked{
            border-color:transparent;
            background-color:var(--themeColor,#42b983);
        }
        </style>
        <xy-tips id="tip" type="error" dir="topleft"><input type="checkbox" id="checkbox"><label for="checkbox"><span class="cheked"></span><slot></slot></label></xy-tips>
        `
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get required() {
        return this.getAttribute('required')!==null;
    }

    get name() {
        return this.getAttribute('name');
    }

    get checked() {
        return this.getAttribute('checked')!==null;
    }

    get value() {
        return this.getAttribute('value')||this.textContent;
    }

    get validity() {
        return this.checkbox.checkValidity();
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

    set checked(value) {
        if(value===null||value===false){
            this.removeAttribute('checked');
        }else{
            this.setAttribute('checked', '');
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

    focus() {
        this.checkbox.focus();
    }

    reset() {
        this.tip.show = false;
        this.checkbox.checked = false;
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
            this.tip.tips = this.errortips||this.checkbox.validationMessage;
            return false;
        }
    }
    
    connectedCallback() {
        this.form = this.closest('xy-form');
        this.checkbox = this.shadowRoot.getElementById('checkbox');
        this.tip = this.shadowRoot.getElementById('tip');
        this.disabled = this.disabled;
        this.checked = this.checked;
        this.checkbox.addEventListener('change',(ev)=>{
            this.checked = this.checkbox.checked;
        })
        this.checkbox.addEventListener('keydown', (ev) => {
            switch (ev.keyCode) {
                case 13://Enter
                    ev.stopPropagation();
                    this.checked = !this.checked;
                    break;
                default:
                    break;
            }
        })
        this.checkbox.addEventListener('focus',(ev)=>{
            ev.stopPropagation();
            if(!this.isfocus){
                this.dispatchEvent(new CustomEvent('focus',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
        this.checkbox.addEventListener('blur',(ev)=>{
            ev.stopPropagation();
            if(getComputedStyle(this.checkbox).zIndex==2){
                this.isfocus = true;
            }else{
                this.isfocus = false;
                this.dispatchEvent(new CustomEvent('blur',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
        this.required = this.required;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled' && this.checkbox){
            if(newValue!==null){
                this.checkbox.setAttribute('disabled', 'disabled');
            }else{
                this.checkbox.removeAttribute('disabled');
            }
        }
        if( name == 'checked' && this.checkbox){
            if(newValue!==null){
                this.checkbox.checked = true;
            }else{
                this.checkbox.checked = false;
            }
            if (oldValue !== newValue) {
                this.checkValidity();
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        checked: this.checked
                    }
                }));
            }
        }
        if(name == 'required' && this.checkbox){
            if(newValue!==null){
                this.checkbox.setAttribute('required', 'required');
            }else{
                this.checkbox.removeAttribute('required');
            }
        }
    }
}

if(!customElements.get('xy-checkbox')){
    customElements.define('xy-checkbox', XyCheckbox);
}


class XyCheckboxGroup extends HTMLElement {
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
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        </style>
        <xy-tips id="tip" type="error"><slot></slot></xy-tips>
        `
    }

    get name() {
        return this.getAttribute('name');
    }

    get min() {
        const min = this.getAttribute('min')||0;
        return this.required?Math.max(1,min):min;
    }

    get max() {
        return this.getAttribute('max')||Infinity;
    }

    get required() {
        return this.getAttribute('required')!==null;
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||"";
    }

    get value() {
        return [...this.querySelectorAll('xy-checkbox[checked]')].map(el=>el.value);
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get validity() {
        this.len = this.value.length;
        if(!this.required && this.len==0){
            return true;
        }
        return this.len>=this.min && this.len<=this.max;
    }

    set value(value) {
        //['html','js']
        this.elements.forEach(el=>{
            if(value.includes(el.value)){
                el.checked = true;
            }else{
                el.checked = false;
            }
        })
        if(this.init){
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
            if(this.len<this.min){
                this.tip.tips = `请至少选择${this.min}项`;
            }
            if(this.len>this.max){
                this.tip.tips = `至多选择${this.max}项`;
            }
            return false;
        }
    }

    connectedCallback() {
        this.form = this.closest('xy-form');
        this.tip  = this.shadowRoot.getElementById('tip');
        this.slots = this.shadowRoot.querySelector('slot');
        this.slots.addEventListener('slotchange',()=>{
            this.elements  = this.querySelectorAll('xy-checkbox');
            this.value = this.defaultvalue.split(',');
            this.elements.forEach(el=>{
                el.addEventListener('change',()=>{
                    this.checkValidity();
                    this.dispatchEvent(new CustomEvent('change',{
                        detail:{
                            value:this.value
                        }
                    }));
                })
            })
            this.init = true;
        })
    }
}

if(!customElements.get('xy-checkbox-group')){
    customElements.define('xy-checkbox-group', XyCheckboxGroup);
}
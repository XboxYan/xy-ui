export default class XyForm extends HTMLElement {

    static get observedAttributes() { return ['legendwidth','disabled'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:block;
        }
        </style>
        <form id="form" style="--legendwidth:${this.legendwidth}px" method="${this.method}" action="${this.action}" ${this.novalidate?'novalidate':''}>
            <slot></slot>
        </form>
        `
    }

    checkValidity() {
        if(this.novalidate){
            return true;
        }
        const elements = [...this.elements].reverse();
        let validity = true;
        elements.forEach(el=>{
            if(el.checkValidity&&!el.checkValidity()){
                validity = false;
            }
        })
        this.invalid = !validity;
        return validity;
    }

    async submit() {
        if(this.checkValidity()&&!this.disabled){
            //validity
            if(this.action){
                this.submitBtn && (this.submitBtn.loading = true);
                if(this.method=='GET'){
                    const formdata = new URLSearchParams(this.formdata).toString();
                    const data = await fetch(`${this.action}?${formdata}`);
                    this.submitBtn && (this.submitBtn.loading = false);
                    if(data.headers.get("content-type")=='application/json'){
                        this.dispatchEvent(new CustomEvent('submit',{
                            detail:{
                                data:data.json()
                            }
                        }));
                    }
                }else{
                    const data = await fetch(this.action, {
                        method: 'POST',
                        body: this.formdata,
                    })
                    this.submitBtn && (this.submitBtn.loading = false);
                    if(data.headers.get("content-type")=='application/json'){
                        this.dispatchEvent(new CustomEvent('submit',{
                            detail:{
                                data:data.json()
                            }
                        }));
                    }
                }
            }
        }
    }

    reset() {
        this.invalid = false;
        this.elements.forEach(el=>{
            el.reset();
        })
    }

    get validity() {
        return this.elements.every(el=>el.validity);
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get formdata() {
        const formdata = new FormData();
        const jsondata = {};
        if(!this.disabled){
            this.elements.forEach(el=>{
                formdata.set(el.name,el.value);
                jsondata[el.name] = el.value;
            })
        }
        formdata.json = jsondata;
        return formdata;
    }

    get method() {
        const method = (this.getAttribute('method')||'get').toUpperCase();
        if( ['GET','POST'].includes(method) ){
            return method;
        }
        return 'GET';
    }

    get action() {
        return this.getAttribute('action')||'';
    }

    get name() {
        return this.getAttribute('name');
    }

    get legendwidth() {
        return this.getAttribute('legendwidth')||80;
    }

    get invalid() {
        return this.getAttribute('invalid')!==null;
    }

    /*
    get enctype() {
        const enctype = this.getAttribute('enctype');
        if( ['application/x-www-form-urlencoded','multipart/form-data','text/plain'].includes(enctype) ){
            return enctype;
        }
        return 'application/x-www-form-urlencoded';
    }
    */

    set novalidate(value) {
        if(value===null||value===false){
            this.removeAttribute('novalidate');
        }else{
            this.setAttribute('novalidate', '');
        }
    }

    set legendwidth(value) {
        this.setAttribute('legendwidth', value);
    }

    set invalid(value) {
        if(value===null||value===false){
            this.removeAttribute('invalid');
        }else{
            this.setAttribute('invalid', '');
        }
    }

    connectedCallback() {
        this.form  = this.shadowRoot.getElementById('form');
        this.elements  = [...this.querySelectorAll('[name]:not([disabled])')];
        this.submitBtn = this.querySelector('[htmltype=submit]');
        this.resetBtn = this.querySelector('[htmltype=reset]');
        if(this.submitBtn){
            this.submitBtn.addEventListener('click',()=>{
                this.submit();
            });
        }
        if(this.resetBtn){
            this.resetBtn.addEventListener('click',()=>{
                this.reset();
            });
        }
        this.form.addEventListener('keydown',(ev)=>{
            if(ev.target==this.resetBtn){
                return
            }
            switch (ev.keyCode) {
                case 13://Enter
                    this.submit();
                    break;
                default:
                    break;
            }
        })
        if(!this.novalidate){
            this.elements.forEach((el)=>{
                if(el.tagName=="XY-INPUT"){
                    el.addEventListener('input',()=>{
                        this.invalid = !this.validity;
                    })
                }else{
                    el.addEventListener('change',()=>{
                        this.invalid = !this.validity;
                    })
                }
            })
        }
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'legendwidth' && this.form){
            this.form.style.setProperty('--legendwidth',newValue+'px');
        }
    }
}

if(!customElements.get('xy-form')){
    customElements.define('xy-form', XyForm);
}


class XyFormItem extends HTMLElement {

    static get observedAttributes() { return ['legendwidth'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:flex;
            align-items: center;
            font-size:14px;
            color:var(--fontColor,#333);
            margin-bottom:10px;
        }
        label{
            flex-shrink: 0;
            text-align:right;
            padding-right:10px;
            transition:.3s;
            width:var(--legendwidth,80px);
        }
        .item{
            flex:1;
        }
        label.required:not(:empty)::before{
            content:'*';
            color:var(--errorColor,#f4615c);
        }
        </style>
        <label ${this.legendwidth?"style='--legendwidth:"+this.legendwidth+"px'":""}>${this.legend}</label>
        <div class="item"><slot></slot></div>
        `
    }

    get legend() {
        return this.getAttribute('legend')||'';
    }
    
    get legendwidth() {
        return this.getAttribute('legendwidth');
    }

    set legend(value) {
        this.setAttribute('legend', value);
    }

    set legendwidth(value) {
        this.setAttribute('legendwidth', value);
    }

    connectedCallback() {
        this.form = this.closest('xy-form');
        this.labels = this.shadowRoot.querySelector('label');
        this.slots = this.shadowRoot.querySelector('slot');
        this.slots.addEventListener('slotchange',()=>{
            this.input = this.querySelector('[name]');
            if(this.input && this.input.required){
                this.labels.classList.add('required');
            }
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'legendwidth' && this.labels ){
            this.labels.style.setProperty('--legendwidth',newValue+'px');
        }
    }
}

if(!customElements.get('xy-form-item')){
    customElements.define('xy-form-item', XyFormItem);
}

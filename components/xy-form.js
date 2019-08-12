export default class XyForm extends HTMLElement {

    static get observedAttributes() { return ['novalidate'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            
        }
        </style>
        <form id="form" method="${this.method}" action="${this.action}" ${this.novalidate?'novalidate':''}>
            <slot></slot>
        </form>
        `
    }

    checkValidity() {
        const elements = [...this.elements].reverse();
        let validity = true;
        elements.forEach(el=>{
            if(!el.checkValidity()){
                validity = false;
            }
        })
        return validity;
    }

    async submit() {
        if(!this.novalidate && this.checkValidity()){
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
        this.elements.forEach(el=>{
            el.reset();
        })
    }

    get validity() {
        return this.elements.every(el=>el.validity);
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get formdata() {
        const formdata = new FormData();
        const jsondata = {};
        this.elements.forEach(el=>{
            formdata.set(el.name,el.value);
            jsondata[el.name] = el.value;
        })
        formdata.json = jsondata;
        return formdata;
    }

    get method() {
        const method = this.getAttribute('method').toUpperCase();
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

    connectedCallback() {
        this.form  = this.shadowRoot.getElementById('form');
        this.elements  = [...this.querySelectorAll('[name]')];
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
    }

    attributeChangedCallback (name, oldValue, newValue) {

        if(name == 'required' && this.input){
            if(newValue!==null){
                this.input.setAttribute('required', 'required');
            }else{
                this.input.removeAttribute('required');
            }
        }
    }
}

if(!customElements.get('xy-form')){
    customElements.define('xy-form', XyForm);
}

import './xy-button.js';

export default class XyDialog extends HTMLElement {

    static get observedAttributes() { return ['open','title','oktext','canceltext','loading'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            position:fixed;
            display:flex;
            left:0;
            top:0;
            right:0;
            bottom:0;
            z-index:-1;
            background:rgba(0,0,0,.3);
            visibility:hidden;
            opacity:0;
            transition:.3s;
            z-index:10;
        }
        :host([open]){
            opacity:1;
            visibility:visible;
        }
        .dialog {
            display:flex;
            flex-direction:column;
            position:relative;
            min-width: 400px;
            margin:auto;
            box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
            box-sizing: border-box;
            max-width: calc(100vw - 20px);
            max-height: calc(100vh - 20px);
            border-radius: 3px;
            background-color: #fff;
            transform:scale(0);
            transition:.3s transform cubic-bezier(.645, .045, .355, 1);
        }
        :host([open]) .dialog{
            transform:scale(1);
        }
        .dialog-header {
            line-height: 30px;
            padding: 15px 50px 0 20px;
            font-weight: 700;
            font-size: 14px;
            color: #4c5161;
            user-select: none;
            cursor: default;
        }
        .dialog-body {
            flex: 1;
            overflow: auto;
            min-height: 50px;
            padding: 10px 20px;
        }
        .dialog-footer {
            padding: 3px 20px 20px;
            margin-top: -3px;
            text-align: right;
        }
        .btn-close{
            position:absolute;
            right:10px;
            top:10px;
        }
        .dialog-footer xy-button {
            margin-left:10px;
        }
        </style>
        <div class="dialog">
            <div class="dialog-header">${this.header}</div>
            <xy-button class="btn-close" id="btn-close" type="flat" icon="close"></xy-button>
            <div class="dialog-body">
                <slot></slot>
            </div>
            <div class="dialog-footer">
                <xy-button id="btn-cancel">${this.canceltext}</xy-button>
                <xy-button id="btn-submit" type="primary">${this.oktext}</xy-button>
            </div>
        </div>
        `
    }

    get open() {
        return this.getAttribute('open')!==null;
    }

    get header() {
        return this.getAttribute('header')||'dialog';
    }

    get oktext() {
        return this.getAttribute('oktext')||'ok';
    }

    get canceltext() {
        return this.getAttribute('canceltext')||'cancel';
    }

    get loading() {
        return this.getAttribute('loading')!==null;
    }

    get dir() {
        return this.getAttribute('dir')||'auto';
    }

    set color(value) {
        this.setAttribute('color', value);
    }

    set open(value) {
        if(value===null||value===false){
            this.removeAttribute('open');
        }else{
            this.setAttribute('open', '');
            this.loading && (this.loading = false);
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
        this.btnClose = this.shadowRoot.getElementById('btn-close');
        this.btnCancel = this.shadowRoot.getElementById('btn-cancel');
        this.btnSubmit = this.shadowRoot.getElementById('btn-submit');
        this.width = document.documentElement.clientWidth;
        this.shadowRoot.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && this.open){
                this.btnSubmit.focus();
            }
        })
        this.btnClose.addEventListener('click',()=>{
            this.open = false;
        })
        this.btnCancel.addEventListener('click',async ()=>{
            this.dispatchEvent(new CustomEvent('cancel'));
            this.open = false;
        })
        this.btnSubmit.addEventListener('click',()=>{
            this.dispatchEvent(new CustomEvent('submit'));
            if(!this.loading){
                this.open = false;
            }
        })
        window.addEventListener('resize',()=>{
            this.width = document.documentElement.clientWidth;
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'open' && this.shadowRoot){
            if(newValue!==null){
                this.btnActive = document.activeElement;
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = (document.documentElement.clientWidth - this.width)+'px';
            }else{
                this.btnActive.focus();
                document.body.style.overflow = 'auto';
                document.body.style.paddingRight = '0px';
            }
        }
        if( name == 'loading' && this.shadowRoot){
            if(newValue!==null){
                this.btnSubmit.loading = true;
            }else{
                this.btnSubmit.loading = false;
            }
        }
    }
}

if(!customElements.get('xy-dialog')){
    customElements.define('xy-dialog', XyDialog);
}

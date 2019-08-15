import './xy-button.js';

class XyDialog extends HTMLElement {

    static get observedAttributes() { return ['open','title','oktext','canceltext','loading','type'] }

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
        }
        :host([open]){
            opacity:1;
            z-index:10;
            visibility:visible;
        }
        .dialog {
            display:flex;
            position:relative;
            min-width: 400px;
            margin:auto;
            box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
            box-sizing: border-box;
            max-width: calc(100vw - 20px);
            max-height: calc(100vh - 20px);
            border-radius: 3px;
            background-color: #fff;
            opacity:0;
            transform:scale(0.5);
            transition:.3s cubic-bezier(.645, .045, .355, 1);
        }
        .dialog-content{
            box-sizing: border-box;
            display:flex;
            width: 100%;
            padding:0 20px;
            flex:1;
            flex-direction:column;
        }
        :host([open]) .dialog{
            opacity:1;
            transform:scale(1);
        }
        .dialog-title {
            line-height: 30px;
            padding: 15px 30px 0 0;
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
            padding: 10px 0;
            white-space:pre;
        }
        .dialog-footer {
            padding: 3px 0 20px 0;
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
        .dialog-type{
            display:flex;
            margin: 15px -10px 0 20px;
            width:30px;
            height:30px;
            font-size:24px;
        }
        :host(:not([type])) .dialog-type{
            display:none;
        }
        </style>
        <div class="dialog">
            <xy-icon id="dialog-type" class="dialog-type"></xy-icon>
            <div class="dialog-content">
                <div class="dialog-title" id="title">${this.title}</div>
                <xy-button class="btn-close" id="btn-close" type="flat" icon="close"></xy-button>
                <div class="dialog-body">
                    <slot></slot>
                </div>
                <div class="dialog-footer">
                    <xy-button id="btn-cancel">${this.canceltext}</xy-button>
                    <xy-button id="btn-submit" type="primary">${this.oktext}</xy-button>
                </div>
            </div>
        </div>
        `
    }

    get open() {
        return this.getAttribute('open')!==null;
    }

    get title() {
        return this.getAttribute('title')||'dialog';
    }

    get type() {
        return this.getAttribute('type');
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

    set color(value) {
        this.setAttribute('color', value);
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    set oktext(value) {
        this.setAttribute('oktext', value);
    }

    set canceltext(value) {
        this.setAttribute('canceltext', value);
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

    typeMap(type) {
        let name = '';
        let color = '';
        switch (type) {
            case 'info':
                name = 'info-circle';
                color = 'var(--infoColor,#1890ff)';
                break;
            case 'success':
                name = 'check-circle';
                color = 'var(--successColor,#52c41a)';
                break;
            case 'error':
                name = 'close-circle';
                color = 'var(--errorColor,#f4615c)';
                break;
            case 'warning':
                name = 'warning-circle';
                color = 'var(--waringColor,#faad14)';
                break;
            case 'confirm':
                name = 'question-circle';
                color = 'var(--waringColor,#faad14)';
                break;
            default:
                break;
        }
        return {
            name:name,
            color:color
        }
    }
    
    connectedCallback() {
        this.remove = false;
        this.titles = this.shadowRoot.getElementById('title');
        this.btnClose = this.shadowRoot.getElementById('btn-close');
        this.btnCancel = this.shadowRoot.getElementById('btn-cancel');
        this.btnSubmit = this.shadowRoot.getElementById('btn-submit');
        this.dialogType = this.shadowRoot.getElementById('dialog-type');
        this.width = document.documentElement.clientWidth;
        this.shadowRoot.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && this.open){
                this.btnSubmit.focus();
            }
        })
        this.shadowRoot.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && !this.open){
                if( this.remove ){
                    document.body.removeChild(this);
                }
                this.dispatchEvent(new CustomEvent('close'));
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
                document.body.style.overflowY = 'hidden';
                document.body.style.paddingRight = (document.documentElement.clientWidth - this.width)+'px';
            }else{
                this.btnActive.focus();
                document.body.style.overflowY = 'auto';
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
        if( name == 'title' && this.titles){
            if(newValue!==null){
                this.titles.innerHTML = newValue;
            }
        }
        if( name == 'oktext' && this.btnSubmit){
            if(newValue!==null){
                this.btnSubmit.innerHTML = newValue;
            }
        }
        if( name == 'canceltext' && this.btnCancel){
            if(newValue!==null){
                this.btnCancel.innerHTML = newValue;
            }
        }
        if( name == 'type' && this.dialogType){
            if(newValue!==null){
                this.dialogType.name = this.typeMap(newValue).name;
                this.dialogType.color = this.typeMap(newValue).color;
            }
        }
    }
}

if(!customElements.get('xy-dialog')){
    customElements.define('xy-dialog', XyDialog);
}

export default {

    alert: function() {
        const dialog = new XyDialog();
        document.body.appendChild(dialog);
        dialog.btnCancel.parentNode.removeChild(dialog.btnCancel);
        dialog.remove = true;
        if( typeof arguments[0] === 'object' ){
            const { title, oktext, content, ok} = arguments[0];
            dialog.title = title||'Alert';
            dialog.oktext = oktext||'确 定';
            dialog.onsubmit = ok||null;
            dialog.innerHTML = content||'';
        }else{
            dialog.title = 'Alert';
            dialog.oktext = '确 定';
            dialog.innerHTML = arguments[0]||'';
            dialog.onsubmit = arguments[1]||null;
        }
        dialog.open = true;
        return dialog;
    },

    info: function() {
        const dialog = new XyDialog();
        document.body.appendChild(dialog);
        dialog.btnCancel.parentNode.removeChild(dialog.btnCancel);
        dialog.type = 'info';
        dialog.remove = true;
        if( typeof arguments[0] === 'object' ){
            const { title, oktext, content, ok} = arguments[0];
            dialog.title = title||'Info';
            dialog.oktext = oktext||'知道了';
            dialog.onsubmit = ok||null;
            dialog.innerHTML = content||'';
        }else{
            dialog.title = 'Info';
            dialog.oktext = '知道了';
            dialog.innerHTML = arguments[0]||'';
            dialog.onsubmit = arguments[1]||null;
        }
        dialog.open = true;
        return dialog;
    },

    success: function() {
        const dialog = new XyDialog();
        document.body.appendChild(dialog);
        dialog.btnCancel.parentNode.removeChild(dialog.btnCancel);
        dialog.type = 'success';
        dialog.remove = true;
        if( typeof arguments[0] === 'object' ){
            const { title, oktext, content, ok} = arguments[0];
            dialog.title = title||'Success';
            dialog.oktext = oktext||'知道了';
            dialog.onsubmit = ok||null;
            dialog.innerHTML = content||'';
        }else{
            dialog.title = 'Success';
            dialog.oktext = '知道了';
            dialog.innerHTML = arguments[0]||'';
            dialog.onsubmit = arguments[1]||null;
        }
        dialog.open = true;
        return dialog;
    },

    error: function() {
        const dialog = new XyDialog();
        document.body.appendChild(dialog);
        dialog.btnCancel.parentNode.removeChild(dialog.btnCancel);
        dialog.type = 'error';
        dialog.remove = true;
        if( typeof arguments[0] === 'object' ){
            const { title, oktext, content, ok} = arguments[0];
            dialog.title = title||'Error';
            dialog.oktext = oktext||'知道了';
            dialog.onsubmit = ok||null;
            dialog.innerHTML = content||'';
        }else{
            dialog.title = 'Error';
            dialog.oktext = '知道了';
            dialog.innerHTML = arguments[0]||'';
            dialog.onsubmit = arguments[1]||null;
        }
        dialog.open = true;
        return dialog;
    },

    warning: function() {
        const dialog = new XyDialog();
        document.body.appendChild(dialog);
        dialog.btnCancel.parentNode.removeChild(dialog.btnCancel);
        dialog.type = 'warning';
        dialog.remove = true;
        if( typeof arguments[0] === 'object' ){
            const { title, oktext, content, ok} = arguments[0];
            dialog.title = title||'Warning';
            dialog.oktext = oktext||'知道了';
            dialog.onsubmit = ok||null;
            dialog.innerHTML = content||'';
        }else{
            dialog.title = 'Warning';
            dialog.oktext = '知道了';
            dialog.innerHTML = arguments[0]||'';
            dialog.onsubmit = arguments[1]||null;
        }
        dialog.open = true;
        return dialog;
    },

    confirm: function() {
        //const dialog = document.createElement('xy-dialog');
        const dialog = new XyDialog();
        document.body.appendChild(dialog);
        dialog.remove = true;
        if( typeof arguments[0] === 'object' ){
            const { type, title, content, oktext, canceltext, ok, cancel} = arguments[0];
            dialog.type = type||'confirm';
            dialog.title = title||'Confirm';
            dialog.oktext = oktext||'确 定';
            dialog.canceltext = canceltext||'取 消';
            dialog.innerHTML = content||'';
            dialog.onsubmit = ok||null;
            dialog.oncancel = cancel||null;
        }else{
            dialog.type = 'confirm';
            dialog.title = 'Confirm';
            dialog.oktext = '确 定';
            dialog.canceltext = '取 消';
            dialog.innerHTML = arguments[0]||'';
            dialog.onsubmit = arguments[1]||null;
            dialog.oncancel = arguments[2]||null;
        }
        dialog.open = true;
        return dialog;
    }
}
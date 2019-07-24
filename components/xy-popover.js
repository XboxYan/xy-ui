import './xy-button.js';

class XyPopover extends HTMLElement {

    static get observedAttributes() { return ['open','title','oktext','canceltext','loading','type'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            position:absolute;
            display:flex;
            z-index:-1;
            background:#fff;
            visibility:hidden;
            box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
            box-sizing: border-box;
            transform:scale(0.5);
            border-radius: 3px;
            transition:.3s transform cubic-bezier(.645, .045, .355, 1);
        }
        :host([open]){
            visibility:visible;
            transform:scale(1);
            z-index:10;
        }
        .popover-contnet{
            box-sizing: border-box;
            display:flex;
            width: 100%;
            padding:0 20px;
            flex:1;
            flex-direction:column;
        }
        .popover-title {
            line-height: 30px;
            padding: 15px 30px 0 0;
            font-weight: 700;
            font-size: 14px;
            color: #4c5161;
            user-select: none;
            cursor: default;
        }
        .popover-body {
            flex: 1;
            overflow: auto;
            min-height: 40px;
            padding: 10px 0;
        }
        .popover-footer {
            padding: 3px 0 20px 0;
            margin-top: -3px;
            text-align: right;
        }
        .btn-close{
            position:absolute;
            right:10px;
            top:10px;
        }
        .popover-footer xy-button {
            margin-left:10px;
        }
        .popover-type{
            display:flex;
            margin: 15px -10px 0 20px;
            width:30px;
            height:30px;
            font-size:24px;
        }
        :host(:not([type])) .dialog-type{
            display:none;
        }
        :host([type]){
            min-width:150px;
        }
        :host([type]) xy-button{
            height:30px;
            font-size:12px;
        }
        :host([type]) .popover-footer{
            padding: 3px 0 15px 0;
        }
        :host([type]) .popover-contnet{
            padding: 0 15px;
        }
        :host([type]) .popover-type{
            font-size:22px;
            margin: 15px -10px 0 15px;
        }
        </style>
        <xy-icon id="popover-type" class="popover-type" name="question-circle"></xy-icon>
        <div class="popover-contnet">
            <div class="popover-title" id="title">${this.title}</div>
            <xy-button class="btn-close" id="btn-close" type="flat" icon="close"></xy-button>
            <div class="popover-body">
                <slot></slot>
            </div>
            <div class="popover-footer">
                <xy-button id="btn-cancel">${this.canceltext}</xy-button>
                <xy-button id="btn-submit" type="primary">${this.oktext}</xy-button>
            </div>
        </div>
        `
    }

    get open() {
        return this.getAttribute('open')!==null;
    }

    get title() {
        return this.getAttribute('title')||'popover';
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
                color = '#1890ff';
                break;
            case 'success':
                name = 'check-circle';
                color = '#52c41a';
                break;
            case 'error':
                name = 'close-circle';
                color = '#f5222d';
                break;
            case 'warning':
                name = 'warning-circle';
                color = '#faad14';
                break;
            case 'confirm':
                name = 'question-circle';
                color = '#faad14';
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
        this.popoverType = this.shadowRoot.getElementById('popover-type');
        this.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && this.open){
                this.btnSubmit.focus();
            }
        })
        this.addEventListener('transitionend',(ev)=>{
            console.log(ev)
            if(ev.propertyName === 'transform' && !this.open){
                if( this.remove ){
                    document.body.removeChild(this);
                }
                this.dispatchEvent(new CustomEvent('close'));
            }
        })
        this.addEventListener('click',(ev)=>{
            ev.stopPropagation();
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
        document.addEventListener('click',()=>{
            if(!this.loading){
                this.open = false;
            }
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'open' && this.shadowRoot){
            if(newValue!==null){
                this.btnActive = document.activeElement;
            }else{
                this.btnActive.focus();
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
        if( name == 'type' && this.popoverType){
            if(newValue!==null){
                this.popoverType.name = this.typeMap(newValue).name;
                this.popoverType.color = this.typeMap(newValue).color;
            }
        }
    }
}

if(!customElements.get('xy-popover')){
    customElements.define('xy-popover', XyPopover);
}

export default {
    confirm: function() {
        //const popover = document.createElement('xy-popover');
        const popover = new XyPopover();
        document.body.appendChild(popover);
        popover.remove = true;
        if( typeof arguments[0] === 'object' ){
            const { type, title, content, oktext, canceltext, ok, cancel} = arguments[0];
            popover.type = type||'confirm';
            popover.title = title||'Confirm';
            popover.oktext = oktext||'确 定';
            popover.canceltext = canceltext||'取 消';
            popover.innerText = content||'';
            popover.onsubmit = ok||null;
            popover.oncancel = cancel||null;
        }else{
            popover.type = 'confirm';
            popover.title = 'Confirm';
            popover.oktext = '确 定';
            popover.canceltext = '取 消';
            popover.innerText = arguments[0]||'';
            popover.onsubmit = arguments[1]||null;
            popover.oncancel = arguments[2]||null;
        }
        popover.open = true;
        return popover;
    }
}
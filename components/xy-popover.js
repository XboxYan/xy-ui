import './xy-button.js';

class XyPopcon extends HTMLElement {

    static get observedAttributes() { return ['open','title','oktext','canceltext','loading','type'] }

    constructor(type) {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            position:absolute;
            display:flex;
            box-shadow: 2px 2px 15px rgba(0,0,0,0.15);
            box-sizing: border-box;
            transform:scale(0);
            opacity:0.5;
            border-radius: 3px;
            z-index:10;
            transition:.3s cubic-bezier(.645, .045, .355, 1);
            transform-origin:inherit;
            background:#fff;
            visibility:hidden;
        }
        .popcon-content{
            box-sizing: border-box;
            display:flex;
            width: max-content;
            padding: 0 15px;
            flex:1;
            flex-direction:column;
        }
        .popcon-title {
            line-height: 30px;
            padding: 15px 30px 0 0;
            font-weight: 700;
            font-size: 14px;
            color: #4c5161;
            user-select: none;
            cursor: default;
        }
        .popcon-body {
            flex: 1;
            padding: 5px 0 15px 0;
        }
        .popcon-footer {
            padding: 3px 0 15px 0;
            margin-top: -3px;
            text-align: right;
            white-space: nowrap;
        }
        .btn-close{
            position:absolute;
            right:10px;
            top:10px;
            border:0;
        }
        .popcon-footer xy-button {
            font-size: .8em;
            margin-left: .8em;
        }
        .popcon-type{
            display:flex;
            width:30px;
            height:30px;
            font-size:22px;
            margin: 15px -10px 0 15px;
        }
        /*
        :host(:not([type="confirm"])) .popcon-type,
        :host(:not([type="confirm"])) .popcon-footer,
        :host(:not([type])) .popcon-title,
        :host(:not([type])) .btn-close{
            display:none;
        }
        */
        :host([type="confirm"]){
            min-width:250px;
        }
        :host([type="confirm"]) .popcon-body{
            font-size:14px;
        }
        :host(:not([type])) .popcon-content,:host(:not([type])) .popcon-body{
            padding: 0;
        }
        </style>
            ${
                (type||this.type)==='confirm'?'<xy-icon id="popcon-type" class="popcon-type" name="question-circle" color="var(--waringColor,#faad14)"></xy-icon>':''
            }
            <div class="popcon-content">
                ${
                    (type||this.type)!==null?'<div class="popcon-title" id="title">'+this.title+'</div><xy-button class="btn-close" id="btn-close" icon="close"></xy-button>':''
                }
                <div class="popcon-body">
                    <slot></slot>
                </div>
                ${
                    (type||this.type)==='confirm'?'<div class="popcon-footer"><xy-button id="btn-cancel">'+this.canceltext+'</xy-button><xy-button id="btn-submit" type="primary">'+this.oktext+'</xy-button></div>':''
                }
            </div>
        `
    }

    get open() {
        return this.getAttribute('open')!==null;
    }

    get stopfocus() {
        return this.getAttribute('stopfocus')!==null;
    }

    get title() {
        return this.getAttribute('title')||'popcon';
    }

    get type() {
        return this.getAttribute('type');
    }

    get oktext() {
        return this.getAttribute('oktext')||'确 定';
    }

    get canceltext() {
        return this.getAttribute('canceltext')||'取 消';
    }

    get loading() {
        return this.getAttribute('loading')!==null;
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    set type(value) {
        if(value===null||value===false){
            this.removeAttribute('type');
        }else{
            this.setAttribute('type', value);
        }
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
            this.parentNode.removeAttribute('open');
        }else{
            this.setAttribute('open', '');
            this.parentNode.setAttribute('open','');
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
        this.remove = false;
        if(this.type){
            this.titles = this.shadowRoot.getElementById('title');
            this.btnClose = this.shadowRoot.getElementById('btn-close');
        }
        if(this.type=='confirm'){
            this.btnCancel = this.shadowRoot.getElementById('btn-cancel');
            this.btnSubmit = this.shadowRoot.getElementById('btn-submit');
        }
        this.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && this.open){
                if(this.type=='confirm'){
                    this.btnSubmit.focus();
                }
                if(this.type=='pane'){
                    this.btnClose.focus();
                }
                this.dispatchEvent(new CustomEvent('open'));
            }
        })
        this.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && !this.open){
                if( this.remove ){
                    this.parentNode.removeChild(this);
                    //document.body.removeChild(this);
                }
                this.dispatchEvent(new CustomEvent('close'));
            }
        })
        this.addEventListener('click',(ev)=>{
            if( ev.target.closest('[autoclose]')){
                this.open = false;
                window.xyActiveElement.focus();
            }
        })
        if(this.type){
            this.btnClose.addEventListener('click',()=>{
                this.open = false;
                window.xyActiveElement.focus();
            })
        }
        if(this.type=='confirm'){
            this.btnCancel.addEventListener('click',async ()=>{
                this.dispatchEvent(new CustomEvent('cancel'));
                this.open = false;
                window.xyActiveElement.focus();
            })
            this.btnSubmit.addEventListener('click',()=>{
                this.dispatchEvent(new CustomEvent('submit'));
                if(!this.loading){
                    this.open = false;
                    window.xyActiveElement.focus();
                }
            })
        }
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'open' && this.shadowRoot){
            if(newValue==null && !this.stopfocus){
                //window.xyActiveElement.focus();
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
    }
}

if(!customElements.get('xy-popcon')){
    customElements.define('xy-popcon', XyPopcon);
}

class XyPopover extends HTMLElement {
    static get observedAttributes() { return ['title','oktext','canceltext','loading','type'] }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:inline-block;
            position:relative;
            overflow:visible;
        }
        :host([dir="top"]) ::slotted(xy-popcon){
            bottom:100%;
            left:50%;
            transform:translate(-50%,-10px) scale(0);
            transform-origin: center bottom;
        }
        :host([dir="top"]) ::slotted(xy-popcon[open]),
        :host([dir="top"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="top"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-50%,-10px) scale(1);
        }
        :host([dir="right"]) ::slotted(xy-popcon){
            left:100%;
            top:50%;
            transform:translate(10px,-50%) scale(0);
            transform-origin: left;
        }
        :host([dir="right"]) ::slotted(xy-popcon[open]),
        :host([dir="right"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="right"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(10px,-50%) scale(1);
        }
        :host([dir="bottom"]) ::slotted(xy-popcon){
            top:100%;
            left:50%;
            transform:translate(-50%,10px) scale(0);
            transform-origin: center top;
        }
        :host([dir="bottom"]) ::slotted(xy-popcon[open]),
        :host([dir="bottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="bottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-50%,10px) scale(1);
        }
        :host([dir="left"]) ::slotted(xy-popcon){
            right:100%;
            top:50%;
            transform:translate(-10px,-50%) scale(0);
            transform-origin: right;
        }
        :host([dir="left"]) ::slotted(xy-popcon[open]),
        :host([dir="left"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="left"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-10px,-50%) scale(1);
        }
        :host([dir="lefttop"]) ::slotted(xy-popcon){
            right:100%;
            top:0;
            transform:translate(-10px) scale(0);
            transform-origin: right top;
        }
        :host([dir="lefttop"]) ::slotted(xy-popcon[open]),
        :host([dir="lefttop"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="lefttop"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-10px) scale(1);
        }
        :host([dir="leftbottom"]) ::slotted(xy-popcon){
            right:100%;
            bottom:0;
            transform:translate(-10px) scale(0);
            transform-origin: right bottom;
        }
        :host([dir="leftbottom"]) ::slotted(xy-popcon[open]),
        :host([dir="leftbottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="leftbottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-10px) scale(1);
        }
        :host([dir="topleft"]) ::slotted(xy-popcon){
            bottom:100%;
            left:0;
            transform:translate(0,-10px) scale(0);
            transform-origin: left bottom;
        }
        :host([dir="topleft"]) ::slotted(xy-popcon[open]),
        :host([dir="topleft"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="topleft"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,-10px) scale(1);
        }
        :host([dir="topright"]) ::slotted(xy-popcon){
            bottom:100%;
            right:0;
            transform:translate(0,-10px) scale(0);
            transform-origin: right bottom;
        }
        :host([dir="topright"]) ::slotted(xy-popcon[open]),
        :host([dir="topright"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="topright"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,-10px) scale(1);
        }
        :host([dir="righttop"]) ::slotted(xy-popcon){
            left:100%;
            top:0;
            transform:translate(10px) scale(0);
            transform-origin: left top;
        }
        :host([dir="righttop"]) ::slotted(xy-popcon[open]),
        :host([dir="righttop"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="righttop"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(10px) scale(1);
        }
        :host([dir="rightbottom"]) ::slotted(xy-popcon){
            left:100%;
            bottom:0;
            transform:translate(10px) scale(0);
            transform-origin: left bottom;
        }
        :host([dir="rightbottom"]) ::slotted(xy-popcon[open]),
        :host([dir="rightbottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="rightbottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(10px) scale(1);
        }
        :host([dir="bottomleft"]) ::slotted(xy-popcon),
        :host(:not([dir])) ::slotted(xy-popcon){
            left:0;
            top:100%;
            transform:translate(0,10px) scale(0);
            transform-origin: left top;
        }
        :host(:not([dir])) ::slotted(xy-popcon[open]),
        :host(:not([dir])[trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host(:not([dir])[trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon),
        :host([dir="bottomleft"]) ::slotted(xy-popcon[open]),
        :host([dir="bottomleft"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="bottomleft"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,10px) scale(1);
        }
        :host([dir="bottomright"]) ::slotted(xy-popcon){
            right:0;
            top:100%;
            transform:translate(0,10px) scale(0);
            transform-origin: right top;
        }
        :host([dir="bottomright"]) ::slotted(xy-popcon[open]),
        :host([dir="bottomright"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="bottomright"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,10px) scale(1);
        }
        :host([trigger="contextmenu"]) ::slotted(xy-popcon){
            right:auto;
            bottom:auto;
            left:var(--x,0);
            top:var(--y,100%);
            transform-origin: left top;
            transform:translate(5px,5px) scale(0);
            transition: .15s;
        }
        :host([trigger="contextmenu"]) ::slotted(xy-popcon[open]){
            transform:translate(5px,5px) scale(1);
        }
        :host ::slotted(xy-popcon[open]),
        :host([trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            opacity:1;
            visibility:visible;
        }
        slot{
            border-radius: inherit;
        }
        </style>
        <slot></slot>
        `
    }

    get title() {
        return this.getAttribute('title')||'popcon';
    }

    get trigger() {
        return this.getAttribute('trigger');
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get type() {
        return this.getAttribute('type');
    }

    get accomplish() {
        return this.getAttribute('accomplish')!==null;
    }

    get content() {
        return this.getAttribute('content');
    }

    get oktext() {
        return this.getAttribute('oktext');
    }

    get canceltext() {
        return this.getAttribute('canceltext');
    }

    get dir() {
        return this.getAttribute('dir');
    }

    get loading() {
        return this.getAttribute('loading')!==null;
    }

    set dir(value) {
        this.setAttribute('dir', value);
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

    set loading(value) {
        if(value===null||value===false){
            this.removeAttribute('loading');
        }else{
            this.setAttribute('loading', '');
        }
    }

    set disabled(value) {
        if (value === null || value === false) {
            this.removeAttribute('disabled');
        } else {
            this.setAttribute('disabled', '');
        }
    }

    show(ev){
        this.popcon = this.querySelector('xy-popcon');
        if(!this.disabled){
            if(!this.popcon){
                this.popcon = new XyPopcon(this.type);
                this.popcon.type = this.type;
                this.appendChild(this.popcon);
                this.popcon.title = this.title||'popover';
                this.popcon.innerHTML = this.content||'';
                if(this.type == 'confirm'){
                    this.popcon.oktext = this.oktext||'确 定';
                    this.popcon.canceltext = this.canceltext||'取 消';
                    this.popcon.onsubmit = ()=>this.dispatchEvent(new CustomEvent('submit'));
                    this.popcon.oncancel = ()=>this.dispatchEvent(new CustomEvent('cancel'));
                }
            }
            //this.popcon.remove = true;
            this.popcon.clientWidth;
            if(this.trigger==='contextmenu'){
                const {x,y} = this.getBoundingClientRect()
                this.popcon.style.setProperty('--x',ev.clientX-x+'px');
                this.popcon.style.setProperty('--y',ev.clientY-y+'px');
                this.popcon.open = true;
            }else{
                const path = ev.path || (ev.composedPath && ev.composedPath());
                if(!path.includes(this.popcon)){
                    window.xyActiveElement = document.activeElement;
                    if(this.accomplish){
                        this.popcon.open = true;
                    }else{
                        this.popcon.open = !this.popcon.open;
                    }
                }
            }
        }else{
            (this.popcon||this).dispatchEvent(new CustomEvent('submit'));
        }
        return this.popcon;
    }
    connectedCallback() {
        this.popcon = this.querySelector('xy-popcon');
        if(!(this.trigger&&this.trigger!=='click')){
            this.addEventListener('click',this.show);
        }
        if(this.trigger==='contextmenu'){
            this.addEventListener('contextmenu',(ev)=>{
                ev.preventDefault();
                const path = ev.path || (ev.composedPath && ev.composedPath());
                if(!path.includes(this.popcon)){
                    this.show(ev);
                }
            });
        }
        document.addEventListener('mousedown',this.setpop);
    }

    setpop = (ev) => {
        const path = ev.path || (ev.composedPath && ev.composedPath());
        if( this.popcon && !path.includes(this.popcon) && !this.popcon.loading && !path.includes(this.children[0]) || (this.trigger==='contextmenu') && !path.includes(this.popcon) && ev.which == '1'){
            this.popcon.open = false;
        }
    }

    disconnectedCallback() {
        document.removeEventListener('mousedown', this.popcon);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'loading' && this.popcon){
            if(newValue!==null){
                this.popcon.loading = true;
            }else{
                this.popcon.loading = false;
            }
        }
        if( name == 'title' && this.popcon){
            if(newValue!==null){
                this.popcon.title = newValue;
            }
        }
        if( name == 'oktext' && this.popcon){
            if(newValue!==null){
                this.popcon.oktext = newValue;
            }
        }
        if( name == 'canceltext' && this.popcon){
            if(newValue!==null){
                this.popcon.canceltext = newValue;
            }
        }
    }
}

if(!customElements.get('xy-popover')){
    customElements.define('xy-popover', XyPopover);
}

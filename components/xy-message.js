import './xy-icon.js';
import './xy-loading.js';

class XyMessage extends HTMLElement {

    static get observedAttributes() { return ['open','header','oktext','canceltext','loading','type'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            display:flex;
            visibility:hidden;
            opacity:0;
            transition:.3s;
            z-index:10;
        }
        :host([show]){
            opacity:1;
            visibility:visible;
        }
        .message{
            margin:auto;
            display:flex;
            padding:10px 15px;
            margin-top:10px;
            align-items:center;
            font-size: 14px;
            color: #666;
            background: #fff;
            border-radius: 4px;
            transform: translateY(-100%);
            transition:.3s transform cubic-bezier(.645, .045, .355, 1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            pointer-events:all;
        }
        :host([show]) .message{
            transform: translateY(0);
        }

        .message>*{
            margin-right:5px;
        }

        xy-loading{
            display:none;
        }

        :host([show][type="loading"]) xy-loading{
            display:block;
        }
        :host([show][type="loading"]) xy-icon{
            display:none;
        }
        
        </style>
        <div class="message">
            <xy-icon id="message-type" class="message-type" size="16"></xy-icon>
            <xy-loading></xy-loading>
            <slot></slot>
        </div>
        `
    }

    get show() {
        return this.getAttribute('show')!==null;
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    set show(value) {
        if(value===null||value===false){
            this.removeAttribute('show');
        }else{
            this.setAttribute('show', '');
        }
    }

    typeMap(type) {
        let name = '';
        let color = '';
        switch (type) {
            case 'info':
                name = 'info-circle-fill';
                color = '#1890ff';
                break;
            case 'success':
                name = 'check-circle-fill';
                color = '#52c41a';
                break;
            case 'error':
                name = 'close-circle-fill';
                color = '#f5222d';
                break;
            case 'warning':
                name = 'warning-circle-fill';
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
        this.messageType = this.shadowRoot.getElementById('message-type');
        this.shadowRoot.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && !this.show){
                messageContent.removeChild(this);
                this.dispatchEvent(new CustomEvent('hide'));
            }
        })
        this.type= this.type;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'type' && this.messageType){
            if(newValue!==null){
                this.messageType.name = this.typeMap(newValue).name;
                this.messageType.color = this.typeMap(newValue).color;
            }
        }
    }
}

if(!customElements.get('xy-message')){
    customElements.define('xy-message', XyMessage);
}

let messageContent = document.getElementById('message-content');
if(!messageContent){
    messageContent = document.createElement('div');
    messageContent.id = 'message-content';
    messageContent.style='position:fixed; pointer-events:none; left:0; right:0; top:10px; z-index:11;';
    document.body.appendChild(messageContent);
}

export default {

    info: function(text,duration) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'info';
        message.innerText = text||'';
        message.clientWidth;
        message.show = true;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    success: function(text,duration) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'success';
        message.innerText = text||'';
        message.clientWidth;
        message.show = true;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    error: function(text,duration) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'error';
        message.innerText = text||'';
        message.clientWidth;
        message.show = true;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    warning: function(text,duration) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'warning';
        message.innerText = text||'';
        message.clientWidth;
        message.show = true;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    loading: function(text) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'loading';
        message.innerText = text||'';
        message.clientWidth;
        message.show = true;
        return message;
    }
}
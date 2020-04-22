import './xy-icon.js';
import './xy-loading.js';

class XyMessage extends HTMLElement {

    static get observedAttributes() { return ['type','icon'] }

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
            border-radius: 3px;
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
        :host xy-icon{
            color:var(--themeColor,#42b983);
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

    get icon() {
        return this.getAttribute('icon');
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    set icon(value) {
        this.setAttribute('icon', value);
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
                color = 'var(--infoColor,#1890ff)';
                break;
            case 'success':
                name = 'check-circle-fill';
                color = 'var(--successColor,#52c41a)';
                break;
            case 'error':
                name = 'close-circle-fill';
                color = 'var(--errorColor,#f4615c)';
                break;
            case 'warning':
                name = 'warning-circle-fill';
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
        this.messageType = this.shadowRoot.getElementById('message-type');
        this.shadowRoot.addEventListener('transitionend',(ev)=>{
            if(ev.propertyName === 'transform' && !this.show){
                messageContent.removeChild(this);
                this.dispatchEvent(new CustomEvent('close'));
            }
        })
        this.type= this.type;
        this.clientWidth;
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'type' && this.messageType){
            if(newValue!==null){
                this.messageType.name = this.typeMap(newValue).name;
                this.messageType.color = this.typeMap(newValue).color;
            }
        }
        if( name == 'icon' && this.messageType){
            if(newValue!==null){
                this.messageType.name = newValue;
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
    messageContent.style='position:fixed; pointer-events:none; left:0; right:0; top:10px; z-index:51;';
    document.body.appendChild(messageContent);
}

export default {

    info: function(text='',duration,onclose) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'info';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    success: function(text='',duration,onclose) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'success';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    error: function(text='',duration,onclose) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'error';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    warning: function(text='',duration,onclose) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'warning';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        message.timer = setTimeout(()=>{
            message.show = false;
        },duration||3000);
        return message;
    },

    loading: function(text='',duration=0,onclose) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.type = 'loading';
        message.textContent = text;
        message.show = true;
        message.onclose = onclose;
        if(duration!==0){
            message.timer = setTimeout(()=>{
                message.show = false;
            },duration||3000);
        }
        return message;
    },

    show: function({text,duration,onclose,icon}) {
        const message = new XyMessage();
        message.timer && clearTimeout(message.timer);
        messageContent.appendChild(message);
        message.icon = icon;
        message.textContent = text||'';
        message.show = true;
        message.onclose = onclose;
        if(duration!==0){
            message.timer = setTimeout(()=>{
                message.show = false;
            },duration||3000);
        }
        return message;
    }
}
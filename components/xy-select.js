import './xy-button.js';
import './xy-popover.js';

class XyOption extends HTMLElement {
    static get observedAttributes() { return ["value", "selected","disabled"]; }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host{
                display: contents;
            }
            .option {
                display: flex;
                justify-content: flex-start;
                border-radius:0;
                font-size: inherit;
            }
            :host([selected]) .option{
                color:var(--themeColor,#42b983)
            }
        </style>
        <xy-button id="option" class="option" type="flat" ${this.disabled?"disabled":""}><slot></slot></xy-button>
        `
    }


    connectedCallback() {
        this.option = this.shadowRoot.getElementById('option');
        // this.option.addEventListener('click',(ev)=>{
        //     ev.stopPropagation();
        //     this.parentNode.value = this.value;
        //     this.parentNode.focus();
        // })
    }

    focus() {
        this.option.focus();
    }

    get value() {
        return this.getAttribute('value');
    }
    
    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    set disabled(value) {
        if (value === null || value === false) {
            this.removeAttribute('disabled');
        } else {
            this.setAttribute('disabled', '');
        }
    }

    /**
     * @param {boolean} value
     */
    set selected(value) {
        if (value) {
            this.setAttribute('selected','');
        } else {
            this.removeAttribute('selected');
        }
    }
    set focusin(value) {
        if (value) {
            this.setAttribute('focusin','');
            this.option.setAttribute('focus','');
        } else {
            this.removeAttribute('focusin');
            this.option.removeAttribute('focus');
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'disabled' && this.option) {
            if (newValue != null) {
                this.option.disabled = newValue;
            }
        }
    }

}

customElements.define('xy-option', XyOption);

export default class XySelect extends HTMLElement {

    static get observedAttributes() { return ['value', 'disabled', 'type'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
        <style>
        :host{
            display:inline-block;
            font-size: 14px;
        }
        :host([block]){
            display:block;
        }
        :host xy-button{
            font-size: inherit;
        }
        
        :host(:not([disabled]):not([type="primary"]):focus-within) xy-button{
            border-color:var(--themeColor,#42b983);
            color:var(--themeColor,#42b983);
        }

        :host([search]:focus-within:not([disabled])), :host([search]:not([disabled]):hover) {
            color: var(--themeColor,#42b983);
        }

        :host([disabled]){
            pointer-events:none;
        }
        
        :host(:focus-within) xy-popover,:host(:active) xy-popover{ 
            z-index: 2;
        }
        #select{
            display:flex;
            width:100%;
            height:100%;
        }
        :host([search]) #select{
            color:currentColor;
        }
        #select span{
            flex:1;
            text-align:left;
        }
        #select[readonly]{
            cursor: default;
        }
        #select[data-show=true] .arrow{
            transform:scaleY(-.8);
        }
        .arrow{
            position:relative;
            font-size:.9em;
            transform:scaleY(.8);
            margin-left:.5em;
            pointer-events:none;
            width:1em;
            height:1em;
            fill:currentColor;
        }
        :host([search]) .arrow{
            transition:color .3s;
        }
        xy-popover{
            display:block;
            height:inherit;
        }
        xy-popcon{
            min-width:100%;
            overflow:hidden;
        }
        :host([search]) xy-popcon::before{
            display:none;
            box-sizing: border-box;
            width:100%;
            content:'没有匹配到任何选项';
            padding: .25em .625em;
            line-height: 1.8;
            color:var(--fontColor,#333);
            white-space:nowrap;
            opacity:.5;
        }
        :host([empty]) xy-popcon::before{
            display:block;
        }
        </style>
        <style id="filter"></style>
        <xy-popover id="root" ${this.search?"accomplish":""}>
            <${this.search?'xy-input':'xy-button'} id="select" debounce="200" readonly ${this.disabled? "disabled" : ""} ${this.type?("type="+this.type):""}>${this.search?"":'<span id="value"></span>'}<svg class="arrow" viewBox="0 0 1024 1024"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"></path></svg></${this.search?'xy-input':'xy-button'}>
            <xy-popcon id="options">
                <slot id="slot"></slot>
            </xy-popcon>
        </xy-popover>
        `
    }

    move(dir) {
        const pre = this.nodes[this.focusIndex];
        const focusIndex = dir + this.focusIndex;
        const current = this.nodes[focusIndex];
        if (current) {
            pre.focusin = false;
            current.focusin = true;
            this.focusIndex = focusIndex;
        }
    }

    movein(dir) {
        this.focusIndex = dir + this.focusIndex;
        if(this.focusIndex<0){
            this.focusIndex = this.nodes.length-1;
        }
        if(this.focusIndex===this.nodes.length){
            this.focusIndex = 0;
        }
        this.value = this.nodes[this.focusIndex].value;     
    }

    focus() {
        this.select.focus();
    }

    reset() {
        this.value = '';
    }

    connectedCallback() {
        this.root = this.shadowRoot.getElementById('root');
        this.select = this.shadowRoot.getElementById('select');
        this.options = this.shadowRoot.getElementById('options');
        this.slots = this.shadowRoot.getElementById('slot');
        this.txt = this.shadowRoot.getElementById('value');
        this.focusIndex = 0;
        this.addEventListener('keydown', (ev) => {
            if (this.options.open) {
                switch (ev.keyCode) {
                    case 9://Tab
                        ev.preventDefault();
                        break;
                    case 38://ArrowUp
                        ev.preventDefault();
                        this.move(-1);
                        break;
                    case 40://ArrowDown
                        ev.preventDefault();
                        this.move(1);
                        break;
                    case 27://Esc
                        ev.preventDefault();
                        this.options.open = false;
                        break;
                    default:
                        break;
                }
            }else{
                switch (ev.keyCode) {
                    case 38://ArrowUp
                        ev.preventDefault();
                        this.movein(-1);
                        break;
                    case 40://ArrowDown
                        ev.preventDefault();
                        this.movein(1);
                        break;
                    default:
                        break;
                }
            }
        })
        this.select.addEventListener('focus',(ev)=>{
            ev.stopPropagation();
            if(!this.isfocus){
                this.dispatchEvent(new CustomEvent('focus',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        })
        this.options.addEventListener('click',(ev)=>{
            this.focus();
            const item = ev.target.closest('xy-option');
            if(item){
                this.value = item.value;
            }
        })
        this.options.addEventListener('close',(ev)=>{
            if(this.search){
                this.select.readonly = true;
                this.select.value = this.$value;
                this.nodes = [...this.querySelectorAll(`xy-option:not([disabled])`)];
                this.filter.textContent = '';
                this.empty = false;

            }
            const place = this.querySelector(`xy-option[focusin]`);
            const current = this.querySelector(`xy-option[selected]`);
            if(place){
                place.focusin = false;
            }
            if(current){
                current.focusin = true;
                this.focusIndex = this.nodes.indexOf(current);
            }
        })
        this.options.addEventListener('open',(ev)=>{
            if(this.search){
                this.select.value = '';
                this.select.readonly = false;
                this.focus();
            }
        })
        if(this.search){
            this.filter = this.shadowRoot.getElementById('filter');
            this.select.addEventListener('input',(ev)=>{
                const value = this.select.value.trim();
                if(value===""){
                    this.nodes = [...this.querySelectorAll(`xy-option:not([disabled])`)];
                    this.filter.textContent = '';
                }else{
                    this.nodes = [...this.querySelectorAll(`xy-option[value*="${value}" i]:not([disabled])`)];
                    this.filter.textContent = `
                    :host([search]) ::slotted(xy-option:not([value*="${value}" i])){
                            display:none;
                        }
                    `
                }
                const place = this.querySelector(`xy-option[focusin]`);
                if(place){
                    place.focusin = false;
                }
                if(this.nodes[0]){
                    this.nodes[0].focusin = true;
                    this.empty = false;
                }else{
                    this.empty = true;
                }
                this.focusIndex = 0;
            })
            this.select.addEventListener('submit',(ev)=>{
                if(!this.options.open){
                    this.options.open = true;
                }else{
                    const item = this.nodes[this.focusIndex];
                    if(item){
                        this.value = item.value;
                    }else{
                        this.select.value = this.$value;
                        this.options.open = false;
                    }
                }
            })
        }else{
            this.addEventListener('click',(ev)=>{
                if(!this.options.open){
                    const item = this.nodes[this.focusIndex];
                    if(item){
                        this.value = item.value;
                    }
                }
            })
        }
        this.select.addEventListener('blur',(ev)=>{
            ev.stopPropagation();
            if(getComputedStyle(this.root).zIndex==2){
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
        this.slots.addEventListener('slotchange', () => {
            this.nodes = [...this.querySelectorAll(`xy-option:not([disabled])`)];
            if (!this.defaultvalue) {
                this.value = this.nodes[0].value;
            } else {
                this.value = this.defaultvalue;
            }
            this.init = true;
        });
    }

    

    get defaultvalue() {
        return this.getAttribute('defaultvalue');
    }

    get value() {
        return this.$value;
    }

    get text() {
        return this.select.textContent;
    }

    get name() {
        return this.getAttribute('name');
    }

    get empty() {
        return this.getAttribute('empty')!==null;
    }

    get type() {
        return this.getAttribute('type');
    }

    get validity() {
        return true;
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get search() {
        return this.getAttribute('search')!==null;
    }

    set disabled(value) {
        if (value === null || value === false) {
            this.removeAttribute('disabled');
        } else {
            this.setAttribute('disabled', '');
        }
    }

    set empty(value) {
        if (value === null || value === false) {
            this.removeAttribute('empty');
        } else {
            this.setAttribute('empty', '');
        }
    }

    set defaultvalue(value){
        this.setAttribute('defaultvalue', value);
    }

    set value(value) {
        let textContent = '';
        if (value !== this.value) {
            this.$value = value;
            const pre = this.querySelector(`xy-option[selected]`);
            if(pre){
                pre.selected = false;
                pre.focusin = false;
            }
            const cur = this.querySelector(`xy-option[value="${value}"]`)||this.querySelector(`xy-option`);
            this.focusIndex = this.nodes.indexOf(cur);
            cur.selected = true;
            cur.focusin = true;
            textContent = cur.textContent;
            if(this.search){
                this.select.placeholder = textContent;
                this.select.value = textContent;
            }else{
                this.txt.textContent = textContent;
            }
            if(this.init){
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        value: value,
                        text: textContent
                    }
                }));
            }
        }
        this.options.open = false;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'disabled' && this.select) {
            if (newValue != null) {
                this.select.disabled = true;
            } else {
                this.select.disabled = false;
            }
        }
    }
}

if (!customElements.get('xy-select')) {
    customElements.define('xy-select', XySelect);
}
import './xy-option.js';
import './xy-popover.js';

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
            border-radius: var(--borderRadius,.25em);
        }
        :host([block]){
            display:block;
        }
        
        :host(:not([disabled]):not([type="primary"]):focus-within) #select,
        :host(:not([disabled]):not([type="primary"]):hover) #select{
            border-color:var(--themeColor,#42b983);
            color:var(--themeColor,#42b983);
        }

        :host([search]:focus-within:not([disabled])) #select, 
        :host([search]:not([disabled]):hover) #select{
            color: var(--themeColor,#42b983);
        }

        :host([disabled]){
            pointer-events:none;
        }
        
        :host(:focus-within) xy-popover,:host(:active) xy-popover{ 
            z-index: 2;
        }
        xy-tips{
            display:block;
            width: 100%;
            height: 100%;
            border-radius: inherit;
        }
        
        #select:not([type="primary"]){
            display:flex;
            width:100%;
            height:100%;
            font-size: inherit;
            color: currentColor;
            border-radius: inherit;
        }
        :host([search]) #select{
            color:currentColor;
        }

        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        :host([invalid]) #select:not([type="primary"]){
            color:var(--errorColor,#f4615c);
        }

        #select span{
            flex:1;
            text-align:left;
            white-space: nowrap;
            text-overflow: ellipsis;
            flex-grow: 1;
            overflow: hidden;
        }
        
        xy-input::after{
            content:'';
            position:absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            cursor:default;
            pointer-events:none;
        }
        #select[readonly]::after{
            pointer-events:all;
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
            transition:.3s transform cubic-bezier(.645, .045, .355, 1);
        }
        :host([search]) .arrow{
            transition:color .3s  cubic-bezier(.645, .045, .355, 1),.3s transform cubic-bezier(.645, .045, .355, 1);
        }
        xy-popover[open] .arrow{
            transform:scaleY(-.8);
        }
        xy-popover{
            display:block;
            height:inherit;
            border-radius: inherit;
        }
        xy-popcon{
            min-width:100%;
            overflow:auto;
            max-height:50vh;
            scroll-behavior: smooth;
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
            <xy-tips id="tip" type="error">
                <${this.search?'xy-input':'xy-button'} id="select" debounce="200" readonly ${this.disabled? "disabled" : ""} ${this.type?("type="+this.type):""}>${this.search?"":'<span id="value"></span>'}<svg class="arrow" viewBox="0 0 1024 1024"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"></path></svg></${this.search?'xy-input':'xy-button'}>
            </xy-tips>
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
            if(pre){
                pre.focusin = false;
            }
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
        this.nativeclick = true;
        this.value = this.nodes[this.focusIndex].value;     
    }

    focus() {
        this.select.focus();
    }

    reset() {
        this.value = this.defaultvalue;
        this.tip.show = false;
        this.invalid = false;
    }

    checkValidity(){
        if(this.novalidate||this.disabled||this.form&&this.form.novalidate){
            return true;
        }
        if(this.validity){
            this.tip.show = false;
            this.invalid = false;
            return true;
        }else{
            this.focus();
            this.tip.show = 'show';
            this.invalid = true;
            this.tip.tips = this.errortips;
            return false;
        }
    }

    connectedCallback() {
        this.form = this.closest('xy-form');
        this.root = this.shadowRoot.getElementById('root');
        this.select = this.shadowRoot.getElementById('select');
        this.options = this.shadowRoot.getElementById('options');
        this.slots = this.shadowRoot.getElementById('slot');
        this.txt = this.shadowRoot.getElementById('value');
        this.tip = this.shadowRoot.getElementById('tip');
        this.focusIndex = -1;
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
                this.checkValidity();
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
                this.nativeclick = true;
                this.value = item.value;
            }
        })
        this.options.addEventListener('close',(ev)=>{
            if(this.search){
                this.select.readonly = true;
                this.select.value = this.$text;
                //this.value = this.$value;
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
            }else{
                this.focusIndex = -1;
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
                    this.nodes = [...this.querySelectorAll(`xy-option[key*="${value}" i]:not([disabled])`)];
                    this.filter.textContent = `
                    :host([search]) ::slotted(xy-option:not([key*="${value}" i]))
                    {
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
                    this.nativeclick = true;
                    if(item){
                        this.value = item.value;
                    }else{
                        this.value = this.$value;
                        this.options.open = false;
                    }
                }
            })
        }else{
            this.addEventListener('click',(ev)=>{
                if(!this.options.open){
                    const item = this.nodes[this.focusIndex];
                    if(item){
                        this.nativeclick = true;
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
                this.value = '';
            } else {
                this.value = this.defaultvalue;
            }
            this.init = true;
        });
    }

    

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||'';
    }

    get value() {
        return this.$value||'';
    }

    get text() {
        return this.$text||this.placeholder;
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
        return this.required?this.value!=='':true;
    }

    get novalidate() {
        return this.getAttribute('novalidate')!==null;
    }

    get errortips() {
        return this.getAttribute('errortips')||'请选择一项';
    }

    get required() {
        return this.getAttribute('required')!==null;
    }

    get invalid() {
        return this.getAttribute('invalid')!==null;
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get search() {
        return this.getAttribute('search')!==null;
    }

    get placeholder() {
        return this.getAttribute('placeholder')||'请选择';
    }

    set required(value) {
        if(value===null||value===false){
            this.removeAttribute('required');
        }else{
            this.setAttribute('required', '');
        }
    }

    set invalid(value) {
        if(value===null||value===false){
            this.removeAttribute('invalid');
        }else{
            this.setAttribute('invalid', '');
        }
    }

    set novalidate(value) {
        if(value===null||value===false){
            this.removeAttribute('novalidate');
        }else{
            this.setAttribute('novalidate', '');
        }
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
        if(value === ''){
            this.$value = '';
            this.$text = this.placeholder;
            if(this.focusIndex>=0){
                const current = this.nodes[this.focusIndex];
                if(current){
                    this.focusIndex = -1;
                    current.selected = false;
                    current.focusin = false;
                }
            }
            if(this.search){
                this.select.placeholder = this.placeholder;
                this.select.value = '';
            }else{
                this.txt.textContent = this.placeholder;
            }
            return
        }
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
            this.$text = cur.textContent;
            if(this.search){
                this.select.placeholder = this.$text;
                this.select.value = this.$text;
            }else{
                this.select.title = this.$text;
                this.txt.textContent = this.$text;
            }
            if(this.nativeclick){
                this.nativeclick = false;
                this.checkValidity();
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        value: value,
                        text: this.$text
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
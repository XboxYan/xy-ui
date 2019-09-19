import './xy-button.js';
import './xy-popover.js';

class XyOption extends HTMLElement {
    static get observedAttributes() { return ["value", "selected"]; }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host{
                display: block;
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
        <xy-button id="option" class="option" type="flat"><slot></slot></xy-button>
        `
    }


    connectedCallback() {
        this.option = this.shadowRoot.getElementById('option');
        this.option.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            this.parentNode.value = this.value;
            this.parentNode.focus();
        })
    }

    focus() {
        this.option.focus();
    }

    get value() {
        return this.getAttribute('value');
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
        
        :host(:focus-within) xy-popover{ 
            z-index: 2;
        }
        #select{
            display:flex;
            width:100%;
            height:100%;
        }
        #select span{
            flex:1;
            text-align:left;
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
        xy-popover{
            display:block;
            height:inherit;
        }
        xy-popcon{
            min-width:100%;
            overflow:hidden;
        }
        </style>
        <xy-popover id="root">
            <xy-button id="select" ${this.disabled? "disabled" : ""} ${this.type?("type="+this.type):""}><span id="value"></span><svg class="arrow" viewBox="0 0 1024 1024"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"></path></svg></xy-button>
            <xy-popcon id="options">
                <slot id="slot"></slot>
            </xy-popcon>
        </xy-popover>
        `
    }

    move(dir) {
        const focusIndex = dir + this.focusIndex;
        const current = this.nodes[focusIndex];
        if (current) {
            current.focus();
            this.focusIndex = focusIndex;
        }
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
                ev.preventDefault();
                switch (ev.keyCode) {
                    case 38://ArrowUp
                        this.move(-1);
                        break;
                    case 40://ArrowDown
                        this.move(1);
                        break;
                    case 8://Backspace
                    case 27://Esc
                        this.options.open = false;
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
            this.nodes = [...this.querySelectorAll(`xy-option`)];
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
        return this.select.value;
    }

    get text() {
        return this.select.textContent;
    }

    get name() {
        return this.getAttribute('name');
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

    set disabled(value) {
        if (value === null || value === false) {
            this.removeAttribute('disabled');
        } else {
            this.setAttribute('disabled', '');
        }
    }

    set defaultvalue(value){
        this.setAttribute('defaultvalue', value);
    }

    set value(value) {
        let textContent = '';
        if (value !== this.value) {
            this.select.value = value;
            const pre = this.querySelector(`xy-option[selected]`);
            if(pre){
                pre.selected = false;
            }
            const cur = this.querySelector(`xy-option[value="${value}"]`)||this.querySelector(`xy-option`);
            this.focusIndex = this.nodes.indexOf(cur);
            cur.selected = true;
            textContent = cur.textContent;
            this.txt.textContent = textContent;
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
                this.select.setAttribute('disabled', 'disabled');
            } else {
                this.select.removeAttribute('disabled');
            }
        }
    }
}

if (!customElements.get('xy-select')) {
    customElements.define('xy-select', XySelect);
}
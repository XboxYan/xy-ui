import './xy-button.js';

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
                display:block;
                border-radius:0;
                font-size: inherit;
            }
            :host([selected="true"]) .option{
                color:var(--themeColor,#42b983)
            }
        </style>
        <xy-button id="option" class="option" type="flat"><slot></slot></xy-button>
        `
    }


    connectedCallback() {
        this.option = this.shadowRoot.getElementById('option');
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
            this.setAttribute('selected', value);
        } else {
            this.removeAttribute('selected');
        }
    }

}

customElements.define('xy-option', XyOption);

export default class XySelect extends HTMLElement {

    static get observedAttributes() { return ['value', 'show', 'disabled', 'placeholder','type'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
        <style>
        :host{
            position:relative;
            display:inline-block;
            line-height:2.4;
            font-size: 14px;
            z-index: 1;
        }
        :host([block]){
            display:block;
        }
        :host([disabled]){ 
            cursor: not-allowed; 
        }
        :host xy-button{
            line-height: inherit;
            font-size: inherit;
        }
        /*
        :host(:active:not([disabled])) xy-button{
            border-color:var(--themeColor,#42b983);
            color:var(--themeColor,#42b983);
        }
        */
        :host(:focus-within),:host(:hover){ 
            z-index: 2;
        }
        #select{
            display:flex;
            width:100%;
        }
        #select span{
            flex:1;
            text-align:left;
        }
        .options{
            position:absolute;
            min-width:100%;
            border-radius:3px;
            overflow:hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background-color:#fff;
            margin-top:5px;
            visibility:hidden;
            transform:scale(0);
            transform-origin: top;
            transition:.3s cubic-bezier(.12, .4, .29, 1.46);
        }
        #select[data-show=true]+.options{
            visibility:visible;
            transform:scale(1);
        }
        #select[data-show=true] .arrow{
            transform:scaleY(-.8);
        }
        .arrow{
            position:relative;
            font-size:.9em;
            transform:scaleY(.8);
            transition: all 0s, transform .3s;
            margin-left:.5em;
        }
        .placeholder{
            font-style:normal;
            opacity:.6
        }
        
        </style>
        <xy-button id="select" ${this.disabled? "disabled" : ""} ${this.type?("type="+this.type):""}><span id="value"></span><xy-icon class="arrow" name="down"></xy-icon></xy-button>
        <div class="options" id="options">
            <slot id="slot"></slot>
        </div>
        `
    }

    setVisible(show) {
        this.show = show;
        this.select.dataset.show = show;
    }

    onshow(ev, visible) {
        this.focusIndex = Array.from(this.nodes).findIndex(el => el.value === this.value);
        ev.stopPropagation();
        document.querySelectorAll('xy-select').forEach((item) => {
            if (this === item) {
                if (!visible) {
                    this.show = !this.show;
                    this.select.dataset.show = this.show;
                }
            } else {
                item.setVisible(false);
            }
        })
    }

    move(dir) {
        const focusIndex = dir + this.focusIndex;
        const current = this.nodes[focusIndex];
        if (current) {
            current.focus();
            this.focusRoot = true;
            
            this.focusIndex = focusIndex;
        }
    }

    focus() {
        this.select.focus();
    }

    connectedCallback() {
        this.show = false;
        this.select = this.shadowRoot.getElementById('select');
        this.options = this.shadowRoot.getElementById('options');
        this.slots = this.shadowRoot.getElementById('slot');
        this.txt = this.shadowRoot.getElementById('value');
        this.focusIndex = 0;
        this.select.addEventListener('mousedown', (ev) => {
            this.focus();
        })
        this.select.addEventListener('click', (ev) => {
            this.onshow(ev);
        })
        this.select.addEventListener('focus', (ev) => {
            ev.stopPropagation();
            this.onshow(ev, true);
            if(!this.focusRoot){
                this.dispatchEvent(new CustomEvent('focus',{
                    detail:{
                        checked: this.value
                    }
                }));
            }
        })
        this.select.addEventListener('blur', (ev) => {
            ev.stopPropagation();
            if(!this.show){
                this.focusRoot = false;
                this.dispatchEvent(new CustomEvent('blur',{
                    detail:{
                        checked: this.value
                    }
                }));
            }
        })
        this.options.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const item = ev.target.closest('xy-option');
            this.focusRoot = true;
            if (item) {
                this.value = item.value;
                this.setVisible(false);
                this.select.focus();
            }
        })
        this.options.addEventListener('mousedown', (ev) => {
            ev.stopPropagation();
            this.focusRoot = true;
        })
        this.addEventListener('keydown', (ev) => {
            if (this.show) {
                switch (ev.keyCode) {
                    case 9://Tab
                        ev.preventDefault();
                        break;
                    case 38://ArrowUp
                        this.move(-1);
                        break;
                    case 40://ArrowDown
                        this.move(1);
                        break;
                    case 8://Backspace
                    case 27://Esc
                        this.setVisible(false);
                        this.select.focus();
                        break;
                    default:
                        break;
                }
            }
        })
        document.addEventListener('mousedown', () => {
            this.focusRoot = false;
            this.setVisible(false);
        })
        this.slots.addEventListener('slotchange', () => {
            this.nodes = this.querySelectorAll(`xy-option`);
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
            Array.from(this.querySelectorAll('xy-option')).forEach((item) => {
                if (item.value === value) {
                    item.selected = true;
                    textContent = item.textContent;
                    this.txt.innerText = textContent;
                } else {
                    item.selected = false;
                }
            })
            if(this.init){
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        value: value,
                        text: textContent
                    }
                }));
            }
        }
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
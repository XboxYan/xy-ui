import './xy-button.js';

class XyOptionGroup extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host{
                display: contents;
            }
            .group{
                line-height:2;
                padding:0 .625em;
                opacity:.6;
                font-size: .9em;
            }
            ::slotted(xy-option){
                --paddingLeft:1em;
            }
        </style>
        <div class="group">${this.label}</div>
        <slot></slot>
        `
    }

    get label() {
        return this.getAttribute('label');
    }

}

if(!customElements.get('xy-optgroup')){
    customElements.define('xy-optgroup', XyOptionGroup);
}

class XyOption extends HTMLElement {
    static get observedAttributes() { return ["value", "selected","disabled"]; }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host{
                display: block;
            }
            :host([hidden]){
                display: none;
            }
            .option {
                display: flex;
                justify-content: flex-start;
                border-radius:0;
                font-size: inherit;
                padding-left:var(--paddingLeft,.625em);
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
            this.scrollIntoView({
                block: "nearest"
            });
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

if(!customElements.get('xy-option')){
    customElements.define('xy-option', XyOption);
}
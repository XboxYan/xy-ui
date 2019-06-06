import XyButton from './xy-button.js';
customElements.define('xy-button', XyButton);

class XyOption extends HTMLElement {
    static get observedAttributes() { return ["value"]; }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            .option {
                display:block;
                border-radius:0;
            }
 
        </style>
        <xy-button class="option" type="flat"><slot></slot></xy-button>
        `
    }

    connectedCallback() {

    }

    get value() {
        return this.getAttribute('value');
    }

}

customElements.define('xy-option', XyOption);

export default class XySelect extends HTMLElement {

    static get observedAttributes() { return ['value','disabled'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            display:inline-block;
            transform:translateZ(0)
        }
        #select{
            width:100%;
        }
        #select span{
            flex:1;
            text-align:left;
        }
        .options{
            position:absolute;
            width:100%;
            border-radius:3px;
            overflow:hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-top:5px;
        }
        .arrow{
            position:relative;
            width: 10px;
        }
        .arrow::before,.arrow::after{
            position: absolute;
            width: 6px;
            height: 1.5px;
            background: #fff;
            background: currentColor;
            border-radius: 2px;
            transition: background .3s cubic-bezier(.645, .045, .355, 1),transform .3s cubic-bezier(.645, .045, .355, 1),top .3s cubic-bezier(.645, .045, .355, 1);
            content: '';
        }
        .arrow::before{
            transform: rotate(-45deg) translateX(2px);
        }
        .arrow::after{
            transform: rotate(45deg) translateX(-2px);
        }
        xy-button:hover{

        }
        </style>
        <xy-button id="select"><span id="value">option1</span><i class="arrow"></i></xy-button>
        <div class="options" id="options">
            <slot></slot>
        </div>
        `
    }

    connectedCallback() {
        const _this = this;
        this.select = this.shadowRoot.getElementById('select');
        this.options = this.shadowRoot.getElementById('options');
        this.options.addEventListener('click',function(ev){
            console.log(ev)
        })
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(value) {
        this.setAttribute('value', value);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( this.select && oldValue!==newValue ){
            
        }
    }
}

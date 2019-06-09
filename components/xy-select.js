import XyButton from './xy-button.js';
customElements.define('xy-button', XyButton);

class XyOption extends HTMLElement {
    static get observedAttributes() { return ["value","selected"]; }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            .option {
                display:block;
                border-radius:0;
            }
            :host([selected="true"]) .option{
                color:var(--themeColor,dodgerblue)
            }
        </style>
        <xy-button id="option" class="option" type="flat"><slot></slot></xy-button>
        `
    }

    connectedCallback() {
        this.option = this.shadowRoot.getElementById('option');
    }

    get value() {
        return this.getAttribute('value');
    }

    /**
     * @param {boolean} value
     */
    set selected(value) {
        if(value){
            this.setAttribute('selected', value);
        }else{
            this.removeAttribute('selected');
        }
    }

}

customElements.define('xy-option', XyOption);

export default class XySelect extends HTMLElement {

    static get observedAttributes() { return ['value','show','disabled'] }

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
            min-width:100%;
            border-radius:3px;
            overflow:hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-top:5px;
            transition:.3s;
            visibility:hidden;
            transform:scale(0);
            transform-origin: top;
        }
        .options[data-show=true]{
            visibility:visible;
            transform:scale(1);
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
        
        </style>
        <xy-button id="select"><span id="value">请选择</span><i class="arrow"></i></xy-button>
        <div class="options" id="options">
            <slot></slot>
        </div>
        `
    }

    setVisible(show) {
        this.show = show;
        this.options.dataset.show = show;
    }

    onfocus(ev,visible) {
        ev.stopPropagation();
        document.querySelectorAll('xy-select').forEach((item)=>{
            if(this === item ){
                if(!visible){
                    this.show = !this.show;
                    this.options.dataset.show = this.show;
                }
            }else{
                item.setVisible(false);
            }
        })
    }

    connectedCallback() {
        this.show = false;
        this.select = this.shadowRoot.getElementById('select');
        this.options = this.shadowRoot.getElementById('options');
        this.txt = this.shadowRoot.getElementById('value');
        this.select.addEventListener('click',(ev)=>{
            this.onfocus(ev);
        })
        this.select.addEventListener('focus',(ev)=>{
            this.onfocus(ev,true);
        })
        this.options.addEventListener('click',(ev)=>{
            if( ev.target.tagName === 'XY-OPTION' ){
                this.value = ev.target.value;
                this.setVisible(false);
                this.select.focus();
            }
        })
        document.addEventListener('click',()=>{
            this.setVisible(false);
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
            if( name === 'value' ){
                Array.from(this.querySelectorAll('xy-option')).forEach((item)=>{
                    if(item.value === newValue){
                        item.selected = true;
                        this.txt.innerText = item.textContent;
                    }else{
                        item.selected = false;
                    }
                })
            }
        }
    }
}

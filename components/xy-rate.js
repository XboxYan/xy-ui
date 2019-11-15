import './xy-tips.js';
import './xy-icon.js';

export default class XyRate extends HTMLElement {

    static get observedAttributes() { return ['color','size'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            display: inline-flex;
            font-size: 20px;
            direction:rtl;
            color:#eee;
         }
         label{
            cursor: pointer;
            display: block;
            line-height: 0;
            -webkit-tap-highlight-color: transparent;
         }
         input[type="radio"]{
            position: absolute;
            clip: rect(0,0,0,0)
         }
         input[type="radio"]:checked~.star-item{
            color:var(--themeColor,#42b983);
        }
        .star-item:hover xy-icon{
            transform:scale(1.2)
        }
        :host(:not([disabled]):hover) xy-tips.star-item{
            color:inherit;
        }
        :host(:not([disabled])) xy-tips.star-item:hover,
        :host(:not([disabled])) xy-tips.star-item:hover~.star-item{
           color:var(--themeColor,#42b983);
        }
        :host([disabled]) input[type="radio"]{
            visibility:hidden;
        }
        :host([disabled]) label{
            pointer-events: none; 
        }
        </style>
        <input tabindex="5" type="radio" name="item" id="item05" value="5" />
        <xy-tips class="star-item" tips=${this.tips[4]}>
            <label for="item05">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="4" type="radio" name="item" id="item04" value="4" />
        <xy-tips class="star-item" tips=${this.tips[3]}>
            <label for="item04">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="3" type="radio" name="item" id="item03" value="3" />
        <xy-tips class="star-item" tips=${this.tips[2]}>
            <label for="item03">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="2" type="radio" name="item" id="item02" value="2" />
        <xy-tips class="star-item" tips=${this.tips[1]}>
            <label for="item02">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="1" type="radio" name="item" id="item01" value="1" />
        <xy-tips class="star-item" tips=${this.tips[0]}>
            <label for="item01">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        `
    }

    get icon() {
        return this.getAttribute('icon')||'star-fill';
    }

    get value() {
        return this.shadowRoot.value;
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||0;
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get size() {
        return this.getAttribute('size')||'';
    }

    get color() {
        return this.getAttribute('color')||'';
    }

    get tips() {
        const tips = this.getAttribute('tips');
        if(tips){
            return this.getAttribute('tips').split(',');
        }else{
            return ['','','','',''];
        }
    }
    
    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set size(value) {
        this.setAttribute('size', value);
    }

    set color(value) {
        this.setAttribute('color', value);
    }

    set tips(value) {
        this.setAttribute('tips', value);
    }

    set value(value) {
        if(value === 0){
            this.radio[this.value-1].checked = false;
        }else{
            this.radio[Number(value)-1].checked = true;
        }
        this.shadowRoot.value = value;
    }

    focus(){
        this.shadowRoot.querySelector('input[type="radio"]').focus();
    }

    connectedCallback() {
        this.radio = [...this.shadowRoot.querySelectorAll('input[type="radio"]')].reverse();
        if(this.defaultvalue){
            this.shadowRoot.value = this.defaultvalue;
            this.radio[Number(this.defaultvalue)-1].checked = true;
        }
        this.radio.forEach((el)=>{
            el.addEventListener('change',(ev)=>{
                this.value = el.value;
                this.dispatchEvent(new CustomEvent('change',{
                    detail:{
                        value:this.value
                    }
                }));
            })
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'color' && this.shadowRoot){
            this.style.setProperty('--themeColor',newValue);
        }
        if( name == 'size' && this.shadowRoot){
            this.style.fontSize = newValue + 'px';
        }
    }
}

if(!customElements.get('xy-rate')){
    customElements.define('xy-rate', XyRate);
}

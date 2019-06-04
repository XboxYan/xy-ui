export default class XySlider extends HTMLElement {

    static get observedAttributes() { return ['value'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ display:block;  }
        :host([disabled]){ pointer-events:none; opacity:.8; }
        input[type="range"]{
            -webkit-appearance: none;
            outline : none;
        }
        input[type="range"]::-webkit-slider-runnable-track{
            display: flex;
            align-items: center;
            position: relative;
            height: 4px;
            background: #f22;
            border-radius:2px;
            background:var(--sliderColor,dodgerblue);
        }
        input[type="range"]::-webkit-slider-thumb{
            -webkit-appearance: none;
            position: relative;
            width:10px;
            height:10px;
            border-radius: 50%;
            background:var(--sliderColor,dodgerblue);
            transition:.2s;
          }
        input[type="range"]::-webkit-slider-thumb:active{
            transform:scale(1.2)
          }
        </style>
        <input id='slider' type='range'>
        `
        //console.log(this.parentNode.index);
    } 
    
    connectedCallback() {
        const _this = this;
        this.slider = this.shadowRoot.getElementById('slider');
        this.slider.value = this.value;
        this.slider.addEventListener('input',function(ev){
            _this.value = this.value;
            _this._oninput = true;
        })
        this.slider.addEventListener('change',function(ev){
            _this._oninput = false;
        })
    }

    get value() {
        return this.getAttribute('value')||0;
    }

    set value(value) {
        this.setAttribute('value', value);
        this.dispatchEvent(new CustomEvent('oninput', { detail: value }));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if(name=='value'){
            if(oldValue && oldValue!==newValue && !this._oninput){
                this.slider.value = newValue;
            }
        }
    }
    
}

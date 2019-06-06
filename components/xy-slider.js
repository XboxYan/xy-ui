export default class XySelect extends HTMLElement {

    static get observedAttributes() { return ['value','min','max','step','disabled'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ display:flex; padding:5px 0; }
        :host([disabled]){ opacity:.8; --themeColor:#999}
        ::-moz-focus-inner,::-moz-focus-outer{border:0;outline : 0;}
        input[type="range"]{
            width:100%;
            -webkit-appearance: none;
            outline : 0;
            background: rgba(0,0,0,.1);
            height: 4px;
            border-radius:2px;
        }
        input[type="range"]::-webkit-slider-runnable-track{
            display: flex;
            align-items: center;
            position: relative;
            height: 4px;
            border-radius:2px;
            background:linear-gradient(to right, var(--themeColor,dodgerblue) calc(100% * var(--percent)), transparent 0% )
        }
        input[type="range"]::-moz-range-progress {
            display: flex;
            align-items: center;
            position: relative;
            height: 4px;
            border-radius:2px;
            outline : 0;
            background:var(--themeColor,dodgerblue)
        }
        input[type="range"]::-webkit-slider-thumb{
            -webkit-appearance: none;
            border:0;
            position: relative;
            width:10px;
            height:10px;
            border-radius: 50%;
            background:var(--themeColor,dodgerblue);
            transition:.2s;
        }
        input[type="range"]::-moz-range-thumb{
            pointer-events:none;
            border:0;
            position: relative;
            width:10px;
            height:10px;
            border-radius: 50%;
            background:var(--themeColor,dodgerblue);
            transition:.2s;
        }
        input[type="range"]::-webkit-slider-thumb:active,
        input[type="range"]:focus::-webkit-slider-thumb{
            transform:scale(1.2);
            box-shadow:0 0 3px var(--themeColor,dodgerblue)
        }
        input[type="range"]::-moz-range-thumb:active,
        input[type="range"]:focus::-moz-range-thumb{
            transform:scale(1.2);
            box-shadow:0 0 3px var(--themeColor,dodgerblue)
        }
        </style>
        <input id='slider' value=${this.value} min=${this.min} max=${this.max} step=${this.step} ${this.disabled==""?"disabled":""} type='range'>
        `
    } 
    
    connectedCallback() {
        const _this = this;
        this.slider = this.shadowRoot.getElementById('slider');
        this.slider.addEventListener('input',function(ev){
            _this.value = this.value;
            _this._oninput = true;
        })
        this.slider.addEventListener('change',function(ev){
            _this.value = this.value;
            _this._oninput = false;
            _this.dispatchEvent(new CustomEvent('change'));
        })
    }

    get value() {
        return this.getAttribute('value')||0;
    }

    get min() {
        return this.getAttribute('min')||0;
    }

    get max() {
        return this.getAttribute('max')||100;
    }

    get disabled() {
        return this.getAttribute('disabled');
    }

    get step() {
        return this.getAttribute('step')||1;
    }

    set value(value) {
        this.setAttribute('value', value);
    }

    set min(value) {
        this.setAttribute('min', value);
    }

    set max(value) {
        this.setAttribute('max', value);
    }

    set step(value) {
        this.setAttribute('step', value);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        this.style.setProperty('--percent',(this.value-this.min)/(this.max-this.min));
        if( this.slider && oldValue!==newValue && !this._oninput){
            if(name == 'disabled'){
                if(newValue==""){
                    this.slider.setAttribute('disabled', 'disabled');
                }else{
                    this.slider.removeAttribute('disabled');
                }
            }else{
                this.slider[name] = newValue;
                this[name] = newValue;
            }
        }
    }
    
}

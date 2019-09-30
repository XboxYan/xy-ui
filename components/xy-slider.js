import './xy-tips.js';

export default class XySlider extends HTMLElement {

    static get observedAttributes() { return ['min','max','step','disabled','showtips','suffix'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ 
            box-sizing:border-box; 
            display:flex; 
            padding:0 5px;
            ${this.vertical?'height:var(--h,300px)':''}
        }
        :host([disabled]){ 
            opacity:.8; 
            --themeColor:#999; 
            cursor:not-allowed; 
        }
        :host([disabled]) input[type="range"]{ 
            pointer-events:none; 
        }
        #slider-con{ 
            display:flex; 
            padding:5px 0; 
            width:100%;
            margin: auto;
        }
        ::-moz-focus-inner,::-moz-focus-outer{
            border:0;
            outline : 0;
        }
        :host([showtips]){
            pointer-events:all;
        }
        input[type="range"]{
            pointer-events:all;
            margin:0 -5px;
            width: calc( 100% + 10px );
            -webkit-appearance: none;
            outline : 0;
            /*
            background: rgba(0,0,0,.1);
            */
            height: 12px;
            background:none;
            border-radius:2px;
        }
        input[type="range"]::-webkit-slider-runnable-track{
            display: flex;
            align-items: center;
            position: relative;
            height: 2px;
            border-radius:2px;
            background:linear-gradient(to right, var(--themeColor,#42b983) calc(100% * var(--percent)), rgba(0,0,0,.1) 0% )
        }
        input[type="range"]::-moz-range-progress {
            display: flex;
            align-items: center;
            position: relative;
            height: 2px;
            border-radius:2px;
            outline : 0;
            background:var(--themeColor,#42b983)
        }
        input[type="range"]::-moz-range-track{
            height: 2px;
            background: rgba(0,0,0,.1);
        }
        input[type="range"]::-webkit-slider-thumb{
            -webkit-appearance: none;
            border:2px solid var(--themeColor,#42b983);
            position: relative;
            width:10px;
            height:10px;
            border-radius: 50%;
            background:var(--themeColor,#42b983);
            transition:.2s cubic-bezier(.12, .4, .29, 1.46);
        }
        input[type="range"]::-moz-range-thumb{
            box-sizing:border-box;
            pointer-events:none;
            border:2px solid var(--themeColor,#42b983);
            position: relative;
            width:10px;
            height:10px;
            border-radius: 50%;
            background:var(--themeColor,#42b983);
            transition:.2s cubic-bezier(.12, .4, .29, 1.46);
        }
        input[type="range"]:focus{
            z-index:2;
        }
        input[type="range"]::-webkit-slider-thumb:active,
        input[type="range"]:focus::-webkit-slider-thumb{
            transform:scale(1.2);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background: #fff;
        }
        input[type="range"]::-moz-range-thumb:active,
        input[type="range"]:focus::-moz-range-thumb{
            transform:scale(1.2);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background: #fff;
        }
        :host([vertical]) #slider-con{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%) rotate(-90deg);
            width:calc( var(--h,300px) - 10px)
            
        }
        :host([vertical]) #slider-con::before{
            writing-mode: vertical-lr;
            padding: 10px 6px;
        }
        :host([vertical]){
            display:inline-flex;
            position:relative;
            width:20px;
        }
        :host([vertical]) xy-tips::before,:host([vertical]) xy-tips::after{
            left: calc( var(--percent,.5) * 100% + 5px );
        }
        :host(:focus-within) #slider-con,:host(:hover) #slider-con{
            z-index:10
        }
        </style>
        <xy-tips id='slider-con' dir=${this.vertical?"right":"top"} style="--percent:${(this.defaultvalue-this.min)/(this.max-this.min)}" tips="${this.showtips&&!this.disabled?this.defaultvalue:''}" suffix="${this.suffix}" prefix="${this.prefix}"><input id='slider' value=${this.defaultvalue} min=${this.min} max=${this.max} step=${this.step} ${this.disabled?"disabled":""} type='range'></xy-tips>
        `
    } 

    focus() {
        this.slider.focus();
    }
    
    connectedCallback() {
        this.slider = this.shadowRoot.getElementById('slider');
        this.sliderCon = this.shadowRoot.getElementById('slider-con');
        if( this.vertical ){
            this.resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { height } = entry.contentRect;
                    this.sliderCon.style.setProperty('--h',height + 'px');
                }
            });
            this.resizeObserver.observe(this);
        }
        this.slider.addEventListener('input',(ev) => {
            this.value = this.slider.value;
            this._oninput = true;
            ev.stopPropagation();
            this.dispatchEvent(new CustomEvent('input',{
                detail:{
                    value:this.slider.value
                }
            }));
        })
        this.slider.addEventListener('change',(ev) => {
            this.value = this.slider.value;
            this._oninput = false;
            this.dispatchEvent(new CustomEvent('change',{
                detail:{
                    value:this.slider.value
                }
            }));
        })
        this.addEventListener('wheel',(ev)=>{
            if(getComputedStyle(this.slider).zIndex==2){
                ev.preventDefault();
                if(ev.deltaY<0 && !this.vertical || ev.deltaY>0 && this.vertical){
                    this.value -= this.step*5;
                }else{
                    this.value += this.step*5;
                }
                this.dispatchEvent(new CustomEvent('change',{
                    detail:{
                        value:this.value
                    }
                }));
            }
        },true)
    }

    disconnectedCallback() {
        if( this.vertical ){
            this.resizeObserver.unobserve(this);
        }
    }

    get value() {
        return Number(this.slider.value);
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||0;
    }

    get suffix() {
        return this.getAttribute('suffix')||'';
    }

    get prefix() {
        return this.getAttribute('prefix')||'';
    }

    get min() {
        return this.getAttribute('min')||0;
    }

    get max() {
        return this.getAttribute('max')||100;
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get showtips() {
        return this.getAttribute('showtips')!==null;
    }

    get vertical() {
        return this.getAttribute('vertical')!==null;
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set showtips(value) {
        if(value===null||value===false){
            this.removeAttribute('showtips');
        }else{
            this.setAttribute('showtips', '');
        }
    }

    get step() {
        return this.getAttribute('step')||1;
    }

    set value(value) {
        this.slider.value = value;
        this.sliderCon.style.setProperty('--percent',(this.value-this.min)/(this.max-this.min));
        if( this.showtips&&!this.disabled){
            this.sliderCon.tips = this.value;
        }else{
            this.sliderCon.tips = '';
        }
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

    set prefix(value) {
        this.setAttribute('prefix', value);
    }
    
    set suffix(value) {
        this.setAttribute('suffix', value);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( this.slider && oldValue!==newValue && !this._oninput){
            if(name == 'disabled'){
                if(newValue!==null){
                    this.slider.setAttribute('disabled', 'disabled');
                }else{
                    this.slider.removeAttribute('disabled');
                }
            }else{
                this.slider[name] = newValue;
                this[name] = newValue;
                this.sliderCon.style.setProperty('--percent',(this.value-this.min)/(this.max-this.min));
                if( name === 'suffix'){
                    this.sliderCon.suffix = newValue;
                }
            }
        }
    }
    
}

if(!customElements.get('xy-slider')){
    customElements.define('xy-slider', XySlider);
}
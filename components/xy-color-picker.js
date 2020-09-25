import './xy-button.js';
import './xy-popover.js';
import message from './xy-message.js';
import { rgbToHsv,hslToHsv,parseToHSVA } from '../utils/color.js';
import { HSVaColor } from '../utils/hsvacolor.js';

const Material_colors = ['#f44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B','rgba(0,0,0,.65)','transparent']

class XyColorPane extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host{
                display: block;
                min-width: 300px;
            }
            .color-pane{
                padding:.8em;
            }
            .color-palette{
                position:relative;
                height:150px;
                background:linear-gradient(to top, hsla(0,0%,0%,calc(var(--a))), transparent), linear-gradient(to left, hsla(calc(var(--h)),100%,50%,calc(var(--a))),hsla(0,0%,100%,calc(var(--a)))),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0, 0 0,0 0,5px 5px;
                background-size:100% 100%, 100% 100%, 10px 10px, 10px 10px;
                user-select: none;
                cursor: crosshair;
                opacity:1;
                transition:opacity .1s;
            }
            .color-palette:active{
                opacity:.99;
            }
            .color-palette::after{
                pointer-events:none;
                position:absolute;
                content:'';
                box-sizing:border-box;
                width:10px;
                height:10px;
                border-radius:50%;
                border:2px solid #fff;
                left:calc(var(--s) * 1%);
                top:calc((100 - var(--v)) * 1%);
                transform:translate(-50%,-50%);
            }
            .color-chooser{
                display:flex;
                padding:10px 0;
            }
            .color-show{
                display:flex;
                position: relative;
                width:32px;
                height:32px;
                background:var(--c);
                transition:none;
                border-radius:50%;
                overflow:hidden;
                cursor:pointer;
            }
            .color-show .icon-file{
                width:1em;
                height:1em;
                margin: auto;
                fill: hsl(0, 0%, calc( ((2 - var(--s) / 100) * var(--v) / 200 * var(--a) - 0.6 ) * -999999%  ));
                opacity: 0;
                transition: .3s;
            }
            .color-show:hover .icon-file{
                opacity:1;
            }
            .color-show input{
                position:absolute;
                clip:rect(0,0,0,0);
            }
            .color-show::after{
                content:'';
                position:absolute;
                width:32px;
                height:32px;
                background:linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0,5px 5px;
                background-size:10px 10px;
                z-index:-1;
            }
            .color-range{
                flex:1;
                margin-left:10px;
            }
            input[type="range"]{
                display: block;
                pointer-events:all;
                width:100%;
                -webkit-appearance: none;
                outline : 0;
                height: 10px;
                border-radius:5px;
                margin:0;
            }
            input[type="range"]::-webkit-slider-runnable-track{
                display: flex;
                align-items: center;
                position: relative;
            }
            input[type="range"]::-webkit-slider-thumb{
                -webkit-appearance: none;
                position: relative;
                width:10px;
                height:10px;
                transform:scale(1.2);
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                background:#fff;
                transition:.2s cubic-bezier(.12, .4, .29, 1.46);
            }
            input[type="range"]::-moz-range-thumb{
                box-sizing:border-box;
                pointer-events:none;
                position: relative;
                width:10px;
                height:10px;
                transform:scale(1.2);
                border-radius: 50%;
                border:0;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                background:#fff;
                transition:.2s cubic-bezier(.12, .4, .29, 1.46);
            }
            input[type="range"]::-webkit-slider-thumb:active,
            input[type="range"]:focus::-webkit-slider-thumb{
                transform:scale(1.5);
            }
            input[type="range"]::-moz-range-thumb:active,
            input[type="range"]:focus::-moz-range-thumb{
                transform:scale(1.5);
            }
            input[type="range"]+input[type="range"]{
                margin-top:10px;
            }
            .color-hue{
                background:linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)
            }
            .color-opacity{
                background:linear-gradient(to right, hsla(calc(var(--h)),100%,50%,0), hsla(calc(var(--h)),100%,50%,1)),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0,0 0,5px 5px;
                background-size:100% 100%,10px 10px,10px 10px;
            }
            .color-label{
                position:absolute;
                display:flex;
                visibility:hidden;
                opacity:0;
                left:0;
                right:0;
                top:0;
                bottom:0;
                transition: .3s;
            }
            .color-label input{
                flex:1;
                margin-right:.8em;
                outline:0;
                min-width:0;
                width: 0;
                border-radius:var(--borderRadius,.25em);
                border:1px solid #ddd;
                padding:0 5px;
                line-height:28px;
                text-align:center;
                -moz-appearance: textfield;
                transition:.3s;
            }
            input[type="number"]::-webkit-inner-spin-button{
                display:none;
            }
            ::-moz-focus-inner,::-moz-focus-outer{
                border:0;
                outline : 0;
            }
            .color-label input:focus{
                border-color:var(--themeColor,#42b983);
            }
            .color-footer{
                display:flex
            }
            .btn-switch{
                position:relative;
                border-radius:var(--borderRadius,.25em);
                background:none;
                border:0;
                outline:0;
                line-height:30px;
                width: 60px;
                padding: 0;
                color:var(--themeColor,#42b983);
                overflow:hidden;
            }
            .btn-switch::before{
                content:'';
                position:absolute;
                left:0;
                top:0;
                right:0;
                bottom:0;
                background:var(--themeBackground,var(--themeColor,#42b983));
                opacity:.2;
                transition:.3s;
            }
            .btn-switch:hover::before,.btn-switch:focus::before{
                opacity:.3;
            }
            .color-input{
                position:relative;
                flex:1;
                height:30px;
                overflow:hidden;
            }
            .color-footer[data-type="HEXA"] .color-label:nth-child(1),
            .color-footer[data-type="RGBA"] .color-label:nth-child(2),
            .color-footer[data-type="HSLA"] .color-label:nth-child(3){
                opacity:1;
                visibility:inherit;
                z-index:2;
            }
            .color-sign{
                padding-top:10px;
                display:grid;
                grid-template-columns: repeat(auto-fit, minmax(15px, 1fr));
                grid-gap: 10px;
            }
            .color-sign>button{
                position:relative;
                cursor:pointer;
                width:100%;
                padding-bottom:0;
                padding-top:100%;
                border-radius:4px;
                border:0;
                outline:0;
            }
            .color-sign>button::before{
                content:'';
                position:absolute;
                left:0;
                top:0;
                width:100%;
                height:100%;
                z-index:-1;
                background:linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0,5px 5px;
                background-size:10px 10px;
                border-radius: 4px;
            }
            .color-sign>button::after{
                content:'';
                position:absolute;
                opacity:.5;
                z-index:-2;
                left:0;
                top:0;
                width:100%;
                height:100%;
                background:inherit;
                border-radius:4px;
                transition:.3s;
            }
            .color-sign>button:hover::after,.color-sign>button:focus::after{
                transform:translate(2px,2px)
            }
        </style>
        <div class="color-pane" id="color-pane">
            <div class="color-palette" id="color-palette"></div>
            <div class="color-chooser">
                <a class="color-show" id="copy-btn"><svg class="icon-file" viewBox="0 0 1024 1024"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z"></path><path d="M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg><input></a>
                <div class="color-range">
                    <input class="color-hue" value="0" min="0" max="360" type="range" id="range-hue">
                    <input class="color-opacity" value="1" min="0" max="1" step="0.01" type="range" id="range-opacity">
                </div>
            </div>
            <div class="color-footer" data-type="HEXA">
                <div class="color-input">
                    <div class="color-label" id="color-hexa">
                        <input spellcheck="false" />
                    </div>
                    <div class="color-label" id="color-rgba">
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="1" step="0.01" spellcheck="false" />
                    </div>
                    <div class="color-label" id="color-hlsa">
                        <input type="number" min="0" max="360" spellcheck="false" />
                        <input type="number" min="0" max="100" spellcheck="false" />
                        <input type="number" min="0" max="100" spellcheck="false" />
                        <input type="number" min="0" max="1" step="0.01" spellcheck="false" />
                    </div>
                </div>
                <button class="btn-switch" id="btn-switch" type="flat">HEXA</button>
            </div>
            <div class="color-sign" id="colors">
                ${
                    Material_colors.map(el=>'<button style="background-color:'+el+'" data-color='+el+'></button>').join('')
                }
            </div>
        </div>
        `
    }

    choose(ev){
        const {x,y,width:w,height:h} = this.palette.getBoundingClientRect();
        const value = [...this.$value];
        const _x = Math.min(Math.max(0,(ev.clientX-x)/w*100),100);
        const _y = Math.min(Math.max(0,(ev.clientY-y)/h*100),100);
        value[1] = _x;
        value[2] = 100-_y;
        this.value = `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
    }

    connectedCallback() {
        this.type = ['HEXA','RGBA','HSLA'];
        this.typeindex = 0;
        this.palette = this.shadowRoot.getElementById('color-palette');
        this.colors = this.shadowRoot.getElementById('colors');
        this.pane = this.shadowRoot.getElementById('color-pane');
        this.rangeHue = this.shadowRoot.getElementById('range-hue');
        this.rangeOpacity = this.shadowRoot.getElementById('range-opacity');
        this.copyBtn = this.shadowRoot.getElementById('copy-btn');
        this.copyinfo = this.copyBtn.querySelector('input');
        this.switch = this.shadowRoot.getElementById('btn-switch');
        this.colorHexa = this.shadowRoot.getElementById('color-hexa').querySelectorAll('input');
        this.colorRgba = this.shadowRoot.getElementById('color-rgba').querySelectorAll('input');
        this.colorHlsa = this.shadowRoot.getElementById('color-hlsa').querySelectorAll('input');
        this.value = this.defaultvalue;
        this.rangeHue.addEventListener('input',()=>{
            const value = [...this.$value];
            value[0] = Number(this.rangeHue.value);
            this.nativeclick = true;
            this.value = `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
        })
        this.palette.addEventListener('mousedown',(ev)=>{
            this.start = true;
            this.choose(ev);
        })
        document.addEventListener('mousemove',this.mousemove);

        document.addEventListener('mouseup',this.mouseup);
        this.rangeOpacity.addEventListener('input',()=>{
            const value = [...this.$value];
            value[3] = Number(this.rangeOpacity.value);
            this.nativeclick = true;
            this.value = `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
        })
        this.colors.addEventListener('click',(ev)=>{
            const item = ev.target.closest('button');
            if(item){
                this.nativeclick = true;
                this.value = item.dataset.color;
            }
        })
        this.switch.addEventListener('click',()=>{
            this.typeindex ++;
            this.typeindex %= 3;
            this.switch.textContent = this.type[this.typeindex];
            this.nativeclick = true;
            this.value = this.value;
            this.switch.parentNode.dataset.type = this.type[this.typeindex];
        })
        this.copyBtn.addEventListener('click',()=>{
            this.copyinfo.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                message.success(this.value);
            }
        })
        this.colorHexa.forEach(el=>{
            el.addEventListener('change',()=>{
                this.nativeclick = true;
                this.value = el.value;
            })
        })
        this.colorRgba.forEach((el,i)=>{
            el.addEventListener('change',()=>{
                const value = HSVaColor(...this.$value).toRGBA();
                value[i] = Number(el.value);
                this.nativeclick = true;
                this.value = `rgba(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`;
            })
        })
        this.colorHlsa.forEach((el,i)=>{
            el.addEventListener('change',()=>{
                const value = HSVaColor(...this.$value).toHSLA();
                value[i] = Number(el.value);
                this.nativeclick = true;
                this.value = `hsla(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
            })
        })
    }

    mousemove = (ev) => {
        if(this.start){
            this.choose(ev);
        }
    }

    mouseup = () => {
        if(getComputedStyle(this.palette).opacity!==1 &&　this.start){
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: this.value,
                    color: this.color
                }
            }));
        }
        this.start = false;
    }

    disconnectedCallback() {
        document.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseup', this.mouseup);
    }

    get value() {
        return HSVaColor(...this.$value)['to'+this.type[this.typeindex]]().toString();
    }

    get color() {
        return HSVaColor(...this.$value);
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||'#ff0000';
    }

    set defaultvalue(value) {
        this.setAttribute("defaultvalue",value);
    }

    set value(value) {
        this.$value = parseToHSVA(value).values;
        //[h,s,v,a]
        const [h,s,v,a=1] = this.$value;
        this.pane.style.setProperty('--h',h);
        this.pane.style.setProperty('--s',s);
        this.pane.style.setProperty('--v',v);
        this.pane.style.setProperty('--a',a);
        this.pane.style.setProperty('--c',this.value);
        this.copyinfo.value = this.value;
        this.rangeHue.value = h;
        this.rangeOpacity.value = a.toFixed(2);
        const COLOR = HSVaColor(...this.$value);
        this.colorHexa[0].value = COLOR.toHEXA().toString();
        const RGBA = COLOR.toRGBA();
        this.colorRgba[0].value = RGBA[0].toFixed(0);
        this.colorRgba[1].value = RGBA[1].toFixed(0);
        this.colorRgba[2].value = RGBA[2].toFixed(0);
        this.colorRgba[3].value = RGBA[3].toFixed(2);
        const HSLA = COLOR.toHSLA();
        this.colorHlsa[0].value = HSLA[0].toFixed(0);
        this.colorHlsa[1].value = HSLA[1].toFixed(0);
        this.colorHlsa[2].value = HSLA[2].toFixed(0);
        this.colorHlsa[3].value = HSLA[3].toFixed(2);
        if(this.nativeclick){
            this.nativeclick = false;
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: this.value,
                    color: this.color
                }
            }));
        }
    }

}

customElements.define('xy-color-pane', XyColorPane);

export default class XyColorPicker extends HTMLElement {

    static get observedAttributes() { return ['disabled','dir'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
        <style>
        :host{
            display:inline-block;
            width:30px;
            height:30px;
            font-size:14px;
        }
        :host([block]){
            display:block;
        }

        :host([disabled]){
            pointer-events:none;
        }
        
        :host(:focus-within) xy-popover,:host(:hover) xy-popover{ 
            z-index: 2;
        }
        xy-popover{
            width:100%;
            height:100%;
        }
        .color-btn{
            width:100%;
            height:100%;
            padding:5px;
            background-clip: content-box;
            background-color:var(--themeColor,#42b983);
        }
        .color-btn:hover{
            z-index: auto;
        }
        xy-popover{
            display:block;
        }
        xy-popcon{
            min-width:100%;
        }
        .pop-footer{
            display:flex;
            justify-content:flex-end;
            padding:0 .8em .8em;
        }
        .pop-footer xy-button{
            font-size: .8em;
            margin-left: .8em;
        }
        .color-btn::before{
            content:'';
            position:absolute;
            left:5px;
            top:5px;
            right:5px;
            bottom:5px;
            z-index:-1;
            background:linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
            background-position:0 0,5px 5px;
            background-size:10px 10px;
        }
        </style>
        <xy-popover id="popover" ${this.dir? "dir='"+this.dir+"'" : ""}>
            <xy-button class="color-btn" id="color-btn" ${this.disabled? "disabled" : ""}></xy-button>
            <xy-popcon id="popcon">
                <div class="pop-footer">
                    <xy-button autoclose>取 消</xy-button>
                    <xy-button type="primary" id="btn-submit" autoclose>确 认</xy-button>
                </div>
            </xy-popcon>
        </xy-popover>
        `
    }

    focus() {
        this.colorBtn.focus();
    }

    connectedCallback() {
        this.popover = this.shadowRoot.getElementById('popover');
        this.popcon = this.shadowRoot.getElementById('popcon');
        this.colorBtn = this.shadowRoot.getElementById('color-btn');
        this.btnSubmit = this.shadowRoot.getElementById('btn-submit');
        this.colorBtn.addEventListener('click',()=>{
            if(!this.colorPane){
                this.colorPane = new XyColorPane();
                this.colorPane.defaultvalue = this.defaultvalue;
                this.popcon.prepend(this.colorPane);
            }
        })
        this.btnSubmit.addEventListener('click',()=>{
            this.nativeclick = true;
            this.value = this.colorPane.value;
        })
        this.popcon.addEventListener('close',()=>{
            this.colorPane.value = this.value;
        })
        this.value = this.defaultvalue;
    }

    

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||'#42b983';
    }

    get value() {
        return this.$value;
    }

    get color() {
        return HSVaColor(...parseToHSVA(this.$value).values);
    }

    get type() {
        return this.getAttribute('type');
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get dir() {
        return this.getAttribute('dir');
    }

    set dir(value){
        this.setAttribute('dir', value);
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
        this.colorBtn.style.setProperty('--themeColor',value);
        this.$value = value;
        if(this.nativeclick){
            this.nativeclick = false;
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: this.value,
                    color: this.color
                }
            }));
        }else{
            if(this.colorPane){
                this.colorPane.value = this.value;
            }else{
                this.defaultvalue = this.value;
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'disabled' && this.colorBtn) {
            if (newValue != null) {
                this.colorBtn.setAttribute('disabled', 'disabled');
            } else {
                this.colorBtn.removeAttribute('disabled');
            }
        }
        if (name == 'dir' && this.popover) {
            if (newValue != null) {
                this.popover.dir = newValue;
            }
        }
    }
}

if (!customElements.get('xy-color-picker')) {
    customElements.define('xy-color-picker', XyColorPicker);
}
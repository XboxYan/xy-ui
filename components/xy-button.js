export default class XyButton extends HTMLElement {

    static get observedAttributes() { return ['disabled'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ display:inline-block; box-sizing:border-box; vertical-align: middle; overflow:hidden; line-height: 2.4; border:1px solid #ddd; font-size: 14px; color: #333;  border-radius: 3px; transition:background .3s,box-shadow .3s,border-color .3s,color .3s; transform: translateZ(0);}
        :host([disabled]){ pointer-events:none; opacity:.8; cursor: not-allowed; }
        :host(:not([type="primary"]):hover),:host(:not([type="primary"]):focus-within){ color:var(--themeColor,dodgerblue); border-color: var(--themeColor,dodgerblue); }
        :host(:not([type="primary"])) .btn>label::after{ background: var(--themeColor,dodgerblue); }
        :host([type="primary"]){ border-color: var(--themeColor,dodgerblue); color: #fff; background: var(--themeColor,dodgerblue) }
        :host([type="dashed"]){ border-style:dashed }
        :host([type="flat"]){ border:0 }
        :host([type="flat"]) .btn{ padding:1px .8em; }
        :host([type="flat"]) .btn::before{ content:''; position:absolute; background: var(--themeColor,dodgerblue); pointer-events:none; left:0; right:0; top:0; bottom:0; opacity:0; transition:.3s;}
        :host([type="flat"]:hover) .btn::before{ opacity:.1 }
        :host([type="flat"]:focus-within) .btn:before{ opacity:.2 }
        :host(:focus-within){ box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .btn{ display:flex; width:100%; align-items:center; color: inherit; line-height: inherit; font-size: inherit;  background:none; outline:0; border:0; position: relative; padding:0 .8em; user-select: none; text-align: center; }
        ::-moz-focus-inner{border:0;}
        .btn>label{ position: absolute; left: 0; top: 0; padding:0; width: 100%; height: 100%; overflow:hidden; cursor: pointer; outline:0; }
        .btn>label::after{ content: ''; pointer-events:none; position: absolute; background: transparent; border-radius:50%; width: 100%; padding-top: 100%; margin-left: -50%; margin-top: -50%; left: var(--x,-100%); top: var(--y,-100%); background:#fff; opacity:.3 }
        .btn>input[type=checkbox]{position:absolute; clip:rect(0,0,0,0)}
        .btn>input[type=checkbox]+label:after{animation: ripple-in .5s forwards;}
        .btn>input[type=checkbox]:checked+label:after{animation: ripple-out .5s forwards;}
        @keyframes ripple-in{
            0% {
                transform: scale(0);
                opacity:.3;
            }
            70% {
                transform: scale(1.5);
                opacity:.1;
            }
            100% {
                transform: scale(2);
                opacity:0;
            }
        }
        @keyframes ripple-out{
            0% {
                transform: scale(0);
                opacity:.3;
            }
            70% {
                transform: scale(1.5);
                opacity:.1;
            }
            100% {
                transform: scale(2);
                opacity:0;
            }
        }
        </style>
        <button class="btn" id="btn" ${this.disabled==""?"disabled":""} tabindex="1"><input type="checkbox" tabindex="-1" id="checkbox"><label for="checkbox" id="label" tabindex="-1"></label><slot></slot></button>
        `
    }

    get disabled() {
        return this.getAttribute('disabled');
    }
    
    connectedCallback() {
        const _this = this;
        this.btn = this.shadowRoot.getElementById('btn');
        this.label = this.shadowRoot.getElementById('label');
        this.checkbox = this.shadowRoot.getElementById('checkbox');
        this.label.addEventListener('mousedown',function(ev){
            ev.preventDefault();
            ev.stopPropagation();
            const { offsetX, offsetY } = ev;
            this.style.setProperty('--x',offsetX+'px');
            this.style.setProperty('--y',offsetY+'px');
        })
        this.checkbox.addEventListener('click',function(ev){
            ev.stopPropagation();
            _this.btn.focus();
        })
        // this.btn.addEventListener('click',function(ev){
        //     //ev.stopPropagation();
        //     _this.dispatchEvent(new MouseEvent('click'));
        // })

    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled' && this.btn){
            if(newValue==""){
                this.btn.setAttribute('disabled', 'disabled');
            }else{
                this.btn.removeAttribute('disabled');
            }
        }
    }
}

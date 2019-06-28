
export default class XyRadio extends HTMLElement {

    static get observedAttributes() { return ['disabled','checked'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ 
            display:inline-block;
            font-size:14px;
            color:#333;
            -webkit-tap-highlight-color: transparent;
        }
        :host([disabled]){ 
            pointer-events: none; 
            opacity:.6; 
        }
        :host([disabled]) label{ 
            pointer-events: all;  
            cursor: not-allowed; 
        }
        #radio{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
            border-color:var(--themeColor,dodgerblue);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            z-index:1;
        }
        :host([disabled]) .cheked{ 
            background:rgba(0,0,0,.1);
        }
        label{
            box-sizing:border-box;
            cursor:pointer;
            display:flex;
            align-items:center;
            outline:0;
        }
        .cheked{
            position:relative;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            display: flex;
            border-radius:50%;
            border: 1px solid #d9d9d9;
            transition:.3s;
            margin-right:5px;
        }
        .cheked::before{
            content:'';
            width:8px;
            height:8px;
            margin:auto;
            border-radius:50%;
            background:var(--themeColor,dodgerblue);
            transform: scale(0);
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        .cheked::after{
            position:absolute;
            content:'';
            width:100%;
            height:100%;
            background:var(--themeColor,dodgerblue);
            border-radius:50%;
            opacity:.2;
            transform:scale(0);
            z-index:-1;
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        /*
        :host(:focus-within) .cheked::after,:host(:not([disabled]):active) .cheked::after{ 
            transform:scale(2.5);
        }
        */
        #radio:focus-visible+label .cheked::after{
            transform:scale(2.5);
        }
        #radio:checked+label .cheked::before{
            transform: scale(1);
        }
        #radio:checked+label .cheked{
            border-color:var(--themeColor,dodgerblue);
        }
        </style>
        <input type="checkbox" id="radio" ><label id="label" for="radio"><span class="cheked"></span><slot></slot></label>
        `
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get checked() {
        return this.getAttribute('checked')!==null;
    }

    get name() {
        return this.getAttribute('name');
    }

    get value() {
        return this.getAttribute('value')||this.textContent;
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', '');
        }
    }

    set checked(value) {
        if(value===null||value===false){
            this.removeAttribute('checked');
        }else{
            this.setAttribute('checked', '');
        }
    }
    
    connectedCallback() {
        this.radio = this.shadowRoot.getElementById('radio');
        this.disabled = this.disabled;
        this.checked = this.checked;
        this.radio.addEventListener('change',(ev)=>{
            const prev = document.querySelector(`xy-radio[name="${this.name}"][checked]`);
            if( prev ){
                prev.checked = false;
            }
            this.checked = true;
        })
        this.radio.addEventListener('keydown', (ev) => {
            switch (ev.keyCode) {
                case 13://Enter
                    const prev = document.querySelector(`xy-radio[name="${this.name}"][checked]`);
                    if( prev ){
                        prev.checked = false;
                    }
                    this.checked = true;
                    break;
                default:
                    break;
            }
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled' && this.radio){
            if(newValue!==null){
                this.radio.setAttribute('disabled', 'disabled');
            }else{
                this.radio.removeAttribute('disabled');
            }
        }
        if( name == 'checked' && this.radio){
            if(newValue!==null){
                this.radio.checked = true;
            }else{
                this.radio.checked = false;
            }
            if (oldValue !== newValue) {
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        checked: this.checked
                    }
                }));
            }
        }
    }
}

if(!customElements.get('xy-radio')){
    customElements.define('xy-radio', XyRadio);
}

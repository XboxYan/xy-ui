export default class XyCheckbox extends HTMLElement {

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
        }
        :host([disabled]){ 
            pointer-events: none; 
            opacity:.6; 
        }
        :host([disabled]) label{ 
            pointer-events: all;  
            cursor: not-allowed; 
        }
        #checkbox{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
            border-color:var(--themeColor,dodgerblue);
        }
        :host(:focus-within) .cheked{ 
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        :host([disabled]) .cheked{ 
            background-color:#ddd
        }
        label{
            box-sizing:border-box;
            cursor:pointer;
            display:flex;
            align-items:center;
        }
        .cheked{
            position:relative;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            transition:.3s;
            margin-right:5px;
        }
        .cheked::before{
            position:absolute;
            content:'';
            width:4px;
            height:9px;
            margin:0px 4px;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
            transform: rotate(45deg) scale(0);
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
        :host(:focus-within) .cheked::after,:host(:active) .cheked::after{ 
            transform:scale(2.5);
        }
        #checkbox:checked+label .cheked::before{
            transform: rotate(45deg) scale(1);
        }
        #checkbox:checked+label .cheked{
            border-color:transparent;
            background-color:var(--themeColor,dodgerblue);
        }
        </style>
        <input type="checkbox" id="checkbox"><label for="checkbox"><span class="cheked"></span><slot></slot></label>
        `
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get name() {
        return this.getAttribute('name');
    }

    get checked() {
        return this.getAttribute('checked')!==null;
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
        this.checkbox = this.shadowRoot.getElementById('checkbox');
        this.disabled = this.disabled;
        this.checked = this.checked;
        this.checkbox.addEventListener('change',(ev)=>{
            this.checked = ev.target.checked;
        })
        this.checkbox.addEventListener('keydown', (ev) => {
            switch (ev.keyCode) {
                case 13://Enter
                    this.checked = !this.checked;
                    break;
                default:
                    break;
            }
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'disabled' && this.checkbox){
            if(newValue!==null){
                this.checkbox.setAttribute('disabled', 'disabled');
            }else{
                this.checkbox.removeAttribute('disabled');
            }
        }
        if( name == 'checked' && this.checkbox){
            if(newValue!==null){
                this.checkbox.checked = true;
            }else{
                this.checkbox.checked = false;
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

if(!customElements.get('xy-checkbox')){
    customElements.define('xy-checkbox', XyCheckbox);
}

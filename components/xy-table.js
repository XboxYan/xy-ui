import './xy-loading.js';

class XyTr extends HTMLElement {

    static get observedAttributes() { return ['checked'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:contents;
        }
        :host(:hover) ::slotted(xy-td)::before{
            opacity:.1;
        }
        :host(:hover) .select::before{
            opacity:.1;
        }
        .select{
            display:var(--select,none);
        }
        .select xy-checkbox{
            background-color: #fff;
            border-radius: 2px;
            z-index: 5;
        }
        </style>
        <xy-td class="select"><xy-checkbox></xy-checkbox></xy-td>
        <slot></slot>
        `
    }

    get checked() {
        return this.getAttribute('checked')!==null;
    }

    set checked(value) {
        if(value===null||value===false){
            this.removeAttribute('checked');
        }else{
            this.setAttribute('checked', '');
        }
    }

    connectedCallback() {
        this.checkbox = this.shadowRoot.querySelector('xy-checkbox');
        this.checkbox.addEventListener('change',()=>{
            this.checked = this.checkbox.checked;
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    checked: this.checked
                }
            }));
        })
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'checked' && this.checkbox){
            this.checkbox.checked = newValue;
        }
    }
}

if(!customElements.get('xy-tr')){
    customElements.define('xy-tr', XyTr);
}

class XyTd extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            position:relative;
            padding: .625em;
            color: var(--fontColor,#333);
            font-size: 14px;
            display: flex;
            align-items: center;
        }
        :host::before,:host::after{
            content:'';
            position:absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            transition:.3s opacity;
            pointer-events:none;
            z-index: -1;
        }
        :host::before{
            background:var(--themeColor,#42b983);
            opacity:0;
        }
        :host::after{
            background:var(--cellColor);
            opacity:0.1;
        }
        </style>
        <slot></slot>
        `
    }
}

if(!customElements.get('xy-td')){
    customElements.define('xy-td', XyTd);
}

export default class XyTable extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            line-height: 1.5;
            display:grid;
            grid-template-columns:${this.select?'auto':''} repeat(var(--columns),1fr);
            grid-row-gap: 1px;
            position:relative;
            --columns:${this.thead.length||1};
        }
        ::slotted(xy-tr:nth-child(even)){
            --cellColor:var(--themeColor,#42b983);
        }
        .loading{
            position: absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            background-color:rgba(255,255,255,.6);
            visibility:hidden;
            opacity:0;
            transition:.3s;
        }
        :host([loading]) .loading{
            visibility:visible;
            opacity:1;
        }
        .th{
            position:relative;
            display: flex;
            align-items: center;
            padding: .625em;
            justify-content:center;
            color: var(--themeColor,#42b983);
            font-weight: bold;
        }
        .th::before{
            content:'';
            position:absolute;
            background:var(--themeColor,#42b983);
            opacity:.2;
            left:0;
            right:0;
            top:0;
            bottom:0;
            pointer-events:none;
            z-index: -1;
        }
        :host([select]) ::slotted(xy-tr){
            --select: flex;
        }
        .th xy-checkbox{
            background-color: #fff;
            border-radius: 2px;
            z-index: 5;
        }
        </style>
        ${
            this.select?'<div class="th"><xy-checkbox></xy-checkbox></div>':''
        }
        ${
            this.thead.map(el=>'<div class="th">'+el+'</div>').join('')
        }
        <slot></slot>
        <xy-loading class="loading"></xy-loading>
        `
    }

    get thead(){
        const thead = this.getAttribute('thead');
        return thead?thead.split(','):[];
    }

    get select(){
        return this.getAttribute('select')!==null;
    }

    get loading() {
        return this.getAttribute('loading')!==null;
    }

    get value() {
        return Array.from(this.querySelectorAll('xy-tr[checked]'),el=>el.id||el.index);
    }

    set loading(value) {
        if(value===null||value===false){
            this.removeAttribute('loading');
        }else{
            this.setAttribute('loading', '');
        }
    }

    connectedCallback() {
        if(this.select){
            this.checkbox = this.shadowRoot.querySelector('xy-checkbox');
            this.slots = this.shadowRoot.querySelector('slot');
            this.slots.addEventListener('slotchange',()=>{
                this.cell = [...this.querySelectorAll('xy-tr')];
                this.cell.forEach((el,i)=>{
                    !el.id && (el.index = i);
                    el.onchange = () => {
                        let isAll = true;
                        let isEmpty = true;
                        this.cell.forEach(el=>{
                            if(!el.checked){
                                isAll = false;
                            }else{
                                isEmpty = false;
                            }
                        })
                        this.checkbox.indeterminate = !isEmpty && !isAll;
                        this.checkbox.checked = isAll;
                    }
                })
            })
            this.checkbox.addEventListener('change',()=>{
                this.cell.forEach(el=>{
                    el.checked = this.checkbox.checked;
                })
            })
        }
    }

}

if(!customElements.get('xy-table')){
    customElements.define('xy-table', XyTable);
}

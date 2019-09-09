import './xy-loading.js';

class XyTr extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:contents;
        }
        :host(:hover) ::slotted(*)::before{
            opacity:.1;
        }

        </style>
        <slot></slot>
        `
    }

    connectedCallback() {
        const table = this.closest('xy-table');
        if(table && !getComputedStyle(table).getPropertyValue('--columns')){
            table.style.setProperty('--columns',this.querySelectorAll('xy-td,xy-th').length);
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
            /*
            display: flex;
            align-items: center;
            */
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

class XyTh extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            position:relative;
            padding: .625em;
            text-align:center;
            color: var(--themeColor,#42b983);
        }
        :host::before{
            content:'';
            position:absolute;
            background:var(--themeColor,#42b983);
            opacity:.2;
            left:0;
            right:0;
            top:0;
            bottom:0;
            pointer-events:none;
        }

        </style>
        <slot></slot>
        `
    }
}

if(!customElements.get('xy-th')){
    customElements.define('xy-th', XyTh);
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
            grid-template-columns:repeat(var(--columns),1fr);
            position:relative;
        }
        /*
        ::slotted(xy-tr:not(:last-child):not(:first-child))::after{
            content:'';
            grid-column:span var(--columns);
            border-bottom:1px solid var(--borderColor,#d9d9d9);
        }
        */
        ::slotted(xy-tr:nth-child(odd)){
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
        </style>
        <slot></slot>
        <xy-loading class="loading"></xy-loading>
        `
    }

    get loading() {
        return this.getAttribute('loading')!==null;
    }

    set loading(value) {
        if(value===null||value===false){
            this.removeAttribute('loading');
        }else{
            this.setAttribute('loading', '');
        }
    }

}

if(!customElements.get('xy-table')){
    customElements.define('xy-table', XyTable);
}

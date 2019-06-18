export default class XyLayout extends HTMLElement {

    static get observedAttributes() { return ['color'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:flex;
            flex-direction:column;
        }
        :host([row]){
            flex-direction:row;
        }
        :host([column]){
            flex-direction:column;
        }
        :host([expand]){
            flex:1;
        }
        :host([center]:not([center$=Axis])){
            justify-content: center;
            align-items: center;
        }
        :host([center="mainAxis"]){
            justify-content: center;
        }
        :host([center="crosAxis"]){
            align-items: center;
        }

        </style>
        <slot></slot>
        `
    }
}

if(!customElements.get('xy-layout')){
    customElements.define('xy-layout', XyLayout);
}

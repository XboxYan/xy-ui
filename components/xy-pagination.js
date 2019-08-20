import './xy-button.js';

export default class XyPagination extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:flex;
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
        <xy-button icon="left"></xy-button>
        <xy-button>1</xy-button>
        <xy-button>2</xy-button>
        `
    }
}

if(!customElements.get('xy-pagination')){
    customElements.define('xy-pagination', XyPagination);
}

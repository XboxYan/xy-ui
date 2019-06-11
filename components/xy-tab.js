export default class XyButton extends HTMLElement {
    //https://mladenplavsic.github.io/css-ripple-effect
    static get observedAttributes() { return ['color','size'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        
        </style>
        <div class="tab" id="tab-root">
            <div class="tab-nav">
                <div class="tab-nav-content"></div>
                <i class="tabline" id="tabline"></i>
            </div>
            <div class="tab-content">
                <slot>NEED CONTENT</slot>
            </div>
        </div>
        `
    }

    get size() {
        return this.getAttribute('size')||20;
    }

    get color() {
        return this.getAttribute('color')||'';
    }
    
    connectedCallback() {
        this.loading = this.shadowRoot.getElementById('loading');
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'color' && this.loading){
            this.loading.style.setProperty('--themeColor',newValue);
        }
        if( name == 'size' && this.loading){
            this.loading.style.width = newValue + 'px';
            this.loading.style.height = newValue + 'px';
        }
    }
}


class XyView extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:block;
        }
        </style>
        <slot id="con"></slot>
        `
    }

    get coord() {
        const coord = this.getAttribute('coord');
        return coord?coord.split(','):['x','y'];
    }

    connectedCallback() {
        this.con = this.shadowRoot.getElementById('con');
        this.addEventListener('mousemove',function(ev){
            const { left, top } = this.getBoundingClientRect();
            this.con.style.setProperty('--'+this.coord[0], parseInt(ev.clientX - left));
            this.con.style.setProperty('--'+this.coord[y], parseInt(ev.clientY - top));
        })
    }
}

if(!customElements.get('xy-view')){
    customElements.define('xy-view', XyView);
}

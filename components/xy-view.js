
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
            this.con.style.setProperty('--x', ev.clientX - left);
            this.con.style.setProperty('--y', ev.clientY - top);
        })
        
        this.addEventListener('mousedown',function(ev){
            this.style.setProperty('--_x', getComputedStyle(this.con).getPropertyValue('--x'));
            this.style.setProperty('--_y', getComputedStyle(this.con).getPropertyValue('--y'));
        })
        
    }
}

if(!customElements.get('xy-view')){
    customElements.define('xy-view', XyView);
}

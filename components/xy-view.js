
class XyView extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:block;
        }
        :host([dragging]){
            ponter-events:none;
            visibility:hidden;
        }
        :host([fake]){
            ponter-events:none;
            position:absolute;
            left:0;
            top:0;
            transform:translate3d( calc( var(--left) * 1px ) ,calc(var(--top) * 1px),0);
        }
        </style>
        <slot id="con"></slot>
        `
    }

    get coord() {
        return this.getAttribute('coord') !== null;
    }

    get draggable() {
        return this.getAttribute('draggable') !== null;
    }

    get pos() {
        const pos = this.getAttribute('pos')||'0,0';
        return pos.join(',');
    }

    get dragging() {
        return this.getAttribute('dragging') !== null;
    }

    set dragging(value) {
        if(value===null||value===false){
            this.removeAttribute('dragging');
        }else{
            this.setAttribute('dragging', '');
        }
    }

    connectedCallback() {
        this.con = this.shadowRoot.getElementById('con');
        if (this.coord) {
            this.addEventListener('mousemove', (ev) => {
                const { left, top } = this.getBoundingClientRect();
                this.con.style.setProperty('--x', ev.clientX - left);
                this.con.style.setProperty('--y', ev.clientY - top);
            })

            this.addEventListener('mousedown', (ev) => {
                this.style.setProperty('--_x', getComputedStyle(this.con).getPropertyValue('--x'));
                this.style.setProperty('--_y', getComputedStyle(this.con).getPropertyValue('--y'));
            })
        }

        if (this.draggable) {
            this.addEventListener('mousedown', (ev) => {
                const { left, top } = this.getBoundingClientRect();
                this.startX = ev.clientX - left;
                this.startY = ev.clientY - top;
                if(!this.cloneObj){
                    this.cloneObj = this.cloneNode(true);
                }
                this.cloneObj.setAttribute('fake','');
                this.cloneObj.style.setProperty('--left', ev.pageX-this.startX);
                this.cloneObj.style.setProperty('--top', ev.pageY-this.startY);
                document.body.appendChild(this.cloneObj);
                this.dragging = true;
            })
            document.addEventListener('mousemove', (ev) => {
                if(this.dragging){
                    window.getSelection().removeAllRanges();
                    this.cloneObj.style.setProperty('--left', ev.pageX-this.startX);
                    this.cloneObj.style.setProperty('--top', ev.pageY-this.startY);
                }
            })
            document.addEventListener('mouseup', (ev) => {
                if(this.dragging){
                    document.body.removeChild(this.cloneObj);
                    this.dragging = false;
                }
            })
        }

    }
}

if (!customElements.get('xy-view')) {
    customElements.define('xy-view', XyView);
}

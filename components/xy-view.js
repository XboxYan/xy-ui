
class XyView extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:block;
        }
        :host(:not([fake])[dragging]){
            pointer-events:none;
            /*visibility:hidden;*/
            opacity:.5;
        }
        :host([fake]){
            pointer-events:none;
            position:fixed;
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

    get allowdrop() {
        return this.getAttribute('allowdrop') !== null;
    }

    get allowhover() {
        return this.getAttribute('allowhover') !== null;
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
                this.cloneObj.style.setProperty('--left', left);
                this.cloneObj.style.setProperty('--top', top);
                document.body.appendChild(this.cloneObj);
                this.dragging = true;
                window.dragging = true;
                this.dispatchEvent(new CustomEvent('dargstart',{
                    detail:{
                        dragElement:this
                    }
                }));
            })
            document.addEventListener('mousemove', (ev) => {
                if(this.dragging){
                    window.getSelection().removeAllRanges();
                    this.cloneObj.style.setProperty('--left', ev.clientX-this.startX);
                    this.cloneObj.style.setProperty('--top', ev.clientY-this.startY);
                    if(ev.target.allowdrop){
                        ev.target.setAttribute('over','');
                        this.dispatchEvent(new CustomEvent('dargover',{
                            detail:{
                                dragElement:this
                            }
                        }));
                    }
                }
            })
            document.addEventListener('mouseup', (ev) => {
                if(this.dragging){
                    document.body.removeChild(this.cloneObj);
                    this.dragging = false;
                    window.dragging = false;
                    if(ev.target.allowdrop){
                        ev.target.dispatchEvent(new CustomEvent('drop',{
                            detail:{
                                dragElement:this
                            }
                        }));
                    }
                }
            })
        }

        if(this.allowdrop) {
            this.addEventListener('mouseout', (ev) => {
                ev.stopPropagation();
                if(window.dragging){
                    this.removeAttribute('over');
                }
            })
            this.addEventListener('dragover', (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                this.setAttribute('over','');
                //ev.dataTransfer.dropEffect = 'copy';
            })
            this.addEventListener('drop', (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                ev.target.removeAttribute('over');
            })
            this.addEventListener('dragleave', (ev) => {
                this.removeAttribute('over');
            })
        }

        if(this.allowhover) {
            this.addEventListener('mouseover', (ev) => {
                this.setAttribute('hover','');
            })
            this.addEventListener('mouseout', (ev) => {
                ev.stopPropagation();
                this.removeAttribute('hover');
            })
        }

    }
}

if (!customElements.get('xy-view')) {
    customElements.define('xy-view', XyView);
}

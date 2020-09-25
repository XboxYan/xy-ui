
class XyView extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:block;
        }
        :host([dragstart]){
            pointer-events:none;
            visibility:hidden;
            opacity:0;
            transition:0s!important;
        }
        :host([fake]){
            box-sizing:border-box!important;
            pointer-events:none;
            position:static!important;
            left:0!important;
            top:0!important;
            margin:0!important;
        }
        :host([resizable]){
            position:relative;
            min-width:30px;
            min-height:30px;
        }
        .resize{
            position:absolute;
            box-sizing:border-box;
            left:0;
            top:0;
            right:0;
            bottom:0;
            border:1px solid transparent;
            transition:.2s;
            outline:0;
            pointer-events: none;
        }
        .resize>i{
            position:absolute;
            box-sizing:border-box;
            width:9px;
            height:9px;
            background:#fff;
            border:1px solid var(--themeColor,#42b983);
            visibility:hidden;
            opacity:0;
            transition:.2s;
            pointer-events: all;
            margin:auto;
        }
        .resize>i::before{
            position:absolute;
            content:'';
            left:-5px;
            top:-5px;
            right:-5px;
            bottom:-5px;
        }
        :host([resizable]:focus-within) .resize,
        /*:host([resizable]:hover) .resize,*/
        .resize:active{
            border-color: var(--themeColor,#42b983);
        }
        :host([resizable]:focus-within) .resize>i,
        /*:host([resizable]:hover) .resize>i,*/
        .resize:active>i{
            visibility:visible;
            opacity:1;
        }
        :host([resizable]:hover) .resize>i{
            visibility:visible;
        }
        .tl{
            top:-5px;
            left:-5px;
            cursor:nw-resize;
        }
        .t{
            top:-5px;
            left:0;
            right:0;
            cursor:n-resize;
        }
        .tr{
            top:-5px;
            right:-5px;
            cursor:sw-resize;
        }
        .l{
            left:-5px;
            top:0;
            bottom:0;
            cursor:w-resize;
        }
        .r{
            right:-5px;
            top:0;
            bottom:0;
            cursor:e-resize;
        }
        .bl{
            left:-5px;
            bottom:-5px;
            cursor:sw-resize;
        }
        .b{
            bottom:-5px;
            left:0;
            right:0;
            cursor:s-resize;
        }
        .br{
            bottom:-5px;
            right:-5px;
            cursor:se-resize;
        }
        </style>
        ${
            this.resizable?
            '<div class="resize" tabindex="-1"><i class="tl"></i><i class="t"></i><i class="tr"></i><i class="l"></i><i class="r"></i><i class="bl"></i><i class="b"></i><i class="br"></i></div>'
            :
            ''
        }
        <slot id="con"></slot>
        `
    }

    get coord() {
        return this.getAttribute('coord') !== null;
    }

    get draggable() {
        return this.getAttribute('draggable') !== null;
    }

    get dragstart() {
        return this.getAttribute('dragstart') !== null;
    }

    get resizable() {
        return this.getAttribute('resizable') !== null;
    }

    get dragaxis() {
        return this.getAttribute('dragaxis');
    }

    get resizing() {
        return this.getAttribute('resizing') !== null;
    }

    get allowdrop() {
        return this.getAttribute('allowdrop') !== null;
    }

    get allowhover() {
        return this.getAttribute('allowhover') !== null;
    }

    set dragstart(value) {
        if(value===null||value===false){
            this.removeAttribute('dragstart');
        }else{
            this.setAttribute('dragstart', '');
        }
    }

    set resizing(value) {
        if(value===null||value===false){
            this.removeAttribute('resizing');
        }else{
            this.setAttribute('resizing', '');
        }
    }

    connectedCallback() {
        const con = this.shadowRoot.getElementById('con');
        if (this.coord) {
            this.addEventListener('mousemove', (ev) => {
                const { left, top, width, height } = this.getBoundingClientRect();
                con.style.setProperty('--x', (ev.clientX - left) / width );
                con.style.setProperty('--y', (ev.clientY - top) / height );
            })
            /*
            this.addEventListener('mousedown', (ev) => {
                this.style.setProperty('--_x', getComputedStyle(con).getPropertyValue('--x'));
                this.style.setProperty('--_y', getComputedStyle(con).getPropertyValue('--y'));
            })
            */
        }

        if (this.draggable) {
            this.setAttribute('draggable', true);
            const img = new Image();
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
            let startX = 0;
            let startY = 0;
            let offsetX = 0;
            let offsetY = 0;
            let dragstart = false;
            let _dragaxis = this.dragaxis;
            this.addEventListener('dragstart', (ev) => {
                if(this.resizing){
                    ev.preventDefault();
                    return false;
                }
                this.dragData = {};
                ev.dataTransfer.setDragImage(img,0,0);
                ev.dataTransfer.effectAllowed = 'all'; 
                const { left, top } = this.getBoundingClientRect();
                startX = ev.clientX;
                startY = ev.clientY;
                offsetX = startX - left;
                offsetY = startY - top;
                ev.dataTransfer.setData('dragData', JSON.stringify({
                    id:this.id,
                    offsetX:startX,
                    offsetY:startY,
                }));
                this.cloneObj = document.createElement('DIV');
                const fakeObj = this.cloneNode(true);
                fakeObj.setAttribute('fake','');
                fakeObj.setAttribute('dragging','');
                fakeObj.style.width = this.offsetWidth + 'px';
                fakeObj.style.height = this.offsetHeight + 'px';
                fakeObj.style.transform = 'translate3d(0,0,0)';
                this.cloneObj.appendChild(fakeObj);
                this.cloneObj.style = `position:fixed;left:0;top:0;z-index:999;pointer-events:none;transform:translate3d( ${left}px ,${top}px,0)`;
                document.body.appendChild(this.cloneObj);
            })
            document.addEventListener('dragover', (ev) => {
                if(this.cloneObj){
                    //ev.preventDefault();
                    this.dragstart = true;
                    let left = ~~(ev.clientX - offsetX);
                    let top = ~~(ev.clientY - offsetY);
                    if(ev.shiftKey || this.dragaxis ){
                        if(_dragaxis==='X'){
                            top = ~~(startY - offsetY);
                        }else if(_dragaxis==='Y'){
                            left = ~~(startX - offsetX);
                        }else{
                            _dragaxis = ~~Math.abs(ev.clientX-startX)>~~Math.abs(ev.clientY-startY) && 'X' || ~~Math.abs(ev.clientX-startX)<~~Math.abs(ev.clientY-startY) && 'Y' || '';
                        }
                    }else{
                        _dragaxis = '';
                    }
                    startX = left + offsetX;
                    startY = top + offsetY;
                    this.dragData.left = left;
                    this.dragData.top = top;
                    this.cloneObj.style.transform = `translate3d( ${left}px ,${parseInt(top)}px,0)`;
                }
            })

            this.addEventListener('dragend', (ev) => {
                if(this.cloneObj){
                    const { left, top } = this.getBoundingClientRect();
                    const reset = this.cloneObj.animate(
                        [
                            { transform: this.cloneObj.style.transform},
                            { transform: `translate3d( ${left}px ,${top}px,0)` }
                        ],
                        {
                            duration: 200,
                            easing:"ease-in-out",
                        }
                    )
                    reset.onfinish = () => {
                        document.body.removeChild(this.cloneObj);
                        this.cloneObj = null;
                        this.dragData = null;
                        this.dragstart = false;
                    }
                }
            })
        }

        if(this.allowdrop) {
            let elementNode = null;
            this.addEventListener('dragover', (ev) => {
                ev.preventDefault();
            })
            this.addEventListener('drop', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                this.removeAttribute('over');
            })
            this.addEventListener('dragleave', (ev) => {
                ev.stopPropagation();
                if(elementNode===ev.target){
                    this.removeAttribute('over');
                }
            })
            this.addEventListener('dragenter', (ev) => {
                ev.stopPropagation();
                elementNode = ev.target;
                this.setAttribute('over','');
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

        if(this.resizable) {
            const resizeCon = this.shadowRoot.querySelector('.resize');
            let startX = 0;
            let startY = 0;
            let mode = '';
            let width = 0;
            let height = 0;
            let offsetX = 0;
            let offsetY = 0;
            let transforms = [0,0];
            this.addEventListener('click',()=>{
                resizeCon.focus();
            })
            resizeCon.addEventListener('mousedown',(ev)=>{
                ev.stopPropagation();
                const path = ev.path || (ev.composedPath && ev.composedPath());
                const transform = getComputedStyle(this).transform;
                transforms = transform === 'none'?[0,0]:transform.match(/[\d]+/g).slice(4);
                if(path[0].tagName === 'I'){
                    this.resizing = true;
                    startX = ev.pageX;
                    startY = ev.pageY;
                    mode = path[0].className;
                    const rect = this.getBoundingClientRect();
                    width = rect.width;
                    height = rect.height;
                    this.dispatchEvent(new CustomEvent('resizestart',{
                        detail:{
                            offsetX:0,
                            offsetY:0,
                            width:width,
                            height:height,
                        }
                    }));
                }
            })
            document.addEventListener('mousemove',(ev)=>{
                if(this.resizing){
                    ev.stopPropagation();
                    window.getSelection().removeAllRanges();
                    offsetX = ev.pageX - startX;
                    offsetY = ev.pageY - startY;
                    switch (mode) {
                        case 'tl':
                            this.style.width = width - offsetX + 'px';
                            this.style.height = height - offsetY + 'px';
                            break;
                        case 't':
                            this.style.height = height - offsetY + 'px';
                            break;
                        case 'tr':
                            this.style.width = width + offsetX + 'px';
                            this.style.height = height - offsetY + 'px';
                            break;
                        case 'l':
                            this.style.width = width - offsetX + 'px';
                            break;
                        case 'r':
                            this.style.width = width + offsetX + 'px';
                            break;
                        case 'bl':
                            this.style.width = width - offsetX + 'px';
                            this.style.height = height + offsetY + 'px';
                            break;
                        case 'b':
                            this.style.height = height + offsetY + 'px';
                            break;
                        case 'br':
                            this.style.width = width + offsetX + 'px';
                            this.style.height = height + offsetY + 'px';
                            break;
                        default:
                            break;
                    }
                    offsetX = mode.includes('l')?offsetX:0;
                    offsetY = mode.includes('t')?offsetY:0;
                    this.style.transform = `translate3d(${Number(transforms[0])+offsetX}px,${Number(transforms[1])+offsetY}px,0)`
                    this.dispatchEvent(new CustomEvent('resize',{
                        detail:{
                            offsetX:offsetX,
                            offsetY:offsetY,
                            width:this.offsetWidth,
                            height:this.offsetHeight,
                        }
                    }));
                }
            })
            document.addEventListener('mouseup',(ev)=>{
                if (this.resizing) {
                    this.resizing = false;
                    this.dispatchEvent(new CustomEvent('resizend',{
                        detail:{
                            offsetX:offsetX,
                            offsetY:offsetY,
                            width:this.offsetWidth,
                            height:this.offsetHeight,
                        }
                    }));
                }
            })
        }
    }
}

if (!customElements.get('xy-view')) {
    customElements.define('xy-view', XyView);
}

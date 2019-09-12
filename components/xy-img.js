import './xy-icon.js';

class XyGallery extends HTMLElement {
    static get observedAttributes() { return ['open'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.setAttribute('tabindex', 0);
        shadowRoot.innerHTML = `
        <style>
        :host{
            position:fixed;
            display:flex;
            left:0;
            top:0;
            right:0;
            bottom:0;
            z-index:-1;
            background:rgba(0,0,0,.5);
            visibility:hidden;
            opacity:0;
            transition: .31s;
            justify-content: center;
            align-items: center;
        }
        :host([open]){
            opacity:1;
            z-index:10;
            visibility:visible;
        }
        ::slotted(img){
            position:absolute;
            max-width: 80%;
            max-height: 80%;
            width:auto!important;
            height:auto!important;
            outline: 10px solid #fff;
            transform:scale(.5);
            opacity:0;
            visibility:hidden;
            box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
            transition:.3s cubic-bezier(.645, .045, .355, 1);
        }
        :host([open]) ::slotted(img){
            
            visibility:visible;
        }
        :host([open]) ::slotted(img.current){
            z-index:2;
            opacity:1;
            transform:scale(1);
        }
        .action{
            position: absolute;
            bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            border-radius:20px;
            background:rgba(255,255,255,.8);
            color:var(--fontColor,#333);
            outline:0;
            z-index:10;
        }
        .dots{
            display: flex;
        }
        .action xy-icon{
            font-size: 20px;
            cursor:pointer;
        }
        .dots i{
            width:14px;
            height:14px;
            border-radius:50%;
            margin:0 5px;
            cursor:pointer;
            padding:2px;
            background-color: currentColor;
            background-clip: content-box;
            transition: .3s;
            opacity: .5;
        }
        .dots i:hover,.action xy-icon:hover{
            color:var(--themeColor,#42b983);
        }
        .dots i.current{
            opacity: 1;
        }
        :host(:focus) i.current{
            color:var(--themeColor,#42b983);
        }
        .action.only{
            visibility:hidden;
        }
        .btn-close{
            position:absolute;
            right:0;
            top:0;
            color:#fff;
            width:40px;
            height:40px;
            font-size:30px;
            background:none;
            border:0;
            display:flex;
            justify-content: center;
            align-items: center;
            cursor:pointer;
            outline:0;
        }
        .btn-close::after{
            content:'';
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            border-radius:0 0 0 100%;
            background:#fff;
            transform: scale(0);
            transition: .3s;
            z-index:-1;
            transform-origin: right top;
        }
        .btn-close xy-icon{
            transform: scaleY(.9);
        }
        .btn-close:hover::after,.btn-close:focus::after{
            transform: scale(1.3);
        }
        .btn-close:hover xy-icon,.btn-close:focus xy-icon{
            color:var(--errorColor,#f4615c);
        }
        </style>
        <button id="close" class="btn-close"><xy-icon name="close"></xy-icon></button>
        <slot id="slot"></slot>
        <a class="action" id="dots"><xy-icon name="caret-left" class="left"></xy-icon><div class="dots"></div><xy-icon name="caret-right" class="right"></xy-icon></a>
        `
    }

    get open() {
        return this.getAttribute('open') !== null;
    }

    set open(value) {
        if (value === null || value === false) {
            this.removeAttribute('open');
        } else {
            this.setAttribute('open', '');
        }
    }

    show(index) {
        this.open = true;
        this.change(index);
    }

    change(index) {
        this.index = this.indexlist.indexOf(Number(index));
        const preimg = this.querySelector(`img.current`);
        const predots = this.dots.querySelector(`i.current`);
        if (preimg && predots) {
            preimg.classList.remove('current');
            predots.classList.remove('current');
        }
        this.querySelector(`img[data-index="${index}"]`).classList.add('current');
        const curdot = this.dots.querySelector(`i[data-index="${index}"]`);
        if(curdot){
            curdot.classList.add('current');
        }
    }

    add(img, index) {
        this.indexlist.push(index);
        this.appendChild(img);
    }

    go(step) {
        this.index += step;
        const len = this.indexlist.length;
        if (this.index > len - 1) {
            this.index = 0;
        }
        if (this.index < 0) {
            this.index = len - 1;
        }
        this.change(this.indexlist[this.index]);
    }

    remove(index) {
        this.indexlist = this.indexlist.filter(el => el != index);
        const child = this.querySelector(`img[data-index="${index}"]`);
        child && this.removeChild(child);
    }

    connectedCallback() {
        this.indexlist = [];
        this.slots = this.shadowRoot.getElementById('slot');
        this.dots = this.shadowRoot.getElementById('dots');
        this.close = this.shadowRoot.getElementById('close');
        this.addEventListener('transitionend', (ev) => {
            if (ev.propertyName === 'transform' && this.open) {
                this.focus();
            }
        })
        this.slots.addEventListener('slotchange', () => {
            if (this.indexlist.length > 1) {
                this.dots.classList.remove('only');
                this.indexlist = this.indexlist.sort((a, b) => a - b);
                let html = ''
                this.indexlist.forEach(el => {
                    html += '<i data-index=' + el + ' class=' + (el == this.indexlist[this.index] ? 'current' : '') + '></i>'
                })
                this.dots.querySelector('.dots').innerHTML = html;
            } else {
                this.dots.classList.add('only');
            }
        });
        this.dots.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'I') {
                this.change(ev.target.dataset.index);
            }
            if (ev.target.className === 'left') {
                this.go(-1);
            }
            if (ev.target.className === 'right') {
                this.go(1);
            }
        })
        this.addEventListener('keydown', (ev) => {
            switch (ev.keyCode) {
                case 37://Left
                    this.go(-1);
                    break;
                case 39://Right
                    this.go(1);
                    break;
                case 8://Backspace
                case 27://Esc
                    ev.preventDefault();
                    this.open = false;
                    break;
                default:
                    break;
            }
        })
        this.close.addEventListener('click', (ev) => {
            this.open = false;
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'open' && this.shadowRoot) {
            if (newValue == null) {
                document.querySelector(`xy-img[index="${this.indexlist[this.index]}"]`).focus();
            }
        }
    }

}


if (!customElements.get('xy-gallery')) {
    customElements.define('xy-gallery', XyGallery);
}

export default class XyImg extends HTMLElement {

    static get observedAttributes() { return ['lazy', 'src', 'defaultsrc', 'ratio'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host {
            display:inline-block;
            position: relative;
            vertical-align: top;
            overflow: hidden;
            background:#eee;
            font-size:14px;
            color:#666;
        }
        :host([alt]:not([default]))::before{
            content:attr(alt);
            position:absolute;
            color:#fff;
            left:0;
            right:0;
            bottom:0;
            z-index:1;
            line-height:1.5;
            font-size:14px;
            padding:5px 10px;
            background:linear-gradient(to bottom,transparent,rgba(0,0,0,.5));
            transform:translateY(100%);
            transition:.3s;
        }
        :host([alt]:hover)::before{
            transform:translateY(0);
        }
        :host([ratio*="/"]){
            width:100%;
            height:auto!important;
        }
        :host([ratio*="/"]) img{
            position:absolute;
            left: 0;
            top: 0;
            width:100%;
            height: 100%;
        }
        :host([ratio*="/"]) .placeholder{
            position: relative;
            padding-top:100%;
        }
        img {
            box-sizing: border-box;
            color:transparent;
            display: inline-block;
            width: inherit;
            height: inherit;
            vertical-align: top;
            border:0;
            opacity:0;
            background:inherit;
            transform:scale(0);
            object-fit: cover;
            transition:.3s;
        }
        img::before {
            content:'';
            left:0;
            top:0;
            position:absolute;
            width:100%;
            height:100%;
            background:inherit;
            z-index:1;
        }
        :host img[src]{
            opacity:1;
            transform:scale(1);
        }
        :host([gallery]:not([default]):not([error])){
            cursor:pointer;
        }
        :host(:not([error]):not([default]):hover) img[src],:host(:focus-within) img[src]{
            transform:scale(1.1);
        }
        :host([fit="cover"]) img{
            object-fit:cover;
        }
        :host([fit="fill"]) img{
            object-fit:fill;
        }
        :host([fit="contain"]) img{
            object-fit:contain;
        }
        .placeholder{
            position:absolute;
            width:100%;
            height:100%;
            box-sizing:border-box;
            z-index:-1;
            transition:.3s;
            background:inherit;
            visibility:hidden;
        }
        :host([error]) .placeholder{
            visibility:visible;
            z-index:2;
        }
        :host([error]) img{
            padding:0 20px;
            min-width:100px;
            min-height:100px;
            transform: none;
        }
        .loading{
            position:absolute;
            left:50%;
            top:50%;
            z-index:3;
            transform:translate(-50%,-50%);
            pointer-events:none;
            opacity:1;
            transition:.3s;
        }
        img[src]+.loading,:host([error]) .loading{
            opacity:0;
            visibility:hidden;
        }
        .placeholder xy-icon {
            font-size:1.15em;
            margin-right:.4em;
        }
        .placeholder-icon{
            position:absolute;
            display:flex;
            justify-content:center;
            align-items:center;
            left:0;
            right:0;
            top:50%;
            transform:translateY(-50%);
        }
        .view{
            position:absolute;
            z-index:3;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%) scale(2);
            opacity:0;
            color:#fff;
            display:none;
            font-size:40px;
            transition:.3s;
            pointer-events:none;
        }
        :host([gallery]:not([error]):not([default])) .view{
            display:inline-block;
        }
        :host([gallery]:not([error]):not([default]):hover) .view,:host(:focus-within) .view{
            opacity:1;
            transform:translate(-50%,-50%) scale(1);
        }
        .animation .shape {
            border-radius: 50%;
            background:var(--themeBackground,var(--themeColor,#42b983));
        }
        .animation{
            width:2em;
            height:2em;
            display:grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap:.7em;
            transform: rotate(45deg);
            animation: rotation 1s infinite;
        }
        .shape1 {
            animation: animation4shape1 0.3s ease 0s infinite alternate;
        }
        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        @keyframes animation4shape1 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(5px, 5px);
            }
        }
        .shape2 {
            opacity:.8;
            animation: animation4shape2 0.3s ease 0.3s infinite alternate;
        }
        @keyframes animation4shape2 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(-5px, 5px);
            }
        }
        .shape3 {
            opacity:.6;
            animation: animation4shape3 0.3s ease 0.3s infinite alternate;
        }
          
        @keyframes animation4shape3 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(5px, -5px);
            }
        }
        .shape4 {
            opacity:.4;
            animation: animation4shape4 0.3s ease 0s infinite alternate;
        }
        @keyframes animation4shape4 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(-5px, -5px);
            }
        }
        </style>
        <div class="placeholder" id="placeholder" style="${this.ratio ? 'padding-top:' + this.ratio : ''}"><div class="placeholder-icon"><xy-icon path="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z"></xy-icon>${this.alt}</div></div>
        <xy-icon class="view" name='View'></xy-icon>
        <img>
        <div class="loading">
            <div class="animation">
                <div class="shape shape1"></div>
                <div class="shape shape2"></div>
                <div class="shape shape3"></div>
                <div class="shape shape4"></div>
            </div>
        </div>
        `
    }

    get src() {
        return this.getAttribute('src');
    }

    get defaultsrc() {
        return this.getAttribute('defaultsrc');
    }

    get ratio() {
        //16/9
        const ratio = this.getAttribute('ratio');
        if (ratio && ratio.includes('/')) {
            const r = ratio.split('/');
            return (r[1] / r[0] * 100) + '%';
        }
        return 0;
    }

    get lazy() {
        return this.getAttribute('lazy') !== null;
    }

    get fit() {
        return this.getAttribute('fit');
    }

    get gallery() {
        return this.getAttribute('gallery');
    }

    get error() {
        return this.getAttribute('error') !== null;
    }

    get default() {
        return this.getAttribute('default') !== null;
    }

    get alt() {
        return this.getAttribute('alt') || 'error';
    }

    set src(value) {
        this.setAttribute('src', value);
    }

    set fit(value) {
        this.setAttribute('fit', value);
    }
    set ratio(value) {
        this.setAttribute('ratio', value);
    }

    set error(value) {
        if (value) {
            this.setAttribute('error', '');
        } else {
            this.removeAttribute('error');
        }
    }

    set default(value) {
        if (value) {
            this.setAttribute('default', '');
        } else {
            this.removeAttribute('default');
        }
    }

    focus() {
        this.img.focus();
    }

    load(src, hasload) {
        const img = new Image();
        img.src = src;
        this.error = false;
        img.onload = () => {
            this.img.alt = this.alt;
            this.img.src = src;
            if(!this.default){
                this.initgallery();
            }
        }
        img.onerror = () => {
            this.error = true;
            this.img.removeAttribute('tabindex');
            if (this.defaultsrc && !hasload) {
                this.default = true;
                this.load(this.defaultsrc, true);
            }
            //window['XyGallery' + this.gallery] && window['XyGallery' + this.gallery].remove(this.XyImgIndex);
        }
    }

    initgallery() {
        if (this.gallery !== null) {
            if (!window['XyGallery' + this.gallery]) {
                window['XyGallery' + this.gallery] = new XyGallery();
                document.body.appendChild(window['XyGallery' + this.gallery]);
            }
            this.img.setAttribute('tabindex', 0);
            this.setAttribute('index', this.XyImgIndex);
            this.img.addEventListener('click', () => {
                if (!this.default) {
                    window['XyGallery' + this.gallery].show(this.XyImgIndex);
                }
            })
            this.img.addEventListener('keydown', (ev) => {
                switch (ev.keyCode) {
                    case 13://Enter
                        if (!this.default) {
                            window['XyGallery' + this.gallery].show(this.XyImgIndex);
                        }
                        break;
                    default:
                        break;
                }
            })
            const img = this.img.cloneNode(true);
            img.removeAttribute('tabindex');
            img.style.order = this.XyImgIndex;
            img.dataset.index = this.XyImgIndex;
            window['XyGallery' + this.gallery].add(img, this.XyImgIndex);
        }
    }

    connectedCallback() {
        if (window.XyImgIndex > -1) {
            window.XyImgIndex++;
        } else {
            window.XyImgIndex = 0;
        }
        this.XyImgIndex = window.XyImgIndex;
        this.placeholder = this.shadowRoot.getElementById('placeholder');
        this.img = this.shadowRoot.querySelector('img');
        if (this.lazy) {
            this.observer = new IntersectionObserver(ioes => {
                ioes.forEach(ioe => {
                    const el = ioe.target;
                    const intersectionRatio = ioe.intersectionRatio;
                    if (intersectionRatio > 0 && intersectionRatio <= 1) {
                        this.load(this.src);
                        this.observer.unobserve(el);
                    }
                })
            })
            this.observer.observe(this.img);
        } else {
            this.load(this.src);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'src' && this.img) {
            this.placeholder.classList.remove('show');
            this.load(newValue);
        }
        if (name == 'ratio' && this.img) {
            this.placeholder.style.paddingTop = this.ratio;
        }
    }

    disconnectedCallback() {
        window['XyGallery' + this.gallery] && window['XyGallery' + this.gallery].remove(this.XyImgIndex);
    }
}

if (!customElements.get('xy-img')) {
    customElements.define('xy-img', XyImg);
}
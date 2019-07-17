import './xy-icon.js';

class XyGallery extends HTMLElement {
    static get observedAttributes() { return ['open','list'] }

    constructor() {
        super();
        this.list = [];
        const shadowRoot = this.attachShadow({ mode: 'open' });
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
            background:rgba(0,0,0,.3);
            visibility:hidden;
            opacity:0;
            transition:.3s;
        }
        :host([open]){
            opacity:1;
            z-index:10;
            visibility:visible;
        }
        .dialog {
            display:flex;
            position:relative;
            min-width: 400px;
            margin:auto;
            box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
            box-sizing: border-box;
            max-width: calc(100vw - 20px);
            max-height: calc(100vh - 20px);
            border-radius: 3px;
            background-color: #fff;
            transform:scale(0);
            transition:.3s transform cubic-bezier(.645, .045, .355, 1);
        }
        :host([open]) .dialog{
            transform:scale(1);
        }
        ::slotted(img){
            position:absolute;
        }
        .btn-close{
            position:absolute;
            right:10px;
            top:10px;
        }
        </style>
        <xy-icon id="dialog-type" class="dialog-type"></xy-icon>
        <div class="dialog">
            <slot></slot>
        </div>
        `
    }

    get open() {
        return this.getAttribute('open')!==null;
    }

    set open(value) {
        if(value===null||value===false){
            this.removeAttribute('open');
        }else{
            this.setAttribute('open', '');
        }
    }

    show(index){
        this.open = true;
    }

    remove(index){
        const child = this.querySelector(`img[data-index="${index}"]`);
        child && this.removeChild(child);
    }

    connectedCallback() {
        
    }

    attributeChangedCallback() {

    }
    
}


if(!customElements.get('xy-gallery')){
    customElements.define('xy-gallery', XyGallery);
}

export default class XyImg extends HTMLElement {

    static get observedAttributes() { return ['lazy','src','defaultsrc'] }

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
        img {
            box-sizing: border-box;
            color:transparent;
            display: inline-block;
            width:100%;
            height:100%;
            vertical-align: top;
            border:0;
            opacity:0;
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
            background:#eee;
            z-index:1;
        }
        :host img[src]{
            opacity:1;
            transform:scale(1);
        }
        :host([gallery]:not([default]):not([error])){
            cursor:pointer;
        }
        :host(:not([error]):not([default]):hover) img[src]{
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
            display:flex;
            width:100%;
            height:100%;
            justify-content:center;
            align-items:center;
            font-size:14px;
            z-index:-1;
            color:#666;
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
        .placeholder xy-icon {
            font-size:16px;
            margin-right:5px;
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
        :host([gallery]:not([error]):not([default]):hover) .view{
            opacity:1;
            transform:translate(-50%,-50%) scale(1);
        }
        </style>
        <div class='placeholder' id='placeholder'><xy-icon name="image"></xy-icon>${this.alt}</div>
        <xy-icon class="view" name='View'></xy-icon>
        `
    }

    get src() {
        return this.getAttribute('src');
    }

    get defaultsrc() {
        return this.getAttribute('defaultsrc');
    }

    get lazy() {
        return this.getAttribute('lazy')!==null;
    }

    get fit() {
        return this.getAttribute('fit');
    }

    get gallery() {
        return this.getAttribute('gallery');
    }

    get error() {
        return this.getAttribute('error')!==null;
    }

    get default() {
        return this.getAttribute('default')!==null;
    }

    get alt() {
        return this.getAttribute('alt')||'unkown';
    }

    set src(value) {
        this.setAttribute('src', value);
    }

    set fit(value) {
        this.setAttribute('fit', value);
    }

    set error(value) {
        if(value){
            this.setAttribute('error', '');
        }else{
            this.removeAttribute('error');
        }
    }

    set default(value) {
        if(value){
            this.setAttribute('default', '');
        }else{
            this.removeAttribute('default');
        }
    }

    load(src,hasload) {
        const img = new Image();
        img.src = src;
        this.img.src = src;
        this.error = false;
        img.onerror = () => {
            this.error = true;
            if(this.defaultsrc && !hasload){
                this.default = true;
                this.load(this.defaultsrc,true);
            }
            window['XyGallery'+this.gallery] && window['XyGallery'+this.gallery].remove(this.XyImgIndex);
        }
    }

    initgallery(){
        console.log()
        if(this.gallery!==null){
            if(!window['XyGallery'+this.gallery]){
                window['XyGallery'+this.gallery] = new XyGallery();
                document.body.appendChild(window['XyGallery'+this.gallery]);
            }
            const img = this.img.cloneNode(true);
            img.dataset.index = this.XyImgIndex;
            window['XyGallery'+this.gallery].appendChild(img);
        }
    }
    
    connectedCallback() {
        if(window.XyImgIndex>-1){
            window.XyImgIndex++;
        }else{
            window.XyImgIndex=0;
        }
        this.XyImgIndex = window.XyImgIndex;
        this.placeholder = this.shadowRoot.getElementById('placeholder');
        this.img = new Image();
        this.img.alt = this.alt;
        if(this.lazy){
            this.observer = new IntersectionObserver(ioes => {
                ioes.forEach(ioe => {
                    const el = ioe.target;
                    const intersectionRatio = ioe.intersectionRatio;
                    if (intersectionRatio > 0 && intersectionRatio <= 1) {
                        this.load(this.src);
                        this.initgallery();
                        this.observer.unobserve(el);
                    }
                })
            })
            this.observer.observe(this.img);
        }else{
            this.load(this.src);
            this.initgallery();
        }
        this.shadowRoot.appendChild(this.img);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'src' && this.img){
            this.placeholder.classList.remove('show');
            this.load(newValue);
        }
    }

    disconnectedCallback(){
        window['XyGallery'+this.gallery].remove(this.XyImgIndex);
    }
}

if(!customElements.get('xy-img')){
    customElements.define('xy-img', XyImg);
}
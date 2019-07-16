class Gallery {
    constructor(src){
        this.list = [src];
    }
    init(){

    }
    add(src){
        this.list.push(src);
    }
    show(){

    }
    hide(){

    }
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
        img{
            box-sizing: border-box;
            color:transparent;
            display: inline-block;
            width:100%;
            height:100%;
            vertical-align: top;
            border:0;
            opacity:0;
            transform:scale(0);
        }
        img[src]{
            animation: fade-in .3s ease-in-out forwards;
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
            background:#eee;
            font-size:14px;
            z-index:-1;
            color:#666;
            visibility:hidden;
        }
        :host([error]) .placeholder{
            visibility:visible;
            z-index:1;
        }
        :host([error]) img{
            padding:0 20px;
            min-width:100px;
            min-height:100px;
        }
        xy-icon {
            font-size:16px;
            margin-right:5px;
        }
        @keyframes fade-in {
            to {
                opacity:1;
                transform:scale(1);
            }
        }
        </style>
        <div class='placeholder' id='placeholder'><xy-icon name="image"></xy-icon>${this.alt}</div>
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

    load(src,hasload) {
        const img = new Image();
        img.src = src;
        this.img.src = src;
        this.error = false;
        img.onerror = () => {
            if(this.defaultsrc && !hasload){
                this.load(this.defaultsrc,true);
            }else{
                this.error = true;
            }
        }
    }
    
    connectedCallback() {
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
                        this.observer.unobserve(el);
                    }
                })
            })
            this.observer.observe(this.img);
        }else{
            this.load(this.src);
        }
        this.shadowRoot.appendChild(this.img);
        if(window['XyGallery'+this.gallery]){
            window['XyGallery'+this.gallery].add(this.src);
        }else{
            window['XyGallery'+this.gallery] = new Gallery(this.src);
        }
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'src' && this.img){
            this.placeholder.classList.remove('show');
            this.load(newValue);
        }
    }
}

if(!customElements.get('xy-img')){
    customElements.define('xy-img', XyImg);
}

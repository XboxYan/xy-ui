import './xy-button.js';

class XyTabContent extends HTMLElement {
    static get observedAttributes() { return ["label","key","disabled","icon"]; }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <slot></slot>
        `
    }


    get label() {
        return this.getAttribute('label')||'';
    }

    get icon() {
        return this.getAttribute('icon');
    }

    get key() {
        return this.getAttribute('key');
    }

    get disabled() {
        return this.getAttribute('disabled');
    }

    set disabled(value) {
        if(value===null||value===false){
            this.removeAttribute('disabled');
        }else{
            this.setAttribute('disabled', value);
        }
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    set key(value) {
        this.setAttribute('key', value);
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( oldValue!==newValue && newValue!==undefined ){
            if( name === 'label'){
                this.parentNode.updatalabel && this.parentNode.updatalabel(this.key,newValue);
            }
            if( name === 'disabled'){
                this.parentNode.updatadisabled && this.parentNode.updatadisabled(this.key,newValue);
            }
        }
    }

}

if(!customElements.get('xy-tab-content')){
    customElements.define('xy-tab-content', XyTabContent);
}

export default class XyTab extends HTMLElement {

    static get observedAttributes() { return ['activekey'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            display:block;
            text-align: unset;
        }
        .tab{
            display:flex;
            flex-direction:column;
            height: 100%;
            overflow: hidden;
        }
        .tab-nav-con{
            position:relative;
            overflow:hidden;
            scroll-behavior: smooth;
        }
        .tab-nav{
            display:flex;
        }
        .nav-item{
            font-size:inherit;
            border-radius:0;
            box-shadow:none;
            flex-shrink: 0;
            border-color:transparent;
        }
        :host(:not([type="line"])) .nav-item.active{
            color:var(--themeColor,#42b983);
        }
        .tab-line{
            position:absolute;
            width:0;
            margin-top:-2px;
            height:2px;
            border-radius:2px;
            background:var(--themeColor,#42b983);
            transition:.2s;
        }
        .tab-content{
            overflow:hidden;
            flex:1;
            transition:.2s;
        }
        .tab-content-wrap{
            display:flex;
            width:100%;
            height:100%;
            transition:.2s;
        }
        :host([type="card"]) .tab-line,
        :host([type="line"]) .tab-line{
            visibility:hidden;
        }
        :host([type="card"]) .nav-item{
            border-radius:.5em .5em 0 0;
        }
        :host([type="line"]) .nav-item{
            border-radius:var(--borderRadius,.25em) var(--borderRadius,.25em) 0 0;
        }
        :host([type="card"]) .nav-item.active,:host([type="card"]) .tab-content{
            background-color:#fff;
        }
        :host([type="line"]) .nav-item.active{
            border-color:var(--borderColor,rgba(0,0,0,.2)) var(--borderColor,rgba(0,0,0,.2)) transparent;
        }
        :host([type="line"]) .tab-nav-con{
            oveflow:hidden;
        }
        :host([type="line"]) .tab-line{
            transition:none;
        }
        :host([type="line"]) .tab-line::before,
        :host([type="line"]) .tab-line::after{
            content:'';
            position:absolute;
            visibility:visible;
            width:9999px;
            height:1px;
            bottom:0;
            background:var(--borderColor,rgba(0,0,0,.2));
        }
        :host([type="line"]) .tab-line::before{
            right:100%;
        }
        :host([type="line"]) .tab-line::after{
            left:100%;
        }
        :host([type="card"]) .tab-content-wrap,
        :host([type="line"]) .tab-content-wrap{
            transition:none;
        }
        :host([align="center"]) .tab-nav{
            justify-content:center;
        }
        :host([align="end"]) .tab-nav{
            justify-content:flex-end;
        }
        ::slotted(xy-tab-content){
            box-sizing:border-box;
            width:100%;
            height:100%;
            padding:10px;
            flex-shrink:0;
            overflow:auto;
        }
        </style>
        <style id="filter"></style>
        <div class="tab">
            <div class="tab-nav-con">
                <div class="tab-nav" id="nav"></div>
                <i class="tab-line" id="tab-line"></i>
            </div>
            <div class="tab-content">
                <div class="tab-content-wrap" id="tab-content"><slot id="slot">NEED CONTENT</slot></div>
            </div>
        </div>
        `
    }

    get align() {
        return this.getAttribute('align')||'start';
    }

    get type() {
        return this.getAttribute('type')||'flat';
    }

    get activekey() {
        return this.getAttribute('activekey');
    }

    set align(value) {
        this.setAttribute('align', value);
        this.inittab();
    }

    set activekey(value) {
        this.setAttribute('activekey', value);
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    inittab() {
        const items = this.nav.querySelectorAll('.nav-item');
        Array.from(items).forEach((item,index)=>{
            this.tabPos[item.dataset.key] = {
                index:index,
                width:item.offsetWidth,
                left:item.offsetLeft,
                label:item.textContent
            };
        })
        if(this.activekey){
            this.tabline.style = `width:${this.tabPos[this.activekey].width}px;transform:translateX(${this.tabPos[this.activekey].left}px)`;
        }
    }

    updatalabel(key,label) {
        const nav = this.nav.querySelector(`.nav-item[data-key='${key}']`);
        if(nav){
            nav.innerHTML = label;
            this.inittab();
        }
    }

    updatadisabled(key,disabled) {
        const nav = this.nav.querySelector(`.nav-item[data-key='${key}']`);
        if(nav){
            nav.disabled = disabled;
        }
    }
    
    connectedCallback() {
        this.tabPos = {};
        this.nav = this.shadowRoot.getElementById('nav');
        this.tab = this.shadowRoot.getElementById('tab-content');
        this.tabline = this.shadowRoot.getElementById('tab-line');
        this.slots = this.shadowRoot.getElementById('slot');
        this.filter = this.shadowRoot.getElementById('filter');
        this.slots.addEventListener('slotchange', ()=>{
            const slots = this.slots.assignedElements();
            let html = ''
            slots.forEach((item,index)=>{
                if( item.tagName === 'XY-TAB-CONTENT' ){
                    if(item.key===null){
                        item.key = index;
                    }
                    html += `<xy-button class="nav-item ${item.key===this.activekey?'active':''}" icon=${item.icon} ${item.disabled!==null?"disabled":""} data-key=${item.key}>${item.label}</xy-button>`;
                }
            })
            this.nav.innerHTML = html;
            this.inittab();
            if(this.activekey===null){
                this.activekey = slots[0].key;
            }else{
                this.activekey = this.activekey;
            }
            this.init = true;
        });
        this.nav.addEventListener('click',(ev)=>{
            const item = ev.target.closest('xy-button');
            if(item){
                this.activekey = item.dataset.key;
            }
        })
        this.nav.addEventListener('keydown',(ev)=>{
            switch (ev.keyCode) {
                case 37://ArrowLeft
                    ev.preventDefault();
                    this.movein(-1);
                    break;
                case 39://ArrowRight
                    ev.preventDefault();
                    this.movein(1);
                    break;
                default:
                    break;
            }
        })
    }

    movein (index){
        const cur = this.nav.querySelector(`.nav-item.active`);
        if(index>0 && cur.nextElementSibling){
            this.activekey = cur.nextElementSibling.dataset.key;
        }
        if(index<0 && cur.previousElementSibling){
            this.activekey = cur.previousElementSibling.dataset.key;
        }
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if( name == 'activekey' && this.tab){
            let active = this.tabPos[newValue];
            if( active === undefined ){
                this.activekey = this.slots.assignedElements()[0].key;
                active = this.tabPos[this.activekey];
            }
            this.tabline.style = `width:${active.width}px;transform:translateX(${active.left}px)`;
            this.tab.style.transform = `translateX(${-(active.index) * 100}%)`;
            this.filter.textContent = `
            ::slotted(xy-tab-content:not([key="${this.activekey}"])){
                height:0;
                overflow:visible;
            }
            `
            if( oldValue!==newValue){
                this.nav.parentNode.scrollLeft = active.left+active.width/2-this.nav.parentNode.offsetWidth/2;
                const pre = this.nav.querySelector(`.nav-item.active`);
                if(pre){
                    pre.classList.remove('active');
                }
                const cur = this.nav.querySelector(`.nav-item[data-key='${newValue}']`);
                cur.classList.add('active');
                cur.focus();
                if(this.init && oldValue!==null){
                    this.dispatchEvent(new CustomEvent('change',{
                        detail:{
                            key:this.activekey,
                            index:active.index,
                            label:active.label,
                        }
                    }));
                }
            }
        }
    }
}

if(!customElements.get('xy-tab')){
    customElements.define('xy-tab', XyTab);
}
import XyButton from './xy-button.js';
if(!customElements.get('xy-button')){
    customElements.define('xy-button', XyButton);
}

class XyTabContent extends HTMLElement {
    static get observedAttributes() { return ["label","key"]; }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host{
                box-sizing:border-box;
                width:100%;
                height:100%;
                padding:10px;
                flex-shrink:0;
                overflow:auto;
            }
        </style>
        <slot></slot>
        `
    }


    get label() {
        return this.getAttribute('label');
    }

    get key() {
        return this.getAttribute('key');
    }

    get disabled() {
        return this.getAttribute('disabled');
    }

    set key(value) {
        this.setAttribute('key', value);
    }

    /**
     * @param {boolean} value
     */
    set selected(value) {
        if(value){
            this.setAttribute('selected', value);
        }else{
            this.removeAttribute('selected');
        }
    }

}

customElements.define('xy-tab-content', XyTabContent);

export default class XyTab extends HTMLElement {

    static get observedAttributes() { return ['activekey'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{
            display:block;
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
            border-radius:0;
            box-shadow:none;
            flex-shrink: 0;
        }
        .tab-line{
            position:absolute;
            width:0;
            margin-top:-2px;
            height:2px;
            border-radius:2px;
            background:var(--themeColor,dodgerblue);
            transition:.3s;
        }
        .tab-content{
            overflow:hidden;
            flex:1;
        }
        .tab-content-wrap{
            display:flex;
            width:100%;
            height:100%;
            transition:.3s;
        }
        </style>
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

    get activekey() {
        return this.getAttribute('activekey');
    }

    set activekey(value) {
        this.setAttribute('activekey', value);
    }

    init() {
        this.items = this.nav.querySelectorAll('.nav-item');
        Array.from(this.items).forEach((item,index)=>{
            this.tabPos[item.dataset.key] = {
                index:index,
                width:item.offsetWidth,
                left:item.offsetLeft,
                label:item.textContent
            };
        })
    }
    
    connectedCallback() {
        this.tabPos = {};
        this.nav = this.shadowRoot.getElementById('nav');
        this.tab = this.shadowRoot.getElementById('tab-content');
        this.tabline = this.shadowRoot.getElementById('tab-line');
        this.slots = this.shadowRoot.getElementById('slot');
        this.slots.addEventListener('slotchange', ()=>{
            const slots = this.slots.assignedElements();
            let html = ''
            slots.forEach((item,index)=>{
                if(item.key===null){
                    item.key = index;
                }
                html += `<xy-button class="nav-item" type="flat" ${item.disabled!==null?"disabled":""} data-key=${item.key}>${item.label}</xy-button>`;
            })
            this.nav.innerHTML = html;
            this.init();
            if(this.activekey===null){
                this.activekey = slots[0].key;
            }else{
                this.activekey = this.activekey;
            }
        });
        this.nav.addEventListener('click',(ev)=>{
            const item = ev.target.closest('xy-button');
            if(item && item.disabled===null){
                this.activekey = item.dataset.key;
            }
        })
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
            if( oldValue!==newValue ){
                this.nav.parentNode.scrollLeft = active.left+active.width/2-this.nav.parentNode.offsetWidth/2;
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

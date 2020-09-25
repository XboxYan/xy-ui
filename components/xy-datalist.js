import './xy-option.js';

class XyDataList extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host {
                position:absolute;
                display:flex;
                box-shadow: 2px 2px 15px rgba(0,0,0,0.15);
                box-sizing: border-box;
                transform:scale(0);
                opacity:0.5;
                border-radius: 3px;
                z-index:10;
                transition:.3s cubic-bezier(.645, .045, .355, 1);
                transform-origin:left top;
                flex-direction:column;
                background:#fff;
                font-size: 14px;
                margin-top: 10px;
                visibility:hidden;
            }
            :host([show]:not(:empty)){
                opacity: 1;
                transform: scale(1);
                visibility: visible;
            }
        </style>
        <slot></slot>
        `
    }

    get show() {
        return this.getAttribute('show') !== null;
    }

    get selectedIndex() {
        return this.index>=0 ? this.index : -1;
    }

    get value() {
        return this.options[this.selectedIndex]?this.options[this.selectedIndex].textContent:'';
    }


    get options() {
        return [...this.querySelectorAll('xy-option:not([hidden]):not([disabled])')];
    }

    set show(value) {
        if (!!value) {
            this.setAttribute('show', '');
        } else {
            this.removeAttribute('show');
        }
    }

    set selectedIndex(value) {
        if(value<=-1){
            value = this.options.length-1;
        }
        if(value>=this.options.length){
            value = 0;
        }
        this.index = value;
        this.options.forEach((el, i) => {
            el.focusin = i === value;
        })
    }

    clear() {
        this.index = -1;
        this.options.forEach((el, i) => {
            el.focusin = false;
        })
    }

    filter(value) {
        this.querySelectorAll('xy-option').forEach(el => {
            if (el.value.includes('${value}')) {
                const flag = el.value.split('${value}').filter(Boolean)[0] || '';
                el.textContent = el.value.replace(/\${value}/g, value.split(flag[0])[0] || '');
            }
            const reg = new RegExp(`(${value})`, 'gi');
            const visible = (reg.test(el.value) || reg.test(el.textContent));
            el.hidden = !visible;
        })
        if (value !== '') {
            this.selectedIndex = 0;
        } else {
            this.clear();
        }
    }

    connectedCallback() {
        document.addEventListener('keydown', this.setlist);
        
        this.addEventListener('transitionend', (ev) => {
            if (ev.target === this && ev.propertyName === 'transform') {
                this.visible = this.show;
            }
        })
        this.addEventListener('click', (ev) => {
            const option = ev.target.closest('xy-option');
            if (!option.disabled) {
                this.selectedIndex = this.options.findIndex(el => el == option);
                this.dispatchEvent(new InputEvent('submit'));
            }

        })
    }

    setlist = (ev) => {
        if (this.visible) {
            switch (ev.key) {
                case 'ArrowUp':
                    this.selectedIndex -= 1;
                    break;
                case 'ArrowDown':
                    this.selectedIndex += 1;
                    break;
                case 'Enter':
                    this.dispatchEvent(new InputEvent('submit'));
                    break;
                default:
                    break;
            }
        }
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.setlist);
    }

}

if (!customElements.get('xy-datalist')) {
    customElements.define('xy-datalist', XyDataList);
}

import '../xy-icon/index.js';

const galleryTemplate = document.createElement('template');
galleryTemplate.innerHTML = `
  <style>
    :host {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      overflow: auto;
      transition: 0.31s;
      background-color: rgba(25, 28, 34, 0.88);
      opacity: 0;
      visibility: hidden;
    }
    :host([open]) {
      opacity: 1;
      z-index: 10;
      visibility: visible;
    }
    ::slotted(img) {
      position: absolute;
      left: 50%;
      top: 50%;
      max-width: 80%;
      max-height: 70%;
      width: auto;
      height: auto;
      outline: 10px solid #fff;
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
      visibility: hidden;
      box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
      transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    :host([open]) ::slotted(img) {
      visibility: visible;
    }
    :host([open]) ::slotted(img.current) {
      z-index: 1;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    
    .action {
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.8);
      color: #333;
      outline: 0;
      z-index: 1;
    }
    .action xy-icon {
      font-size: 20px;
    }
    .action.only {
      visibility: hidden;
    }
    
    .dots {
      display: flex;
    }
    .dots button {
      margin: 0 5px;
      padding: 2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      cursor: pointer;
      background-color: currentColor;
      background-clip: content-box;
      transition: 0.3s;
      opacity: 0.5;
      outline: 0;
      border: none;
    }
    .dots button.current {
      opacity: 1;
    }
    
    
    .btn-close {
      position: absolute;
      right: 0;
      top: 0;
      color: #fff;
      width: 40px;
      height: 40px;
      background: none;
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      cursor: pointer;
      outline: 0;
    }
    .btn-close::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 0 0 0 100%;
      background: #fff;
      transform: scale(0);
      transition: 0.3s;
      z-index: -1;
      transform-origin: right top;
    }
    .btn-close:hover::after,
    .btn-close:focus::after {
      transform: scale(1.3);
    }
    .btn-close:hover,
    .btn-close:focus {
      color: #f5222d;
    }
    
    .left,
    .right {
      width: 20px;
      height: 20px;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      outline: 0;
    }
    .right {
      transform: rotate(180deg);
    }
    
    .dots button.current,
    .dots button:hover,
    .dots button:focus,
    .left:focus,
    .right:focus,
    .left:hover,
    .right:hover {
      color: var(--themeColor, #42b983);
    }
  </style>

  <button id="close" class="btn-close" aria-label="关闭图片浏览">
    <xy-icon icon="close"></xy-icon>
  </button>
  <slot></slot>
  <div class="action" id="action">
    <button class="left" aria-label="上一张图片">
      <xy-icon icon="caret-left"></xy-icon>
    </button>
    <div class="dots"></div>
    <button class="right" aria-label="下一张图片">
      <xy-icon icon="caret-left"></xy-icon>
    </button>
  </div>
`;
class XyGallery extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.setAttribute('tabindex', 0);
    this.shadowRoot.appendChild(galleryTemplate.content.cloneNode(true));
    this._slots = this.shadowRoot.querySelector('slot');
    this._action = this.shadowRoot.querySelector('#action');
    this._close = this.shadowRoot.querySelector('#close');

    this._onKeyDown = this._onKeyDown.bind(this);
    this._slotsChange = this._slotsChange.bind(this);
    this._actionClick = this._actionClick.bind(this);
    this._closeClick = this._closeClick.bind(this);
    this._transitionEnd = this._transitionEnd.bind(this);
  }

  connectedCallback() {
    this.indexlist = [];
    this.addEventListener('keydown', this._onKeyDown);
    this._slots.addEventListener('slotchange', this._slotsChange);
    this._action.addEventListener('click', this._actionClick);
    this._close.addEventListener('click', this._closeClick);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._onKeyDown);
    this._slots.removeEventListener('slotchange', this._slotsChange);
    this._action.removeEventListener('click', this._actionClick);
    this._close.removeEventListener('click', this._closeClick);
  }

  show(index) {
    this.open = true;
    this.addEventListener('transitionend', this._transitionEnd);
    this.lastActiveElement = document.activeElement;
    document.documentElement.style.overflow = 'hidden';
    this._changeCurrentImage(index);
  }

  add(img, index) {
    this.indexlist.push(index);
    this.appendChild(img);
  }

  remove(index) {
    this.indexlist.filter(el => el !== index);
    const child = this.querySelector(`img[data-index="${index}"]`);
    child && this.removeChild(child);
  }

  _showImageByIndex(step) {
    const len = this.indexlist.length;
    this.index = (this.index + len + step) % len;
    this._changeCurrentImage(this.indexlist[this.index]);
  }

  _changeCurrentImage(index) {
    this.index = this.indexlist.indexOf(+index);
    const preImg = this.querySelector('img.current');
    const preDots = this._action.querySelector('button.current');
    const nowDots = this._action.querySelector(`button[data-index="${index}"]`);
    if (nowDots && nowDots === preDots) return;
    if (preImg && preDots) {
      preImg.classList.remove('current');
      preDots.classList.remove('current');
      preDots.removeAttribute('tabindex');
    }
    this.querySelector(`img[data-index="${index}"]`).classList.add('current');

    nowDots.setAttribute('tabindex', '-1');
    nowDots.classList.add('current');

    this._buttons =
      Array.from(this.shadowRoot.querySelectorAll('button:not([tabindex])')) ||
      [];
  }

  _transitionEnd(event) {
    if (event.propertyName === 'transform' && this.open) {
      this._close.focus();
      this.removeEventListener('transitionend', this._transitionEnd);
    }
  }

  _slotsChange() {
    this.indexlist = this.indexlist.sort((a, b) => a - b);
    let html = '';
    this.indexlist.forEach(idx => {
      html += `<button data-index="${idx}" ></button>`;
    });
    this._action.querySelector('.dots').innerHTML = html;
    if (this.indexlist.length > 1) {
      this._action.classList.remove('only');
    } else {
      this._action.classList.add('only');
    }
  }

  _actionClick(event) {
    if (event.target.className === 'left') {
      this._showImageByIndex(-1);
    }
    if (event.target.className === 'right') {
      this._showImageByIndex(1);
    }
    if (event.target.hasAttribute('data-index')) {
      this._changeCurrentImage(event.target.dataset.index);
    }
  }

  _onKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        this._showImageByIndex(-1);
        break;
      case 'ArrowRight':
        this._showImageByIndex(1);
        break;
      case 'Backspace':
      case 'Escape':
        this.open = false;
        break;
      case 'Tab':
        let nowIdx = this._buttons.findIndex(
          ele => this.shadowRoot.activeElement === ele
        );
        const len = this._buttons.length;
        if (nowIdx < 0) return;
        if (event.shiftKey) {
          nowIdx = (nowIdx + len - 1) % len;
        } else {
          nowIdx = (nowIdx + 1) % len;
        }
        this._buttons[nowIdx].focus();
        event.preventDefault();
      default:
        break;
    }
  }

  _closeClick() {
    this.open = false;
    document.documentElement.style.overflow = '';
    document.body.style.borderRight = '';
    this.lastActiveElement.focus();
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    const val = Boolean(value);
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
}

customElements.define('xy-gallery', XyGallery);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      position: relative;
      vertical-align: top;
      overflow: hidden;
      background-color: #eee;
      font-size: 14px;
      color: #666;
    }
    .alt {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      line-height: 1.5;
      font-size: 14px;
      padding: 5px 10px;
      background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
      color: #fff;
      transform: translateY(100%);
      transition: 0.3s;
      z-index: 1;
      pointer-events: none;
    }
    :host([alt]:not([error]):hover) .alt,
    :host(:focus-within)  .alt{
      transform: translateY(0);
    }
    img {
      display: inline-block;
      width: inherit;
      height: inherit;
      vertical-align: top;
      border: 0;
      opacity: 0;
      background: inherit;
      transform: scale(0);
      object-fit: cover;
      transition: all 0.3s;
      color: transparent;
    }
    img[show] {
      opacity: 1;
      transform: scale(1);
    }
    :host([gallery]:not([default]):not([error])) {
      cursor: pointer;
    }
    :host([fit='cover']) img {
      object-fit: cover;
    }
    :host([fit='fill']) img {
      object-fit: fill;
    }
    :host([fit='contain']) img {
      object-fit: contain;
    }
    
    .placeholder {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s;
      opacity: 0;
    }
    :host([error]) .placeholder {
      opacity: 1;
    }
    .placeholder-icon {
      font-size: 16px;
      margin-right: 0.4em;
    }
    
    .view {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
      color: #fff;
      display: none;
      font-size: 40px;
      transition: 0.3s;
      pointer-events: none;
    }
    :host([gallery]:not([error]):not([default])) .view {
      display: inline-block;
    }
    :host([gallery]:not([error]):not([default]):hover) .view,
    :host(:focus-within) .view {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }  
  </style>
  <div class="placeholder" id="placeholder">
    <xy-icon icon="image" class="placeholder-icon"></xy-icon>
    <span class="placeholder-name"></span>
  </div>
  <img id="image" />
  <xy-icon icon="View" class="view"></xy-icon>
  <div class="alt"></div>
`;
let imgIndex = -1;

export default class XyImage extends HTMLElement {
  static get observedAttributes() {
    return ['lazy', 'defaultsrc', 'src', 'alt', 'ratio'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.placeholder = this.shadowRoot.getElementById('placeholder');
    this.img = this.shadowRoot.getElementById('image');
    this.placeholderName = this.placeholder.querySelector('.placeholder-name');
    this.altDiv = this.shadowRoot.querySelector('.alt');
  }

  connectedCallback() {
    imgIndex++;
    this.imgIndex = imgIndex;

    if (this.lazy) {
      this.observer = new IntersectionObserver(ioes => {
        ioes.forEach(ioe => {
          const el = ioe.target;
          const isIntersecting = ioe.isIntersecting;
          if (isIntersecting) {
            this._load(this.src);
            this.observer.unobserve(el);
          }
        });
      });
      this.observer.observe(this.img);
    } else {
      this._load(this.src);
    }
  }

  disconnectedCallback() {
    window['xyGallery' + this.gallery] &&
      window['xyGallery' + this.gallery].remove(this.imgIndex);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'src':
        !this.lazy && this._load(newValue);
        break;
      case 'alt':
        this.placeholderName.innerHTML = newValue;
        this.img.setAttribute('alt', newValue);
        this.altDiv.innerHTML = newValue;
        break;
      case 'ratio':
        let ratio = this.ratio;
        if (ratio && ratio.includes('%')) {
          ratio = ratio.replace('%', '') / 100;
        }
        const width = parseInt(this.getBoundingClientRect().width) * ratio;
        this.style.height = `${width}px`;
        break;
      default:
        break;
    }
  }

  focus() {
    this.img.focus();
  }

  _load(src, hasLoad) {
    this.img.setAttribute('src', src);
    this.error = false;
    this.img.onerror = () => {
      this.error = true;
      if (this.defaultsrc && !hasLoad) {
        this.default = true;
        this._load(this.defaultsrc, true);
      }
      window['xyGallery' + this.gallery] &&
        window['xyGallery' + this.gallery].remove(this.imgIndex);
    };
    this.img.onload = () => {
      this.img.setAttribute('show', '');
      !hasLoad && this._initGallery();
    };
  }

  _initGallery() {
    if (this.gallery === null) return;
    const galleryId = 'xyGallery' + this.gallery;
    let winGallery;

    if (!window[galleryId]) {
      winGallery = new XyGallery();
      document.body.appendChild(winGallery);
      window[galleryId] = winGallery;
    } else {
      winGallery = window[galleryId];
    }
    this.img.setAttribute('tabindex', 0);
    this.setAttribute('index', this.imgIndex);
    this.img.addEventListener('click', () => {
      if (!this.default) {
        winGallery.show(this.imgIndex);
      }
    });

    this.img.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Enter':
          if (!this.default) {
            winGallery.show(this.imgIndex);
          }
          break;
        default:
          break;
      }
    });
    const img = this.img.cloneNode(true);
    img.removeAttribute('tabindex');
    img.dataset.index = this.imgIndex;
    winGallery.add(img, this.imgIndex);
  }

  set defaultsrc(value) {
    this.setAttribute('defaultsrc', value);
  }

  get defaultsrc() {
    return this.getAttribute('defaultsrc') || '';
  }

  set lazy(value) {
    const val = Boolean(value);
    if (val) {
      this.setAttribute('lazy', '');
    } else {
      this.removeAttribute('lazy');
    }
  }

  get lazy() {
    return this.hasAttribute('lazy');
  }

  set src(value) {
    this.setAttribute('src', value);
  }

  get src() {
    return this.getAttribute('src');
  }

  set alt(value) {
    this.setAttribute('alt', value);
  }

  get alt() {
    return this.getAttribute('alt') || '';
  }

  set ratio(value) {
    this.setAttribute('ratio', value);
  }

  get ratio() {
    const ratio = this.getAttribute('ratio');
    if (ratio && ratio.includes('/')) {
      const r = ratio.split('/');
      return (r[1] / r[0]) * 100 + '%';
    }
    return 0;
  }

  set fit(value) {
    this.setAttribute('fit', value);
  }

  get fit() {
    return this.getAttribute('fit') || '';
  }

  set error(value) {
    if (value) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }

  get error() {
    return this.hasAttribute('error');
  }

  set default(value) {
    if (value) {
      this.setAttribute('default', '');
    } else {
      this.removeAttribute('default');
    }
  }

  get default() {
    return this.hasAttribute('default');
  }

  set gallery(value) {
    this.setAttribute('gallery', value);
  }

  get gallery() {
    return this.hasAttribute('gallery') ? this.getAttribute('gallery') : null;
  }
}

if (!customElements.get('xy-img')) {
  customElements.define('xy-img', XyImage);
}

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      fill: currentColor;
      width: 1em;
      height: 1em;
      font-size: inherit;
    }
    :host([hidden]) {
      display: none;
    }
  </style>
`;

export default class XyIcon extends HTMLElement {
  static get observedAttributes() {
    return ['icon', 'src', 'size', 'color'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    Promise.resolve(customElements.whenDefined('xy-iconset')).then(_ => {
      this._iconset = document.head.querySelector('xy-iconset');
      this._updateIcon();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'icon':
        this._iconName = newValue || '';
        this._updateIcon();
        break;
      case 'src':
        this._updateIcon();
        break;
      case 'color':
        this.style.color = newValue;
        break;
      case 'size':
        this.style.fontSize = `${newValue}px`;
        break;
      default:
        break;
    }
  }

  _usesIconset() {
    return this.icon || !this.src;
  }

  _updateIcon() {
    if (this._usesIconset()) {
      if (this._img && this._img.parentNode) {
        this.shadowRoot.removeChild(this._img);
      }

      if (this._iconset) {
        if (this._iconName === '') {
          this._iconset.removeIcon(this);
        } else {
          this._iconset.applyIcon(this, this._iconName);
        }
      }
    } else {
      if (this._iconset) {
        this._iconset.removeIcon(this);
      }

      if (!this._img) {
        this._img = document.createElement('img');
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.draggable = false;
      }
      this._img.src = this.src;
      this.shadowRoot.appendChild(this._img);
    }
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get icon() {
    return this.getAttribute('icon') || '';
  }

  set src(value) {
    this.setAttribute('src', value);
  }

  get src() {
    return this.getAttribute('src') || '';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get size() {
    return this.getAttribute('size') || '';
  }

  set color(value) {
    this.setAttribute('color', value);
  }

  get color() {
    return this.getAttribute('color') || '';
  }
}

if (!customElements.get('xy-icon')) {
  customElements.define('xy-icon', XyIcon);
}

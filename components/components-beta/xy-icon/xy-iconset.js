export default class XyIconset extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = 'none';
  }

  applyIcon(element, iconName) {
    this.removeIcon(element);
    const svg = this._cloneIcon(iconName);
    if (svg) {
      element.shadowRoot.insertBefore(svg, element.childNodes[0]);
      element._svgIcon = svg;
    }
  }

  removeIcon(element) {
    if (element._svgIcon) {
      element.shadowRoot.removeChild(element._svgIcon);
      element._svgIcon = null;
    }
  }

  _createIconMap() {
    var icons = Object.create(null);
    Array.from(this.querySelectorAll('g[id]')).forEach(icon => {
      icons[icon.id] = icon;
    });
    return icons;
  }

  _cloneIcon(id) {
    this._icons = this._icons || this._createIconMap();
    return this._prepareSvgClone(this._icons[id], this.size);
  }

  _prepareSvgClone(sourceSvg, size) {
    if (sourceSvg) {
      const content = sourceSvg.cloneNode(true);
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const viewBox = content.getAttribute('viewBox') || `0 0 ${size} ${size}`;
      const cssText =
        'pointer-events: none; display: block; width: 100%; height: 100%;';

      svg.setAttribute('viewBox', viewBox);
      svg.setAttribute('focusable', 'false');
      svg.style.cssText = cssText;
      svg.appendChild(content).removeAttribute('id');

      return svg;
    }
    return null;
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get size() {
    return this.getAttribute('size') || 24;
  }
}

if (!customElements.get('xy-iconset')) {
  customElements.define('xy-iconset', XyIconset);
}

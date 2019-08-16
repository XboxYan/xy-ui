const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      user-select: none;
      cursor: pointer;
      outline: none;
      font-family: "Montserrat", Helvetica, sans-serif;
      font-weight: 300;
    }
    :host([hidden]) {
      display: none;
    }
    
    label {
      display: inline-flex;
      align-items: baseline;
      outline: none;
    }
    
    [part='label']:not(:empty) {
      margin: 3px 14px 3px 6px;
    }
    
    [part='checkbox'] {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin: 3px;
      border-radius: 4px;
      border: 1px solid var(--themeBorderColor,#d9d9d9);
      transition: transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2),
        background-color 0.15s;
      pointer-events: none;
      line-height: 1.2;
    }
    
    [part='checkbox']::before {
      content: '\\2003';
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: inherit;
      transform: scale(1.4);
      opacity: 0;
      transition: transform 0.1s, opacity 0.8s;
    }
    [part='checkbox']::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border: 0 solid #fff;
      border-width: 3px 0 0 3px;
      box-sizing: border-box;
      transform-origin: 0 0;
      position: absolute;
      top: 12px;
      left: 7px;
      transform: scale(0.55) rotate(-135deg);
      opacity: 0;
    }
    
    :host([checked]) [part='checkbox']::after {
      opacity: 1;
      width: 10px;
      height: 17px;
    }
    
    :host([indeterminate]) [part='checkbox']::after {
      transform: none;
      opacity: 1;
      top: 45%;
      right: 3px;
      left: 3px;
      height: 10%;
      width: auto;
      border: 0;
      background-color: #fff;
      transition: opacity 0.25s;
    }
    

    :host([indeterminate]) [part='checkbox'],
    :host([checked]) [part='checkbox'] {
      border-color: transparent;
      background-color: var(--themeColor,#42b983);
    }
    
    input[type='checkbox'] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: inherit;
      margin: 0;
    }
    
    :host([disabled]) {
      pointer-events: none;
      color: rgba(28, 52, 84, 0.26);
      -webkit-tap-highlight-color: transparent;
    }
    
    :host([disabled]) [part='label'] ::slotted(*) {
      color: inherit;
    }
    
    :host([disabled]) [part='checkbox'] {
      background-color: rgba(26, 57, 96, 0.1);
    }
    
    :host([disabled]) [part='checkbox']::after {
      border-color: rgba(28, 52, 84, 0.2);
    }
    
    :host(:hover) [part='checkbox']::after {
      transition: 0.2s cubic-bezier(.12, .4, .29, 1.46);
    }
    
    :host(:not([checked]):not([disabled]):hover) [part='checkbox'],
    :host(:not([checked]):not([disabled]):focus) [part='checkbox'] {
      border-color: var(--themeColor,#42b983);
    }
    
    :host(:active) [part='checkbox'],
    :host(.active) [part='checkbox'] {
      transform: scale(0.9);
      transition-duration: 0.05s;
    }
    
    :host(:active[checked]) [part='checkbox'],
    :host(.active[checked]) [part='checkbox'] {
      transform: scale(1.1);
    }
    
    :host(:active:not([checked])) [part='checkbox']::before,
    :host(.active:not([checked])) [part='checkbox']::before {
      transition: 0.01s, 0.01s;
      transform: scale(0);
      opacity: 0.4;
    }
  
  </style>

  <label>
    <span part="checkbox">
      <input type="checkbox" role="presentation" tabindex="-1">
    </span>
    <span part="label">
      <slot></slot>
    </span>
  </label>
`;

export default class XyCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'value', 'indeterminate', 'disabled', 'tabindex'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    this.tabindex = 0;
  }

  connectedCallback() {
    this.setAttribute('role', 'checkbox');
    this.addEventListener('click', this._handleClick.bind(this));
    this.addEventListener('keydown', event => {
      if (this.__interactionsAllowed(event) && event.key === 'Enter') {
        event.preventDefault();
        this.setAttribute('active', '');
      }
    });

    this.addEventListener('keyup', event => {
      if (this.__interactionsAllowed(event) && event.key === 'Enter') {
        event.preventDefault();
        this._toggleChecked();
        this.removeAttribute('active');

        if (this.indeterminate) {
          this.indeterminate = false;
        }
      }
    });

    const attrName = this.getAttribute('name');
    if (attrName) {
      this.name = attrName;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'checked':
        this._checkedChanged(this.checked);
        break;
      case 'indeterminate':
        this._indeterminateChanged(this.indeterminate);
        break;
      case 'disabled':
        this._disabledChanged(this.disabled);
        break;
      case 'tabindex':
        this._tabindexChanged(this.tabindex);
        break;
      default:
        break;
    }
  }

  _checkedChanged(checked) {
    if (this.indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', checked);
    }
  }

  _indeterminateChanged(indeterminate) {
    if (indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', this.checked);
    }
  }

  _tabindexChanged(tabindex) {
    if (this.disabled && tabindex) {
      this.tabindex = undefined;
    }
  }

  _disabledChanged(disabled) {
    this.focusElement.disabled = disabled;
    if (disabled) {
      this.blur();
      this._previousTabIndex = this.tabindex;
      this.tabindex = undefined;
      this.setAttribute('aria-disabled', 'true');
    } else {
      if (typeof this._previousTabIndex !== 'undefined') {
        this.tabindex = this._previousTabIndex;
      }
      this.removeAttribute('aria-disabled');
    }
  }

  get focusElement() {
    return this._checkbox;
  }

  _interactionsAllowed(event) {
    if (this.disabled) {
      return false;
    }

    if (event.target.localName === 'a') {
      return false;
    }

    return true;
  }

  _handleClick(event) {
    if (this._interactionsAllowed(event)) {
      if (!this.indeterminate) {
        event.preventDefault();
        this._toggleChecked();
      } else {
        this.indeterminate = false;
        event.preventDefault();
        this._toggleChecked();
      }
    }
  }

  _toggleChecked() {
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', { composed: false, bubbles: true })
    );
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get value() {
    return this.getAttribute('value');
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  get name() {
    return this.checked ? this._storedName : '';
  }

  set name(name) {
    this._storedName = name;
  }

  set tabindex(value) {
    if (value !== undefined) {
      this.setAttribute('tabindex', value);
    } else {
      this.removeAttribute('tabindex');
    }
  }

  get tabindex() {
    return this.getAttribute('tabindex') || undefined;
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
}

customElements.define('xy-checkbox', XyCheckbox);

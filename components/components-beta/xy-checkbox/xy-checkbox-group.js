const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      color: rgba(24, 39, 57, 0.94);
      font-size: 1rem;
      font-family: 'Roboto', 'Noto', sans-serif;
      padding: 0.25rem 0;
    }

    :host::before {
      content: '\\2003';
      width: 0;
      height: 36px;
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none;
    }

    .group-field-container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    [part='label']:empty {
      display: none;
    }

    [part='label'] {
      align-self: flex-start;
      color: rgba(27, 43, 65, 0.72);
      font-weight: 500;
      font-size: 0.875em;
      margin-left: calc(0.25em / 4);
      transition: color 0.2s;
      line-height: 1;
      padding-bottom: 0.7em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
      max-width: 100%;
      box-sizing: border-box;
    }

    :host([has-label]) {
      padding-top: 1rem;
    }

    :host([required]) [part='label'] {
      padding-right: 1em;
    }

    [part='label']::after {
      content: '•';
      transition: opacity 0.2s;
      opacity: 0;
      color: var(--themeColor, #42b983);
      position: absolute;
      right: 0;
      width: 1em;
      text-align: center;
    }

    :host([required]:not([has-value])) [part='label']::after {
      opacity: 1;
    }

    :host([invalid]) [part='label']::after {
      color: rgb(245, 36, 25);
    }

    [part='error-message'] {
      margin-left: 1px;
      font-size: 14px;
      line-height: 1.25;
      color: rgb(245, 36, 25);
      will-change: max-height;
      transition: 0.4s max-height;
      max-height: 5em;
    }

    [part='error-message']:not(:empty)::before,
    [part='error-message']:not(:empty)::after {
      content: '';
      display: block;
      height: 0.4em;
    }

    :host(:not([invalid])) [part='error-message'] {
      max-height: 0;
      overflow: hidden;
    }

    :host([disabled]) [part='label'] {
      color: rgba(28, 52, 84, 0.26);
    }

  </style>

  <div class="group-field-container">
    <label part="label"></label>
    <div part="group-field">
      <slot id="slot"></slot>
    </div>
    <div part="error-message" aria-hidden=""></div>
  </div>
`;

export default  class XyCheckboxGroup extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'error-message', 'disabled', 'required', 'invalid'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._errorMessage = this.shadowRoot.querySelector(
      '[part="error-message"]'
    );
    this._label = this.shadowRoot.querySelector('[part="label"]');
    this.value = [];
  }

  connectedCallback() {
    this.addEventListener('focusin', () =>
      this._setFocused(this._containsFocus())
    );

    this.addEventListener('focusout', e => {
      if (
        !this._checkboxes.some(
          checkbox =>
            e.relatedTarget === checkbox ||
            checkbox.shadowRoot.contains(e.relatedTarget)
        )
      ) {
        this.validate();
        this._setFocused(false);
      }
    });

    this.slots = this.shadowRoot.querySelector('slot');
    this.slots.addEventListener('slotchange', () => {
      this.elements = this.querySelectorAll('xy-checkbox');
      this.elements.forEach(el => {
        el.addEventListener('change', e => {
          this._changeSelectedCheckbox(e.target);
        });
      });
    });
  }

  set value(value) {
    this._value = value;
    this._updateValue(value);
  }

  get value() {
    return this._value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'disabled':
        this._disabledChanged(this.disabled);
        break;
      case 'label':
        this._labelChanged(this.label);
        break;
      case 'error-message':
        this._errorMessageChanged(newValue);
        break;
      default:
        break;
    }
  }

  validate() {
    this.invalid = this.required && this.value.length === 0;
    return !this.invalid;
  }

  get _checkboxes() {
    return this.querySelectorAll('xy-checkbox') || [];
  }

  _disabledChanged(disabled) {
    this.setAttribute('aria-disabled', disabled);

    this._checkboxes.forEach(checkbox => (checkbox.disabled = disabled));
  }

  _errorMessageChanged(value) {
    this._errorMessage.innerHTML = value;
    this._errorMessage.setAttribute(
      'aria-hidden',
      (!newValue || !this.invalid).toString()
    );
  }

  _labelChanged(label) {
    if (label) {
      this.setAttribute('has-label', '');
      this._label.innerHTML = label;
    } else {
      this.removeAttribute('has-label');
      this._label.innerHTML = '';
    }
  }

  _addCheckboxToValue(value) {
    if (this.value.indexOf(value) === -1) {
      this.value = this.value.concat(value);
    }
  }

  _removeCheckboxFromValue(value) {
    this.value = this.value.filter(v => v !== value);
  }

  _changeSelectedCheckbox(checkbox) {
    if (this._updatingValue) {
      return;
    }

    if (checkbox.checked) {
      this._addCheckboxToValue(checkbox.value);
    } else {
      this._removeCheckboxFromValue(checkbox.value);
    }
  }

  _updateValue(value) {
    if (value.length === 0 && this._oldValue === undefined) {
      return;
    }

    if (value.length) {
      this.setAttribute('has-value', '');
    } else {
      this.removeAttribute('has-value');
    }

    this._oldValue = value;
    this._updatingValue = true;
    this._checkboxes.forEach(checkbox => {
      checkbox.checked = value.indexOf(checkbox.value) > -1;
    });
    this._updatingValue = false;

    this.validate();
  }

  _getErrorMessageAriaHidden(invalid, errorMessage) {
    return (!errorMessage || !invalid).toString();
  }

  _containsFocus() {
    const root = this.getRootNode();
    return this.contains(root.activeElement);
  }

  _setFocused(focused) {
    if (focused) {
      this.setAttribute('focused', '');
    } else {
      this.removeAttribute('focused');
    }
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

  set label(value) {
    if (value) {
      this.setAttribute('label', value);
    } else {
      this.removeAttribute('label');
    }
  }

  get label() {
    return this.getAttribute('label');
  }

  set required(value) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get required() {
    return this.hasAttribute('required');
  }

  set errorMessage(value) {
    if (value) {
      this.setAttribute('error-message', value);
    } else {
      this.removeAttribute('error-message');
    }
  }

  get errorMessage() {
    return this.getAttribute('error-message');
  }

  set invalid(value) {
    if (value) {
      this.setAttribute('invalid', '');
    } else {
      this.removeAttribute('invalid');
    }
  }

  get invalid() {
    return this.hasAttribute('invalid');
  }
}

customElements.define('xy-checkbox-group', XyCheckboxGroup);

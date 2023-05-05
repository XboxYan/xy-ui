import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Checkbox extends Base {
  #checkbox;

	static get observedAttributes() {
		return ["disabled", "checked", "required"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
      <input class="checkbox" part="checkbox" type="checkbox" id="checkbox">
      <label class="label" for="checkbox">
          <slot></slot>
      </label>
      `;
		this.#checkbox = shadowRoot.getElementById("checkbox");
	}

	focus(options) {
		this.#checkbox.focus(options);
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	get checked() {
		return this.getAttribute("checked") !== null;
	}

	get required() {
		return this.getAttribute("required") !== null;
	}

	get indeterminate() {
		return this.#checkbox.indeterminate;
	}

	get value() {
		return this.getAttribute("value") || this.textContent;
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	set checked(value) {
		this.toggleAttribute("checked", value);
	}

	set indeterminate(value) {
		this.#checkbox.indeterminate = value;
	}

	set required(value) {
		this.toggleAttribute("required", value);
	}

	connectedCallback() {
		this.#checkbox.addEventListener("change", (ev) => {
			this.checked = ev.target.checked;
			// this.checkValidity();
			this.dispatchEvent(new InputEvent("change"));
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.#checkbox[name] = newValue !== null;
	}
}

if (!customElements.get("xy-checkbox")) {
	customElements.define("xy-checkbox", Checkbox);
}

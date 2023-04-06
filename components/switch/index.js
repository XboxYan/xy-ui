import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Switch extends Base {
  #switch;
	static get observedAttributes() {
		return ["disabled", "checked"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
      <input class="switch" type="checkbox" part="switch" id="switch">
      `;
		this.#switch = shadowRoot.getElementById("switch");
	}

	focus() {
		this.#switch.focus();
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	get checked() {
		return this.getAttribute("checked") !== null;
	}

	get name() {
		return this.getAttribute("name");
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	set checked(value) {
		this.toggleAttribute("checked", value);
	}

	get value() {
		return this.#switch.checked;
	}

	set value(value) {
		this.checked = value;
	}

	connectedCallback() {
		this.#switch.addEventListener("change", (ev) => {
			this.checked = ev.target.checked;
			this.dispatchEvent(new InputEvent("change"));
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.#switch[name] = newValue !== null;
	}
}

if (!customElements.get("xy-switch")) {
	customElements.define("xy-switch", Switch);
}

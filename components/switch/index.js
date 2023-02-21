import Base from "../xy-base";
import style from "./index.css?inline" assert { type: "css" };

export default class XySwitch extends Base {
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
    this.switch = this.shadowRoot.getElementById("switch");
	}

  focus() {
		this.switch.focus();
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

	focus() {
		this.switch.focus();
	}

	connectedCallback() {
		this.switch.addEventListener("change", (ev) => {
			this.checked = this.switch.checked;
			this.dispatchEvent(
				new InputEvent("change")
			);
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == "disabled") {
      this.switch.disabled = newValue !== null
		}
		if (name == "checked") {
      this.switch.checked = newValue !== null
		}
	}
}

if (!customElements.get("xy-switch")) {
	customElements.define("xy-switch", XySwitch);
}

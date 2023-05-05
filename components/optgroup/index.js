import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class OptGroup extends Base {

	#label;

  static get observedAttributes() {
		return ["disabled", "label"];
	}
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
		<label id="label"></label>
		<slot></slot>
      `;
		this.#label = shadowRoot.getElementById("label");
	}

  get label() {
		return this.getAttribute("label") || "group";
	}

  get disabled() {
		return this.getAttribute("disabled") !== null;
	}

  set disabled(value) {
		this.toggleAttribute("disabled", value)
	}

	set label(value) {
		return this.setAttribute("label", value);
	}

	connectedCallback() {
		
	}

	async attributeChangedCallback(name, oldValue, newValue) {
		await this.renderSlot();
		if (name === "disabled") {
			const options = [...this.querySelectorAll(`xy-option`)];
			options.forEach((el) => {
				el.toggleAttribute("disabled", newValue!==null)
			});
		}
		if (name === "label") {
			this.#label.textContent = newValue
		}
	}
}

if (!customElements.get("xy-optgroup")) {
	customElements.define("xy-optgroup", OptGroup);
}

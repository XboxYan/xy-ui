import Base from "../xy-base.js";
import "../button/index.js";
import style from "./index.css?inline" assert { type: "css" };

class ButtonGroup extends Base {
	static get observedAttributes() {
		return ["disabled"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
        <slot></slot>
        `;
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	connectedCallback() {}

	async attributeChangedCallback(name, oldValue, newValue) {
		await this.renderSlot();
		if (name === "disabled") {
			const btnGroup = [...this.querySelectorAll(`xy-button`)];
			btnGroup.forEach((el) => {
				el.disabled = newValue !== null;
			});
		}
	}
}

if (!customElements.get("xy-button-group")) {
	customElements.define("xy-button-group", ButtonGroup);
}

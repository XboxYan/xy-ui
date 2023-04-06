import Base from "../xy-base.js";
import "../checkbox/index.js";
import style from "./index.css?inline" assert { type: "css" };

export default class CheckBoxGroup extends Base {
	#slots;
	static get observedAttributes() {
		return ["disabled", "value"];
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

	get required() {
		return this.getAttribute("required") !== null;
	}

	get value() {
		const checkbox = this.querySelectorAll("xy-checkbox[checked]");
		const value = [...checkbox].map((el) => el.value);
		return value.length ? value : this.getAttribute("value")?.split(",") || [];
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	set value(value) {
		const checkboxGroup = [...this.querySelectorAll(`xy-checkbox`)];
		checkboxGroup.forEach((el) => {
			el.checked = value.includes(el.value);
		});
	}

	connectedCallback() {
		this.#slots = this.shadowRoot.querySelector("slot");
		this.#slots.addEventListener("slotchange", () => {
			const checkboxGroup = [...this.querySelectorAll(`xy-checkbox`)];
			checkboxGroup.forEach((el) => {
				el.addEventListener("change", () => {
					this.value = checkboxGroup
						.filter((el) => el.checked)
						.map((el) => el.value);
					this.dispatchEvent(new InputEvent("change"));
				});
			});
		});
	}

	async attributeChangedCallback(name, oldValue, newValue) {
		await this.renderSlot();
		if (name === "disabled") {
			const checkboxGroup = [...this.querySelectorAll(`xy-checkbox`)];
			checkboxGroup.forEach((el) => {
				el.disabled = newValue !== null;
			});
		}
		if (name === "value") {
			this[name] = newValue.split(",");
		}
	}
}

if (!customElements.get("xy-checkbox-group")) {
	customElements.define("xy-checkbox-group", CheckBoxGroup);
}

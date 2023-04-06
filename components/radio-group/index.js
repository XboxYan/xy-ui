import Base from "../xy-base.js";
import "../radio/index.js";
import style from "./index.css?inline" assert { type: "css" };

// 监听属性
export default class RadioGroup extends Base {
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
		const radio = this.querySelector("xy-radio[checked]");
		return radio?.value || this.getAttribute("value") || "";
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	set value(value) {
		const radioGroup = [...this.querySelectorAll(`xy-radio`)];
		const radio = radioGroup.find((el) => el.value === value);
		if (radio) {
			radio.checked = true;
		}
	}

	connectedCallback() {
		this.#slots = this.shadowRoot.querySelector("slot");
		this.#slots.addEventListener("slotchange", (ev) => {
			const radioGroup = ev.target.assignedNodes();
			radioGroup.forEach((el) => {
				el.radioGroup = radioGroup;
				el.addEventListener("change", () => {
					this.value = el.value;
					this.dispatchEvent(new InputEvent("change"));
				});
			});
		});
	}

	async attributeChangedCallback(name, oldValue, newValue) {
		await this.renderSlot();
		if (name === "disabled") {
			const radioGroup = [...this.querySelectorAll(`xy-radio`)];
			radioGroup.forEach((el) => {
				el.disabled = newValue !== null;
			});
		} else {
			this[name] = newValue;
		}
	}
}

if (!customElements.get("xy-radio-group")) {
	customElements.define("xy-radio-group", RadioGroup);
}

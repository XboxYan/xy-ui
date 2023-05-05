import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Radio extends Base {
	#radio;
	static get observedAttributes() {
		return ["disabled", "checked", "required"];
	}

	focus(options) {
		this.#radio.focus(options);
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
      <input class="radio" part="radio" type="radio" id="radio">
      <label class="label" for="radio">
          <slot></slot>
      </label>
      `;
		this.#radio = shadowRoot.getElementById("radio");
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

	get value() {
		return this.getAttribute("value") || this.textContent;
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	set checked(value) {
		this.toggleAttribute("checked", value);
	}

	set required(value) {
		this.toggleAttribute("required", value);
	}

	// 按方向键时自动选中
	#focusChecked(dir) {
		const radioGroup = [...this.radioGroup];
		const index = radioGroup.findIndex((el) => el.checked);
		let nextIndex = index + dir;
		if (nextIndex < 0) {
			nextIndex = radioGroup.length - 1;
		}
		if (nextIndex > radioGroup.length - 1) {
			nextIndex = 0;
		}
		const nextRadio = radioGroup[nextIndex];
		nextRadio.checked = true;
		nextRadio.focus();
		nextRadio.dispatchEvent(new InputEvent("change"));
	}

	// 按 tab 键只聚焦一组radio中的一个，将其他radio设置为不可聚焦，inert = true
	#tabChange() {
		const radioGroup = [...this.radioGroup];
		radioGroup.filter((el) => el !== this).forEach((el) => (el.inert = true));
	}

	// 按 tab 聚焦到选中的 radio
	#tabFocus() {
		if (!document.activeElement.checked) {
			const radioGroup = [...this.radioGroup];
			const current = radioGroup.find((el) => el.checked) || radioGroup[0];
			current.focus();
		}
	}

	// 按 tab 离开时还原 inert = false
	#tabBlur() {
		const radioGroup = [...this.radioGroup];
		radioGroup.forEach((el) => (el.inert = false));
	}

	connectedCallback() {
		this.radioGroup = document.querySelectorAll(
			`xy-radio[name='${this.name}']`
		);
		this.#radio.addEventListener("change", (ev) => {
			this.checked = ev.target.checked;
			// this.checkValidity();
			this.dispatchEvent(new InputEvent("change"));
		});
		this.#radio.addEventListener("keydown", (ev) => {
			if (!this.radioGroup.length) return;
			switch (ev.key) {
				case "ArrowRight":
				case "ArrowDown":
					ev.preventDefault();
					this.#focusChecked(1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					ev.preventDefault();
					this.#focusChecked(-1);
					break;
				case "Tab":
					this.#tabChange();
					break;
				default:
					break;
			}
		});
		this.#radio.addEventListener("focus", () => {
			if (!this.radioGroup.length) return;
			this.#tabFocus();
		});
		this.#radio.addEventListener("blur", () => {
			if (!this.radioGroup.length) return;
			this.#tabBlur();
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.#radio[name] = newValue !== null;
		if (name === "checked" && newValue !== null) {
			// 将其他radio选中态取消
			if (this.radioGroup?.length) {
				const prev = [...this.radioGroup].find(
					(el) => el.checked && el !== this
				);
				if (prev) {
					prev.checked = false;
				}
			}
		}
	}
}

if (!customElements.get("xy-radio")) {
	customElements.define("xy-radio", Radio);
}

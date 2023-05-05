import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };
import "../button/index.js";

export default class Option extends Base {

	#button;
	#mounted;

  static get observedAttributes() {
		return ["disabled", "selected"];
	}
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
			<xy-button id="button" part="option" type="flat" block><slot></slot></xy-button>
      `;
			this.#button = shadowRoot.getElementById("button");
	}

	focus() {
		this.#button.focus();
	}

  get value() {
		return this.getAttribute("value") || this.textContent;
	}

  get label() {
		return this.textContent;
	}

  get disabled() {
		return this.getAttribute("disabled") !== null;
	}

  get selected() {
		return this.getAttribute("selected") !== null;
	}

  set selected(value) {
		this.toggleAttribute("selected", value)
	}

  set disabled(value) {
		this.toggleAttribute("disabled", value)
	}

	set value(value) {
		return this.setAttribute("value", value);
	}

	// 按方向键时自动选中
	#focusSelect(dir) {
		const options = [...this.options];
		const index = options.findIndex((el) => el === document.activeElement);
		let nextIndex = index + dir;
		if (nextIndex < 0) {
			nextIndex = options.length - 1;
		}
		if (nextIndex > options.length - 1) {
			nextIndex = 0;
		}
		const next = options[nextIndex];
		next.focus();
	}

	// 按 tab 键只聚焦一组radio中的一个，将其他radio设置为不可聚焦，inert = true
	#tabChange() {
		const options = [...this.options];
		options.filter((el) => el !== this).forEach((el) => (el.inert = true));
	}

	// 按 tab 聚焦到选中的 radio
	#tabFocus() {
		if (!document.activeElement.selected) {
			const options = [...this.options];
			const current = options.find((el) => el.selected) || options[0];
			current.focus();
		}
	}

	// 按 tab 离开时还原 inert = false
	#tabBlur() {
		const options = [...this.options];
		options.forEach((el) => (el.inert = false));
	}

	connectedCallback() {
		if (this.#mounted) return
		this.#mounted = true
		if (this.parentNode.tagName === "XY-OPTGROUP") {
			this.options = this.parentNode.parentNode.querySelectorAll('xy-option:not([disabled])');
		} else {
			this.options = this.parentNode.querySelectorAll('xy-option:not([disabled])');
		}
		this.addEventListener("click", () => {
			this.focus()
		})
		this.#button.addEventListener("keydown", (ev) => {
			if (!this.options.length) return;
			switch (ev.key) {
				case "ArrowDown":
					ev.preventDefault();
					this.#focusSelect(1);
					break;
				case "ArrowUp":
					ev.preventDefault();
					this.#focusSelect(-1);
					break;
				case "Tab":
					// this.#tabChange();
					break;
				default:
					break;
			}
		});
		this.#button.addEventListener("focus", () => {
			if (!this.options.length) return;
			// this.#tabFocus();
		});
		this.#button.addEventListener("blur", () => {
			if (!this.options.length) return;
			// this.#tabBlur();
		});
	}

	disconnectedCallback() {
		
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "selected" && newValue!==null) {
			if (this.options?.length) {
				const prev = [...this.options].find(
					(el) => el.selected && el !== this
				);
				if (prev) {
					prev.selected = false;
				}
			}
		}
		if (name === "disabled") {
			this.#button.toggleAttribute("disabled", newValue!==null)
		}
	}
}

if (!customElements.get("xy-option")) {
	customElements.define("xy-option", Option);
}

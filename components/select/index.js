import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };
import "../button/index.js";
import "../popover/index.js";
import "../icon/index.js";

export default class Select extends Base {
	#slots;
	#popoverEl;
	#buttonEl;
	#selectNode;
  static get observedAttributes() {
		return ["value", "disabled"];
	}
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
			<div class="button" id="button">
				<slot name="button">
					<xy-button part="button" behavior="selected-value"></xy-button>
				</slot>
			</div>
			<xy-popover id="popover" dir="BL,TL" type="custom" trigger="click" target="#button">
				<div class="listbox">
					<slot id="slot"></slot>
				</div>
			</xy-popover>
      `;
		this.#popoverEl = this.shadowRoot.getElementById("popover");
		this.#buttonEl = this.shadowRoot.getElementById("button");
	}

	focus(options) {
		const button = this.querySelector("[slot='button']") || this.shadowRoot.querySelector("[behavior='selected-value']")
		button.focus(options);
	}

	get #valueEl() {
		return this.querySelector("[behavior='selected-value']") || this.querySelector("[slot='button']") || this.shadowRoot.querySelector("[behavior='selected-value']");
	}

  get value() {
		return this.#valueEl.getAttribute("value");
	}

  get label() {
		return this.#valueEl.textContent;
	}

  get open() {
		return this.getAttribute("open") !== null;
	}

  get disabled() {
		return this.getAttribute("disabled") !== null;
	}

  set value(value) {
		this.#select(value);
	}

  set open(value) {
		this.toggleAttribute("open", value)
	}

  set disabled(value) {
		this.toggleAttribute("disabled", value)
	}

	#select(value, node) {
		if (node) {
			this.#valueEl.textContent = node.label;
			this.#valueEl.setAttribute("value", value)
			node.selected = true
			this.#selectNode = node
		} else {
			const options = this.querySelectorAll('xy-option:not([disabled])');
			const current = [...options].find(el => el.value == value) || options[0]
			this.#valueEl.setAttribute("value", current?.value)
			this.#valueEl.textContent = current?.label
			current.selected = true
			this.#selectNode = current
		}
	}

	close() {
		this.#popoverEl.open = false
	}

	connectedCallback() {
		this.#slots = this.shadowRoot.getElementById("slot");
		this.#slots.addEventListener("slotchange", () => {
			if (this.#popoverEl.parentNode === document.body) {
				this.#popoverEl.innerHTML = this.innerHTML
				this.#selectNode = this.#popoverEl.querySelector('xy-option[selected]')
			}
			const options = this.querySelectorAll('xy-option:not([disabled])');
			if (!this.value) {
				this.#select(options[0]?.value, options[0])
			}
		});
		this.#buttonEl.addEventListener("click", ev => {
			const openSelects = this.getRootNode().querySelectorAll('xy-select[open]')
			const other = [...openSelects].filter(el => el !== this)[0]
			if (other) {
				other.close()
			}
		})
		this.#popoverEl.addEventListener("click", ev => {
			const target = ev.target
			if (target.tagName === 'XY-OPTION' && !target.disabled) {
				this.#select(target.value, target)
				this.#popoverEl.open = false
				this.dispatchEvent(new InputEvent('change'))
			}
		})
		this.#popoverEl.addEventListener("change", (ev) => {
			const open = ev.target.open
			this.open = open
			if (open) {
				setTimeout(() => {
					if (!this.#selectNode) return
					if (!this.#selectNode.selected) {
						this.#selectNode.selected = true
					}
					this.#selectNode.focus({ preventScroll: true })
				}, 200);
			} else {
				this.focus({ preventScroll: true })
			}
		})
	}

	async attributeChangedCallback(name, oldValue, newValue) {
		await this.renderSlot()
		if (name === "value") {
			this.#select(newValue)
		}
		if (name === "disabled") {
			this.#buttonEl.toggleAttribute("inert", newValue!==null)
			this.#valueEl.toggleAttribute("disabled", newValue!==null)
		}
	}
}

if (!customElements.get("xy-select")) {
	customElements.define("xy-select", Select);
}

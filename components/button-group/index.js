import Base from "../xy-base.js";
import "../button/index.js";
import style from "./index.css?inline" assert { type: "css" };

// 监听属性
const observedAttributes = ["disabled"]
class XyButtonGroup extends Base {
  static get observedAttributes() {
		return observedAttributes;
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
		const btnGroup =  [...this.querySelectorAll(`xy-button`)]
		btnGroup.forEach(el => {
			el.disabled = value
		})
	}

  connectedCallback() {
		this.slots = this.shadowRoot.querySelector('slot')
		this.slots.addEventListener("slotchange", () => {
			observedAttributes.forEach(el => this[el] = this[el])
		})
	}

  attributeChangedCallback(name, oldValue, newValue) {
		if (!this.slots) return
		if (name === 'disabled') {
			this[name] = newValue!==null
		}
	}

}

if (!customElements.get("xy-button-group")) {
	customElements.define("xy-button-group", XyButtonGroup);
}
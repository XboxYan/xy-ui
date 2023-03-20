import style from "./index.css?inline" assert { type: "css" };
import Pop from "../pop/index.js";

export default class XyPopOver extends Pop {
	constructor() {
		super();
		this.adoptedStyle(style);
		this.shadowRoot.innerHTML = `
		<slot></slot>
		`;
	}

	get triggerEl() {
		const target = this.getAttribute('target')
		if (target) {
			return this.getRootNode().querySelector(target)
		} else {
			return this.previousElementSibling || this.parentNode
		}
	}

	get dir() {
		return this.getAttribute("dir") || "BL,TL";
	}

	set dir(value) {
		this.setAttribute("dir", value);
	}

	get trigger() {
		return this.getAttribute("trigger") || "hover,focus";
	}

	set trigger(value) {
		this.setAttribute("trigger", value);
	}

	connectedCallback() {
		if (!this.target) {
			this.target = this.triggerEl
		}
		this.init(this.target, {
			dir: this.dir,
			trigger: this.trigger,
		})
	}
}

/*
new PopOver(el, {
  dir : 'top',
  dir : 'top',
})
*/

if (!customElements.get("xy-popover")) {
	customElements.define("xy-popover", XyPopOver);
}
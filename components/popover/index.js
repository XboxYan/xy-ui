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

	connectedCallback() {
		if (!this.target) {
			this.target = this.triggerEl
		}
		this.init(this.target, {
			dir: this.dir,
			trigger: this.trigger,
		})
		if (this.trigger.includes('contextmenu')) {
			this.target.addEventListener('contextmenu', ev => {
				ev.preventDefault();
				if (this.disabled) return;
				if (!this.isConnected || this.parentNode !== document.body) {
					document.body.append(this);
					this.clientWidth;
				}
				this.style.left = ev.pageX + 'px'
				this.style.top = ev.pageY + 'px'
				this.toggleAttribute('open', true)
			})
			document.addEventListener('click', ev => {
				if (!this.contains(ev.target)) {
					this.toggleAttribute('open', false)
				}
			})
		}
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
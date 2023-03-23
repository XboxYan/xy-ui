import style from "./index.css?inline" assert { type: "css" };
import Pop from "../pop/index.js";

export default class XyPopOver extends Pop {
	static get observedAttributes() {
		return ["open"];
	}

	constructor() {
		super();
		this.adoptedStyle(style);
		this.shadowRoot.innerHTML = `
		<slot></slot>
		`;
	}

	get targetAll() {
		const target = this.getAttribute('target')
		if (target) {
			return [...this.getRootNode().querySelectorAll(target)]
		} else {
			return [this.previousElementSibling || this.parentNode]
		}
	}

	bind(target) {
		this.init(target, {
			dir: this.dir,
			trigger: this.trigger,
		})
		target.pop = this // popover 是原生属性
		if (this.trigger.includes('contextmenu')) {
			target.addEventListener('contextmenu', ev => {
				ev.preventDefault();
				if (this.disabled) return;
				if (!this.isConnected || this.parentNode !== document.body) {
					document.body.append(this);
					this.clientWidth;
				}
				this.style.left = ev.pageX + 'px'
				this.style.top = ev.pageY + 'px'
				this.open = true
			})
			document.addEventListener('click', ev => {
				if (!this.contains(ev.target)) {
					this.open = false
				}
			})
		}
	}

	connectedCallback() {
		if (!this.targetList) {
			this.targetList = this.targetAll
		}
		this.targetList.forEach(target => {
			this.bind(target)
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'open') {
			this.dispatchEvent(new Event('change'))
			if (this.open) {
				this.dispatchEvent(new Event('show'))
			} else {
				this.dispatchEvent(new Event('hide'))
			}
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
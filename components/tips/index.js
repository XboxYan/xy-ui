import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };
import Pop from "../pop/index.js";

export class Tip extends Pop {
	constructor(triggerEl, option) {
		super();
		this.adoptedStyle(style);
		// this.shadowRoot.innerHTML = `<slot></slot>`;
		this.init(triggerEl, {
			dir: "top,bottom",
			trigger: ["hover", "focus"],
			...option,
		});
	}

	set tips(value) {
		this.disabled = !value;
		if (this.firstChild) {
			this.firstChild.data = value;
		} else {
			this.textContent = value;
		}
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	set color(value) {
		this.style.setProperty("--tips-bg", value);
	}

  disconnectedCallback() {
    if (this._documentClickEvent.length && !this.isConnected) {
			this._documentClickEvent.forEach(event => {
				document.removeEventListener("click", event);
			})
		}
  }
}

/*
new Tips('el, {
  tips : 'xxx',
  dir : 'top',
})
*/

if (!customElements.get("xy-tip")) {
	customElements.define("xy-tip", Tip);
}

export default class Tips extends Base {
	static get observedAttributes() {
		return ["color", "tips", "type", "open", "dir", "offset"];
	}

  static init(...params){
    return new Tip(...params)
  }

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.innerHTML = `
      <style>
      :host{
        display: contents!important;
      }
      </style>
      <slot></slot>
      `;
      // this.tipEl = shadowRoot.getElementById("tips")
	}

	get tips() {
		return this.getAttribute("tips") || "";
	}

	get color() {
		return this.getAttribute("color") || "";
	}

	get dir() {
		return this.getAttribute("dir") || "top";
	}

	get type() {
		return this.getAttribute("type");
	}

	get open() {
		return this.getAttribute("open") !== null;
	}

	get offset() {
		return this.getAttribute("offset") || "0,0";
	}

	get trigger() {
		return this.getAttribute("trigger") || "hover,focus";
	}

	set trigger(value) {
		this.setAttribute("trigger", value);
	}

	set tips(value) {
		this.setAttribute("tips", value);
	}

	set color(value) {
		this.setAttribute("color", value);
	}

	set dir(value) {
		this.setAttribute("dir", value);
	}

	set open(value) {
		this.toggleAttribute("open", value);
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	set offset(value) {
		this.setAttribute("offset", value);
	}

	connectedCallback() {
    // this.tipEl.target = this.firstElementChild
		this.tipEl = new Tip(this.firstElementChild, {
			tips: this.tips,
			dir: this.dir,
			color: this.color,
			type: this.type,
			open: this.open,
			offset: this.offset,
			trigger: this.trigger,
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (!this.tipEl) return;
		this.tipEl[name] = this[name];
	}

	disconnectedCallback() {
		this.tipEl?.remove();
	}
}

if (!customElements.get("xy-tips")) {
	customElements.define("xy-tips", Tips);
}

import Base from "../xy-base.js";
import popupStyle from "./popup.css?inline" assert { type: "css" };
import Pop from "../pop/index.js";

export class PopUp extends Pop {
	constructor() {
		super();
		this.adoptedStyle(popupStyle);
		this.shadowRoot.innerHTML = `
		<slot id="content"></slot>
		`;
	}

	connectedCallback() {
		this.content = this.shadowRoot.getElementById("content");
		this.content.addEventListener("slotchange", (ev) => {
			console.log(ev.target.assignedElements())
		})
		// this.init(triggerEl, {
		// 	dir: "top,bottom",
		// 	trigger: ["hover", "focus"],
		// 	...option,
		// });
	}

	adoptedCallback() {
		console.log(2434)
	}
}

/*
new Tips('el, {
  tips : 'xxx',
  dir : 'top',
})
*/

if (!customElements.get("xy-popup")) {
	customElements.define("xy-popup", PopUp);
}

export default class XyPopOver extends Base {
	static get observedAttributes() {
		return ["color", "tips", "type", "open", "dir", "offset"];
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
      <slot id="slots"></slot>

      `;
		// this.slots = shadowRoot.getElementById("slots");	
	}

	get dir() {
		return this.getAttribute("dir") || "top";
	}
	get open() {
		return this.getAttribute("open") !== null;
	}

	get trigger() {
		return this.getAttribute("trigger") || "hover,focus";
	}

	set trigger(value) {
		this.setAttribute("trigger", value);
	}

	set dir(value) {
		this.setAttribute("dir", value);
	}

	set open(value) {
		this.toggleAttribute("open", value);
	}

	connectedCallback() {
		this.slots = this.shadowRoot.getElementById("slots");
		this.slots.addEventListener("slotchange", (ev) => {
			const [ trriger, popup ] = ev.target.assignedElements()
			// console.log(22)
			if (trriger && popup) {
				popup.init(trriger, {
					dir: "BL,TL",
					trigger: ["hover", "focus"],
				})
			}
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		
	}

	disconnectedCallback() {
		// this.tipEl?.remove();
	}
}

if (!customElements.get("xy-popover")) {
	customElements.define("xy-popover", XyPopOver);
}

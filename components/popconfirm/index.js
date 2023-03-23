import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };
import "../popover/index.js";

export default class XyPopConfirm extends Base {
  constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
    shadowRoot.innerHTML = `
      <slot></slot>
      <xy-popover dir="top,bottom" id="pop" trigger="click">
      ddd
      </xy-popover>
      `;
      this.pop = shadowRoot.querySelector('#pop')
	}

  connectedCallback() {
    this.slots = this.shadowRoot.querySelector("slot");
    this.slots.addEventListener("slotchange", (ev) => {
      const [target] = ev.target.assignedNodes();
      this.pop.bind(target);
    })
  }
}

if (!customElements.get("xy-popconfirm")) {
	customElements.define("xy-popconfirm", XyPopConfirm);
}
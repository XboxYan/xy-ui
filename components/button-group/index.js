import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

class XyButtonGroup extends Base {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
        <slot></slot>
        `;
	}
}

if (!customElements.get("xy-button-group")) {
	customElements.define("xy-button-group", XyButtonGroup);
}
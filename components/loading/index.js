import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Loading extends Base {
  #loading;
	static get observedAttributes() {
		return ["color", "size"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
    <i class="loading" part="loading" id="loading"></i>
    <slot></slot>
      `;
		this.#loading = shadowRoot.getElementById("loading");
	}

	get size() {
		return this.getAttribute("size") || "";
	}

	get color() {
		return this.getAttribute("color") || "";
	}

	set size(value) {
		this.setAttribute("size", value);
	}

	set color(value) {
		this.setAttribute("color", value);
	}

	connectedCallback() {}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		if (name === "size") {
			this.#loading.style.fontSize = newValue + "px";
		}
		if (name === "color") {
			this.#loading.style.color = newValue;
		}
	}
}

if (!customElements.get("xy-loading")) {
	customElements.define("xy-loading", Loading);
}

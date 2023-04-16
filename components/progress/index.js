import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Progress extends Base {
	#progress;
	#info;
	static get observedAttributes() {
		return ["value"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
			<div class="progress" id="progress" part="progress" role="progressbar"></div>
			<span class="info" id="info" part="info"></span>
				`;
		this.#progress = shadowRoot.getElementById("progress");
		this.#info = shadowRoot.getElementById("info");
	}

	#render() {
		this.#progress.style.setProperty("--percent", this.value * 100 + "%");
		this.#info.textContent = this.value * 100 + "%";
	}

	get type() {
		return this.getAttribute("type") || "line";
	}

	get error() {
		return this.getAttribute("error") !== null;
	}

	get value() {
		const value = Number(this.getAttribute("value") || ".5");
		return Math.min(Math.max(value), 1);
	}

	set value(value) {
		this.setAttribute("value", value);
	}

	set error(value) {
		this.toggleAttribute("error", value);
	}

	connectedCallback() {}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "value") {
			this.#render();
		}
	}
}

if (!customElements.get("xy-progress")) {
	customElements.define("xy-progress", Progress);
}

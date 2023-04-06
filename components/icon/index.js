import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Icon extends Base {
  #icon;
	static get observedAttributes() {
		return ["name", "size", "color", "type", "spin"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `<i id="icon" part="icon" class="icon" role="img"></i>`;
		this.#icon = shadowRoot.getElementById("icon");
	}

	get name() {
		return this.getAttribute("name");
	}

	get spin() {
		return this.getAttribute("spin") !== null;
	}

	get type() {
		return this.getAttribute("type") || "regular";
	}

	set name(value) {
		this.setAttribute("name", value);
	}

	set type(value) {
		this.setAttribute("type", value);
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

  set spin(value) {
		this.toggleAttribute("spin", value);
	}

	connectedCallback() {}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "name" || name === "type") {
      const icon = `${this.constructor.urlPrefix}/${this.name.includes('/')?this.name:(this.type+'/'+this.name)}.svg`
      this.#icon.setAttribute("aria-label", this.name)
      this.#icon.style.setProperty('--icon', `url(${icon})`);
		}
		if (name === "color") {
			this.#icon.style.color = newValue;
		}
		if (name === "size") {
			this.#icon.style.fontSize = newValue + "px";
		}
		if (name === "spin") {
			this.spin = newValue!==null;
		}
	}
}

if (!customElements.get("xy-icon")) {
	customElements.define("xy-icon", Icon);
}

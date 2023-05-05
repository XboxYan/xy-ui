import Base from "../xy-base.js";
import "../loading/index.js";
import "../icon/index.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Button extends Base {
	#btnEl;
	#iconEl;
	#loadEl;

	static get observedAttributes() {
		return [
			"disabled",
			"icon",
			"loading",
			"href",
			"htmltype",
			"download",
			"rel",
			"target",
		];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		if (this.href !== null) {
			shadowRoot.innerHTML = `<a
            class="button" part="button" id="button"
          >
          <slot></slot>
          </a>
          `;
		} else {
			shadowRoot.innerHTML = `<button
            class="button" part="button" id="button"
          >
          <slot></slot>
          </button>
          `;
		}
		this.#btnEl = shadowRoot.getElementById("button");
	}

	focus(options) {
		this.#btnEl.focus(options);
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	get toggle() {
		return this.getAttribute("toggle") !== null;
	}

	get htmltype() {
		return this.getAttribute("htmltype");
	}

	get checked() {
		return this.getAttribute("checked") !== null;
	}

	get href() {
		return this.getAttribute("href");
	}

	get target() {
		return this.getAttribute("target") || "_blank";
	}

	get rel() {
		return this.getAttribute("rel");
	}

	get download() {
		return this.getAttribute("download");
	}

	get icon() {
		return this.getAttribute("icon");
	}

	get size() {
		return this.getAttribute("size") || "";
	}

	get loading() {
		return this.getAttribute("loading") !== null;
	}

	set icon(value) {
		this.setAttribute("icon", value);
	}

	set htmltype(value) {
		this.setAttribute("htmltype", value);
	}

	set href(value) {
		this.setAttribute("href", value);
	}

	set size(value) {
		this.setAttribute("size", value);
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	set checked(value) {
		this.toggleAttribute("checked", value);
	}

	set loading(value) {
		this.toggleAttribute("loading", value);
	}

	set toggle(value) {
		this.toggleAttribute("toggle", value);
	}

	connectedCallback() {
		this.addEventListener("click", function () {
			if (this.toggle) {
				this.checked = !this.checked;
			}
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "disabled") {
			this.#btnEl.toggleAttribute("inert", newValue !== null);
			this.#btnEl.toggleAttribute("disabled", newValue !== null);
			return;
		}
		if (name === "htmltype") {
			this.#btnEl.type = newValue
			return;
		}
		if (name == "loading") {
			if (!this.#loadEl) {
				this.#loadEl = document.createElement("xy-loading");
				this.#loadEl.style.color = "inherit";
			}
			if (newValue !== null) {
				this.#btnEl.prepend(this.#loadEl);
				this.#btnEl.toggleAttribute("inert", true);
			} else {
				this.#btnEl.removeChild(this.#loadEl);
				this.#btnEl.toggleAttribute("inert", false);
			}
			return;
		}
		if (name == "icon") {
			if (!this.#iconEl) {
				this.#iconEl = document.createElement("xy-icon");
			}
			if (newValue !== null) {
				this.#iconEl.name = newValue;
				this.#btnEl.prepend(this.#iconEl);
			} else {
				this.#btnEl.removeChild(this.#iconEl);
			}
			return;
		}
		this.#btnEl[name] = newValue;
	}
}

if (!customElements.get("xy-button")) {
	customElements.define("xy-button", Button);
}

import Base from "../xy-base.js";
import "../loading/index.js";
import "../xy-icon.js";
import style from "./index.css?inline" assert { type: "css" };

export default class XyButton extends Base {
	static get observedAttributes() {
		return ["disabled", "icon", "loading", "href", "htmltype", "download", "rel", "target"];
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
            ${this.htmltype ? 'type="' + this.htmltype + '"' : ""}
          >
          <slot></slot>
          </button>
          `;
		}
		this.btnEl = shadowRoot.getElementById("button");
	}

	focus() {
		this.btnEl.focus();
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

	get loading() {
		return this.getAttribute("loading") !== null;
	}

    set size(value) {
		this.setAttribute("size", value);
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

	set disabled(value) {
		this.toggleAttribute("disabled", value);
        this.btnEl.toggleAttribute("inert", value);
		this.btnEl.toggleAttribute("disabled", value);
	}

	set checked(value) {
		this.toggleAttribute("checked", value);
	}

	set loading(value) {
		this.toggleAttribute("loading", value);
        if (!this.loadEl) {
            this.loadEl = document.createElement("xy-loading");
            this.loadEl.style.color = "inherit";
        }
        if (value) {
            this.btnEl.prepend(this.loadEl);
            this.btnEl.toggleAttribute("inert", true);
        } else {
            this.btnEl.removeChild(this.loadEl);
            this.btnEl.toggleAttribute("inert", false);
        }
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
        if (name === "disabled" || name == "loading") {
            this[name] = newValue!== null
        }
        this.btnEl[name] = newValue
	}
}

if (!customElements.get("xy-button")) {
	customElements.define("xy-button", XyButton);
}

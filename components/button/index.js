import Base from "../xy-base";
import "../xy-loading.js";
import "../xy-icon.js";
import style from "./index.css?inline" assert { type: "css" };
import groupStyle from "./group.css?inline" assert { type: "css" };

export default class XyButton extends Base {
	static get observedAttributes() {
		return ["disabled", "icon", "loading", "href", "htmltype", "download", "rel", "target"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		if (this.href) {
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
		this.btnEl = this.shadowRoot.getElementById("button");
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

	get name() {
		return this.getAttribute("name");
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
		if (name == "disabled") {
			this.btnEl.toggleAttribute("inert", newValue !== null);
		}
		if (name == "loading") {
			if (!this.loadEl) {
				this.loadEl = document.createElement("xy-loading");
				this.loadEl.style.color = "inherit";
			}
			if (newValue !== null) {
				this.btnEl.prepend(this.loadEl);
				this.btnEl.toggleAttribute("inert", true);
			} else {
				this.btnEl.removeChild(this.loadEl);
				this.btnEl.toggleAttribute("inert", false);
			}
		}
		if (name == "icon" && !this.loadEling) {
            if (!this.iconEl) {
				this.iconEl = document.createElement("xy-icon");
			}
            if (newValue !== null) {
                this.iconEl.name = newValue;
				this.btnEl.prepend(this.iconEl);
			} else {
				this.btnEl.removeChild(this.iconEl);
			}
		}
		if (name == "href") {
			this.btnEl.href = newValue;
		}
		if (name == "download") {
			this.btnEl.download = newValue;
		}
		if (name == "rel") {
			this.btnEl.rel = newValue;
		}
		if (name == "target") {
			this.btnEl.target = newValue;
		}
		if (name == "htmltype") {
			this.btnEl.type = newValue;
		}
	}
}

if (!customElements.get("xy-button")) {
	customElements.define("xy-button", XyButton);
}

class XyButtonGroup extends Base {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(groupStyle);
		shadowRoot.innerHTML = `
        <slot></slot>
        `;
	}
}

if (!customElements.get("xy-button-group")) {
	customElements.define("xy-button-group", XyButtonGroup);
}

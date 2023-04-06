import Base from "../xy-base.js";
import tips from "../tips/index.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Rate extends Base {
  #star;
  #rates;
	static get observedAttributes() {
		return ["color", "size", "value", "disabled", "tips", "icon"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
    <fieldset id="star" aria-label="rate">
      <input part="rate" name="star" value="1" type="radio" />
      <input part="rate" name="star" value="2" type="radio" />
      <input part="rate" name="star" value="3" type="radio" />
      <input part="rate" name="star" value="4" type="radio" />
      <input part="rate" name="star" value="5" type="radio" />
    </fieldset>
      `;
		this.#star = shadowRoot.getElementById("star");
		this.#rates = [...shadowRoot.querySelectorAll("input")];
	}

	get value() {
		const radio = this.shadowRoot.querySelector("input:checked");
		return radio?.value || this.getAttribute("value") || 0;
	}

	get size() {
		return this.getAttribute("size") || "";
	}

	get icon() {
		return this.getAttribute("icon") || "";
	}

	get tips() {
		return this.getAttribute("tips")?.split(",") || [];
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	set tips(value) {
		this.setAttribute("tips", value);
	}

	set icon(value) {
		this.setAttribute("icon", value);
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

	set value(value) {
		const radio = this.shadowRoot.querySelector(`input[value='${value}']`);
		if (radio) {
			radio.checked = true;
		}
	}

	connectedCallback() {
		this.#rates.forEach((el, index) => {
			el.tipsEl = tips.init(el, {
				tips: this.tips[index] || "",
				disabled: !this.tips[index],
			});
			el.addEventListener("change", () => {
				this.dispatchEvent(new InputEvent("change"));
			});
		});
	}

	disconnectedCallback() {
		this.#rates.forEach((el) => {
			el.tipsEl?.remove();
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "size") {
			this.#star.style.fontSize = newValue + "px";
		}
		if (name === "color") {
			this.#star.style.color = newValue;
		}
		if (name === "value") {
			this.value = newValue;
		}
		if (name === "disabled") {
			this.#star.disabled = newValue !== null;
		}
		if (name === "icon") {
      const icon = `${this.constructor.urlPrefix}/${this.icon.includes('/')?this.icon:('regular/'+this.icon)}.svg`
			this.#star.style.setProperty('--icon', `url(${icon})`);
		}
		if (name === "tips" && this.#rates.length) {
			this.#rates.forEach((el, index) => {
				if (el.tipsEl) {
					el.tipsEl.tips = this.tips[index];
					el.tipsEl.disabled = !this.tips[index];
				}
			});
		}
	}
}

if (!customElements.get("xy-rate")) {
	customElements.define("xy-rate", Rate);
}

import "../tips/index.js";
import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Slider extends Base {
  #tipsEl;
  #slider;
	static get observedAttributes() {
		return ["min", "max", "step", "disabled", "tips", "value"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
    <xy-tips dir="top,bottom" id="tips">
        <input part="slider" class="slider" id="slider" type="range">
    </xy-tips>`;
		this.#tipsEl = shadowRoot.getElementById("tips");
		this.#slider = shadowRoot.getElementById("slider");
	}

	focus() {
		this.#slider.focus();
	}

	connectedCallback() {
		if (this.vertical) {
			this.resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					const { height } = entry.contentRect;
					this.#tipsEl.style.setProperty("--h", height + "px");
				}
			});
			this.resizeObserver.observe(this);
			this.#tipsEl.dir = "right";
			this.#tipsEl.tipEl.auto = "right,left";
		}
    this.#tipsEl.tipEl.shadowRoot.getElementById("pop").style.transition = "all var(--transition, .2s), left 0s, top 0s";
		this.#slider.addEventListener("input", (ev) => {
			this.renderTip(ev.target.value);
			// this.dispatchEvent(new InputEvent("input"));
		});
		this.#slider.addEventListener("change", (ev) => {
			// this.renderTip(ev.target.value);
			this.dispatchEvent(new InputEvent("change"));
		});
		this.renderTip(this.value);
	}

	disconnectedCallback() {
		if (this.vertical) {
			this.resizeObserver.unobserve(this);
		}
	}

	renderTip(value) {
		const percent = (value - this.min) / (this.max - this.min);
		this.#tipsEl.style.setProperty("--percent", percent);
		if (this.tips === null) {
			this.#tipsEl.tips = "";
			return;
		}
		const tips = new Function(
			"value",
			"return `" + (this.tips || "${value}") + "`"
		)(value);
		this.#tipsEl.tips = tips;
		if (this.vertical) {
			this.#tipsEl.offset =
				"0," + parseInt((0.5 - percent) * (this.offsetHeight - 10));
		} else {
			this.#tipsEl.offset =
				parseInt((percent - 0.5) * (this.offsetWidth - 10)) + ",0";
		}
	}

	get value() {
		return Number(this.#slider.value);
	}

	get min() {
		return this.getAttribute("min") || 0;
	}

	get max() {
		return this.getAttribute("max") || 100;
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	get tips() {
		return this.getAttribute("tips");
	}

	get vertical() {
		return this.getAttribute("vertical") !== null;
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
		this.#slider.toggleAttribute("disabled", value);
	}

	get step() {
		return this.getAttribute("step") || 1;
	}

	set value(value) {
		this.#slider.value = value;
		this.renderTip(value);
	}

	set min(value) {
		this.setAttribute("min", value);
	}

	set max(value) {
		this.setAttribute("max", value);
	}

	set step(value) {
		this.setAttribute("step", value);
	}

	set vertical(value) {
		this.toggleAttribute("vertical", value);
	}

	set tips(value) {
		if (value === false) {
			this.toggleAttribute("tips", value);
			this.#tipsEl.tips = "";
		} else {
			this.setAttribute("tips", value);
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.#slider[name] = newValue;
		if (name !== "disabled") {
			this.renderTip(this.value);
		}
	}
}

if (!customElements.get("xy-slider")) {
	customElements.define("xy-slider", Slider);
}

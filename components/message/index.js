import Base from "../xy-base.js";
import "../icon/index.js";
import "../loading/index.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Message extends Base {
	#loadEl;
	#icon;
	#messageContent;

	static open;
	static show;
	static success;
	static info;
	static warning;
	static error;
	static loading;

	static get observedAttributes() {
		return ["type", "icon", "loading"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
      <xy-icon id="icon"></xy-icon>
      <slot></slot>
        `;
		this.#icon = shadowRoot.getElementById("icon");
		this.#messageContent = document.getElementById("message-content");
		if (!this.#messageContent) {
			this.#messageContent = document.createElement("div");
			this.#messageContent.id = "message-content";
			this.#messageContent.style =
				"position:fixed; pointer-events:none; left:0; right:0; top:10px; z-index:51;";
			document.body.appendChild(this.#messageContent);
		}
	}

	get open() {
		return this.getAttribute("open") !== null;
	}

	get loading() {
		return this.getAttribute("loading") !== null;
	}

	get icon() {
		return this.getAttribute("icon");
	}

	get type() {
		return this.getAttribute("type");
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	set icon(value) {
		this.setAttribute("icon", value);
	}

	set open(value) {
		this.toggleAttribute("open", value);
	}

	set loading(value) {
		this.toggleAttribute("loading", value);
	}

	#typeMap = {
		info: {
			name: "solid/circle-info",
			color: "var(--info-color, #1890ff)",
		},
		success: {
			name: "solid/circle-check",
			color: "var(--success-color, #52c41a)",
		},
		warning: {
			name: "solid/circle-exclamation",
			color: "var(--waring-color, #faad14)",
		},
		error: {
			name: "solid/circle-xmark",
			color: "var(--error-color, #f4615c)",
		},
	};

	render() {
		this.#messageContent.appendChild(this);
		this.clientWidth;
		this.open = true;
	}

	connectedCallback() {
		this.addEventListener("transitionend", (ev) => {
			if (ev.propertyName === "transform" && !this.open) {
				this.dispatchEvent(new Event("close"));
				this.remove();
			}
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == "type") {
			this.#icon.name = this.#typeMap[newValue].name;
			this.#icon.color = this.#typeMap[newValue].color;
		}
		if (name == "icon") {
			this.#icon.name = newValue;
		}
		if (name == "loading") {
			if (!this.#loadEl) {
				this.#loadEl = document.createElement("xy-loading");
			}
			this.loading = newValue !== null;
			if (newValue !== null) {
				this.shadowRoot.prepend(this.#loadEl);
			} else {
				this.shadowRoot.removeChild(this.#loadEl);
			}
		}
	}
}

if (!customElements.get("xy-message")) {
	customElements.define("xy-message", Message);
}

// 静态方法
Message.open = function(type, text, duration, onclose) {
	const message = new this();
	message.timer && clearTimeout(message.timer);
	if (type === "loading") {
		message.loading = true;
	} else {
		message.type = type;
	}
	message.textContent = text || "";
	message.render();
	if (typeof duration === "function") {
		duration();
	} else {
		message.onclose = onclose;
		if (duration !== 0 && !message.loading) {
			message.timer = setTimeout(() => {
				message.open = false;
			}, duration || 3000);
		}
	}
	return message;
}

Message.show = function({ type = "success", icon, text, duration = 3000, onclose }) {
	const message = this.open(type, text, duration, onclose);
	message.icon = icon;
	return message;
}

Message.success = function(...params) {
	return this.open("success", ...params);
}

Message.info = function(...params) {
	return this.open("info", ...params);
}

Message.warning = function(...params) {
	return this.open("warning", ...params);
}

Message.error = function(...params) {
	return this.open("error", ...params);
}

Message.loading = function(...params) {
	return this.open("loading", ...params);
}
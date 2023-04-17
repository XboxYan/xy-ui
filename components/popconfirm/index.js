import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };
import PopOver from "../popover/index.js";
import "../button/index.js";
import "../icon/index.js";

export default class PopConfirm extends PopOver {
  #mounted;
	#btnCancel; // 取消按钮
	#btnSubmit; // 确认按钮
  #title; // 标题
  #content; // 内容
  static get observedAttributes() {
		return ["title", "content", "submittext", "canceltext", "loading"];
	}
	constructor() {
		super();
		this.adoptedStyle(style);
		this.popHTML = `
      <slot name="icon"><xy-icon name="solid/circle-question"></xy-icon></slot>
      <div class="pane">
        <h4 class="title" id="title" part="title"></h4>
        <slot class="content" id="content"></slot>
        <div class="footer" part="footer">
          <xy-button type="flat" size="small" id="cancel" close>取消</xy-button>
          <xy-button type="primary" size="small" id="submit">确认</xy-button>
        </div>
      </div>
      `;
		this.#title = this.shadowRoot.querySelector("#title");
		this.#content = this.shadowRoot.querySelector("#content");
		this.#btnSubmit = this.shadowRoot.querySelector("#submit");
		this.#btnCancel = this.shadowRoot.querySelector("#cancel");
	}

  get submittext() {
		return this.getAttribute("submittext") || "确认";
	}

  get loading() {
		return this.getAttribute("loading") !== null;
	}

  get canceltext() {
		return this.getAttribute("canceltext") || "取消";
	}

	set submittext(value) {
		this.setAttribute("submittext", value);
	}

  set canceltext(value) {
		this.setAttribute("canceltext", value);
	}

  set loading(value) {
		this.toggleAttribute("loading", value);
	}

	connectedCallback() {
		this.trigger = "click";
		this.dir = "top";
		this.auto = "top,bottom";
		this.render();
    if (this.#mounted) return
		this.#mounted = true
		this.#btnCancel.addEventListener("click", () => {
			// this.open = false;
      this.dispatchEvent(new Event('cancel'))
		});
		this.#btnSubmit.addEventListener("click", () => {
			this.dispatchEvent(new Event('submit'))
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "title") {
			this.#title.textContent = newValue
		}
		if (name === "content") {
			this.#content.textContent = newValue;
		}
		if (name === "canceltext") {
			this.#btnCancel.textContent = newValue;
		}
		if (name === "submittext") {
			this.#btnSubmit.textContent = newValue;
		}
		if (name === "loading") {
			this.#btnSubmit.loading = newValue!==null;
		}
	}
}

if (!customElements.get("xy-popconfirm")) {
	customElements.define("xy-popconfirm", PopConfirm);
}

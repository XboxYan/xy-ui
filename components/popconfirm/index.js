import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };
import PopOver from "../popover/index.js";
import "../button/index.js";
import "../icon/index.js";

export default class XyPopConfirm extends PopOver {
	#btnCancel; // 取消按钮
	#btnSubmit; // 确认按钮
	constructor() {
		super();
		this.adoptedStyle(style);
		this.shadowRoot.innerHTML = `
      <slot name="icon"><xy-icon name="solid/circle-question"></xy-icon></slot>
      <div class="pane">
        <h4 class="title" id="title">你确定吗</h4>
        <slot class="content"></slot>
        <div class="footer">
          <xy-button type="flat" size="small" id="cancel">取消</xy-button>
          <xy-button type="primary" size="small" id="submit">确认</xy-button>
        </div>
      </div>
      `;
		this.#btnCancel = this.shadowRoot.querySelector("#cancel");
		this.#btnSubmit = this.shadowRoot.querySelector("#submit");
	}

	connectedCallback() {
		this.trigger = "click";
		this.dir = "top";
		this.auto = "top,bottom";
		this.render();
		this.#btnCancel.addEventListener("click", () => {
			this.open = false;
		});
	}

	disconnectedCallback() {}
}

if (!customElements.get("xy-popconfirm")) {
	customElements.define("xy-popconfirm", XyPopConfirm);
}

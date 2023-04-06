import Base from "../xy-base.js";
import "../icon/index.js";
import "../loading/index.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Dialog extends Base {
	#dialog;
  #title;
  #btnClose;
  #btnCancel;
  #btnSubmit;

	static get observedAttributes() {
		return ["loading", "open", "title", "canceltext", "submittext"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
      <dialog class="dialog" id="dialog" part="dialog">
        <slot class="icon" name="icon"></slot>
        <form class="form" method="dialog">
          <xy-button id="btnClose" class="close" type="flat">
            <xy-icon></xy-icon>
          </xy-button>
          <h4 class="title" id="title" part="title">dialog</h4>
          <slot class="content"></slot>
          <slot class="footer" name="footer" part="footer">
            <xy-button id="btnCancel" type="flat">取消</xy-button>
            <xy-button id="btnSubmit" type="primary">确定</xy-button>
          </slot>
        </form>
      </dialog>
        `;
		this.#dialog = shadowRoot.getElementById("dialog");
		this.#title = shadowRoot.getElementById("title");
		this.#btnClose = shadowRoot.getElementById("btnClose");
		this.#btnCancel = shadowRoot.getElementById("btnCancel");
		this.#btnSubmit = shadowRoot.getElementById("btnSubmit");
	}

	get open() {
		return this.getAttribute("open") !== null;
	}

  get loading() {
    return this.getAttribute("loading") !== null;
  }

	get submittext() {
		return this.getAttribute("submittext") || "确认";
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

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }

	connectedCallback() {
    this.#btnClose.addEventListener('click', () => {
      this.open = false
      this.dispatchEvent(new Event("cancel"));
    })
    this.#dialog.addEventListener('close', () => {
      this.dispatchEvent(new Event("close"));
      console.log('close')
    })
    this.#dialog.addEventListener('cancel', () => {
      this.dispatchEvent(new Event("cancel"));
      console.log('cancel')
    })
    if (this.#btnCancel) {
      this.#btnCancel.addEventListener('click', () => {
        this.open = false
        this.dispatchEvent(new Event("cancel"));
      })
    }
    if (this.#btnSubmit) {
      this.#btnSubmit.addEventListener('click', () => {
        this.dispatchEvent(new Event("submit"));
      })
    }
	}

	attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      if (newValue !== null) {
        this.#dialog.showModal()
        this.#btnClose.focus()
      } else {
        this.#dialog.close()
        this.loading = false
      }
    }
    if (name === "title") {
			this.#title.textContent = newValue
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

if (!customElements.get("xy-dialog")) {
	customElements.define("xy-dialog", Dialog);
}


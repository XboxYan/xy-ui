import Base from "../xy-base.js";
import "../icon/index.js";
import "../loading/index.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Dialog extends Base {
	#dialog;
  #title;
  #content;
  #btnClose;
  #btnCancel;
  #btnSubmit;

  static open;
	static show;
	static alert;
	static success;
	static info;
	static warning;
	static error;
	static confirm;

	static get observedAttributes() {
		return ["loading", "open", "title", "content", "canceltext", "submittext"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `
      <dialog class="dialog" id="dialog" part="dialog">
        <slot class="icon" name="icon" id="icon"></slot>
        <form class="form" method="dialog">
          <xy-button id="btnClose" class="close" close type="flat">
            <xy-icon></xy-icon>
          </xy-button>
          <h4 class="title" id="title" part="title">dialog</h4>
          <slot id="content" class="content"></slot>
          <slot class="footer" name="footer" part="footer">
            <xy-button id="btnCancel" type="flat" close>取消</xy-button>
            <xy-button id="btnSubmit" type="primary">确定</xy-button>
          </slot>
        </form>
      </dialog>
        `;
		this.#dialog = shadowRoot.getElementById("dialog");
		this.#title = shadowRoot.getElementById("title");
    this.#content = shadowRoot.querySelector("#content");
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

  get content() {
		return this.getAttribute("content") || "";
	}

	set content(value) {
		this.setAttribute("content", value);
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

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }

	connectedCallback() {
    this.#dialog.addEventListener('click', (ev) => {
      if (ev.target.closest('[close]')){
        this.open = false
        this.dispatchEvent(new Event("cancel"));
      }
    })
    this.#dialog.addEventListener('close', () => {
      this.open = false
      this.dispatchEvent(new Event("close"));
      console.log('close')
    })
    this.#dialog.addEventListener('cancel', () => {
      this.open = false
      this.dispatchEvent(new Event("cancel"));
      console.log('cancel')
    })
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
        setTimeout(() => {
          this.#btnClose.focus()
        }, 50);
      } else {
        this.#dialog.close()
        this.loading = false
      }
    }
    if (name === "title") {
			this.#title.textContent = newValue
		}
    if (name === "content") {
			this.#content.textContent = newValue;
		}
    if (name === "canceltext" && this.#btnCancel) {
			this.#btnCancel.textContent = newValue;
		}
		if (name === "submittext" && this.#btnSubmit) {
			this.#btnSubmit.textContent = newValue;
		}
    if (name === "loading" && this.#btnSubmit) {
			this.#btnSubmit.loading = newValue!==null;
		}
	}
}

if (!customElements.get("xy-dialog")) {
	customElements.define("xy-dialog", Dialog);
}

// 静态方法
Dialog.open = function({
  type, 
  title, 
  content, 
  submittext, 
  canceltext = '取消', 
  onsubmit = () => {}, 
  oncancel = () => {}
}) {
  const typeMap = {
		alert: {
			name: "solid/triangle-exclamation",
			color: "var(--waring-color, #faad14)",
		},
		confirm: {
			name: "solid/circle-question",
			color: "var(--waring-color, #faad14)",
		},
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
	const dialog = new this();
  dialog.title = title;
  dialog.content = content;
  dialog.canceltext = canceltext;
	dialog.shadowRoot.getElementById("icon").innerHTML = `
  <xy-icon name="${typeMap[type].name}" color="${typeMap[type].color}"></xy-icon>
  `;
  if (type !== 'confirm') {
    dialog.shadowRoot.getElementById("btnSubmit").toggleAttribute('close', true)
    dialog.shadowRoot.getElementById("btnCancel").remove();
    dialog.submittext = submittext || '知道了';
  } else {
    dialog.submittext = submittext || '确定';
  }
  dialog.addEventListener('cancel', oncancel);
  dialog.addEventListener('close', dialog.remove);
  dialog.addEventListener('submit', onsubmit);
  document.body.append(dialog);
  dialog.clientWidth;
  dialog.open = true;
	return dialog;
}

Dialog.show = function(type, ...params) {
  console.log(params[0])
  if (typeof params[0] === 'object') {
    return this.open({
      type,
      ...params[0]
    })
  } 
  // 简写语法
  const [
    content, 
    onsubmit = () => {}, 
    oncancel = () => {}
  ] = params
  return this.open({
    type, 
    title:type,
    content,
    onsubmit, 
    oncancel
  })
}

Dialog.alert = function(...params) {
  return this.show('alert', ...params)
}

Dialog.success = function(...params) {
  return this.show('success', ...params)
}

Dialog.info = function(...params) {
  return this.show('info', ...params)
}

Dialog.warning = function(...params) {
  return this.show('warning', ...params)
}

Dialog.confirm = function(...params) {
  return this.show('confirm', ...params)
}

Dialog.error = function(...params) {
  return this.show('error', ...params)
}
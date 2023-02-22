import Base from "../xy-base";
import style from "./index.css?inline" assert { type: "css" };

export class Tips extends Base {
	constructor(trigger, option) {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
		shadowRoot.innerHTML = `<slot></slot>`;
		this.init(trigger, option);
	}

	set tips(value) {
		this.textContent = value;
	}

	set dir(value) {
		this.setAttribute("dir", value);
	}

	set show(value) {
		this.toggleAttribute("show", value);
	}

  set open(value) {
		this.toggleAttribute("open", value);
	}

  set type(value) {
		this.setAttribute("type", value);
	}

  set color(value) {
		this.style.setProperty('--tips-bg', value);
	}

	getNode(trigger) {
		let node = trigger;
		while (node.shadowRoot) {
			node = node.shadowRoot.firstElementChild;
		}
		return node;
	}

	render(node) {
		if (!this.isConnected) {
			document.body.append(this);
      this.clientWidth;
		}
    node && this.setPosition(node)
	}

  // 设置tips位置
  setPosition(node) {
    const { left, top, right, bottom } = node.getBoundingClientRect();
    this.style.setProperty("--left", parseInt(left + window.pageXOffset));
    this.style.setProperty("--top", parseInt(top + window.pageYOffset));
    this.style.setProperty("--right", parseInt(right + window.pageXOffset));
    this.style.setProperty("--bottom", parseInt(bottom + window.pageYOffset));
  }

  // 监听trigger元素出现
  observer(node) {
    const observer = new IntersectionObserver(ioes => {
      ioes.forEach(ioe => {
          const el = ioe.target;
          const intersectionRatio = ioe.intersectionRatio;
          if (intersectionRatio > 0 && intersectionRatio <= 1) {
              this.setPosition(node)
              observer.unobserve(el);
          }
      })
  })
    observer.observe(node);
  }

  // 初始化
	init(trigger, option) {
    const node = this.getNode(trigger)
    Object.keys(option).forEach(el => {
      if (option[el]) {
        this[el] = option[el];
      }
    })
    if (option.open) {
      this.observer(node)
      this.render();
    }
		trigger.addEventListener("mouseenter", () => {
      this._inTrigger = true
      this._timer && clearTimeout(this._timer)
      this._timer = setTimeout(() => {
        if (this._inTrigger) {
          this.render(node);
          this.show = true;
        }
      }, 200)
		});
		trigger.addEventListener("focus", () => {
			this.render(node);
			this._focus = true;
			this.show = true;
		});
		trigger.addEventListener("mouseleave", (ev) => {
      this._inTrigger = false
			if (!this._focus) {
				this.show = false;
			}
		});
		trigger.addEventListener("blur", (ev) => {
			this._focus = false;
			this.show = false;
		});
	}

	connectedCallback() {}
}

/*
new Tips('el, {
  tips : 'xxx',
  dir : 'top',
})
*/

if (!customElements.get("xy-tip")) {
	customElements.define("xy-tip", Tips);
}

export default class XyTips extends Base {
	static get observedAttributes() {
		return ["color", "tips", "type", "open", "dir"];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.innerHTML = `
      <style>
      :host{
        display: contents;
      }
      </style>
      <slot></slot>
      `;
	}

	get tips() {
		return this.getAttribute("tips") || "";
	}

	get color() {
		return this.getAttribute("color") || "";
	}

	get dir() {
		return this.getAttribute("dir") || "top";
	}

	get type() {
		return this.getAttribute("type");
	}

	get open() {
		return this.getAttribute("open") !== null;
	}

	set tips(value) {
		this.setAttribute("tips", value);
	}

	set color(value) {
		this.setAttribute("color", value);
	}

	set dir(value) {
		this.setAttribute("dir", value);
	}

	set open(value) {
		this.toggleAttribute("open", value);
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	connectedCallback() {
		this.tipEl = new Tips(this.firstElementChild, {
			tips: this.tips,
			dir: this.dir,
      color: this.color,
      type: this.type,
      open: this.open
		});
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (!this.tipEl) return;
    this.tipEl[name] = this[name]
	}
}

if (!customElements.get("xy-tips")) {
	customElements.define("xy-tips", XyTips);
}

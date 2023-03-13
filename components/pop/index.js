import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Pop extends Base {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
	}

	set dir(value) {
		this.setAttribute("dir", value);
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	get auto() {
		return this.getAttribute("auto") !== null;
	}

	set auto(value) {
		this.toggleAttribute("auto", value);
	}

	get open() {
		return this.getAttribute("open") !== null;
	}

	set open(value) {
		if (value) {
			this.setPosition(this.node);
		}
		this.toggleAttribute("open", value);
	}

	set offset(value) {
		const [x, y] = value.split(",");
		this.style.setProperty("--offset-x", x);
		this.style.setProperty("--offset-y", y);
	}

	getNode(triggerEl) {
		let node = triggerEl;
		if (!node) {
			return null;
		}
		while (node.shadowRoot && !node.offsetWidth) {
			node = node.shadowRoot.firstElementChild;
		}
		return node;
	}

	render(node) {
		if (!this.isConnected) {
			document.body.append(this);
			this.clientWidth;
		}
		node && this.setPosition(node);
	}

	// 设置tips位置
	setPosition(node) {
		const { left, top, right, bottom } = node.getBoundingClientRect();
		this.style.setProperty("--left", parseInt(left + window.pageXOffset));
		this.style.setProperty("--top", parseInt(top + window.pageYOffset));
		this.style.setProperty("--right", parseInt(right + window.pageXOffset));
		this.style.setProperty("--bottom", parseInt(bottom + window.pageYOffset));
		if (this.auto) {
			// 自动识别位置
			const w = window.innerWidth;
			const h = window.innerHeight;
			const BOUND = {
				w: this.offsetWidth + 10,
				h: this.offsetHeight + 10,
			};
			if (top < BOUND.h && (left < BOUND.w || w - right < BOUND.w)) {
				this.dir = "bottom";
				return;
			}
			if (h - bottom < BOUND.h && (left < BOUND.w || w - right < BOUND.w)) {
				this.dir = "top";
				return;
			}
			if (left < BOUND.w && (top < BOUND.h || h - bottom < BOUND.h)) {
				this.dir = "right";
				return;
			}
			if (w - right < BOUND.w && (top < BOUND.h || h - bottom < BOUND.h)) {
				this.dir = "left";
				return;
			}
		}
	}

	// 监听triggerEl元素出现
	observer(node) {
		const observer = new IntersectionObserver((ioes) => {
			ioes.forEach((ioe) => {
				const el = ioe.target;
				const intersectionRatio = ioe.intersectionRatio;
				if (intersectionRatio > 0 && intersectionRatio <= 1) {
					this.setPosition(node);
					observer.unobserve(el);
				}
			});
		});
		observer.observe(node);
	}

	// 监听删除
	disconnect(node) {
		// xy包裹的元素不用监听
		if (node.parentNode.tagName.startsWith("XY-")) return;
		const observerOptions = {
			childList: true,
			subtree: true,
			characterData: false,
		};
		const observer = new MutationObserver((ioes) => {
			ioes.forEach((ioe) => {
				if (ioe?.removedNodes) {
					if ([...ioe.removedNodes].some((el) => el.contains(node))) {
						// console.log('移除了')
						this.remove();
					}
				}
			});
		});
		observer.observe(document.body, observerOptions);
	}

	// 初始化
	init(triggerEl, option) {
		if (!triggerEl) return;
		this.disconnect(triggerEl);
		const node = this.getNode(triggerEl);
		this.node = node;
		Object.keys(option).forEach((el) => {
			if (option[el]) {
				this[el] = option[el];
			}
		});
		if (option.dir === "auto") {
			this.auto = true;
			this.dir = "top";
		}
		if (
			option.open ||
			option.trigger === "none" ||
			option.trigger?.includes("none")
		) {
			// 如果有 open 属性控制，或者 trigger 为 none，那么不再通过 triggerEl 触发
			this.observer(node);
			this.render();
			return;
		}
		// hover
		if (option.trigger.includes("hover")) {
			triggerEl.addEventListener("mouseenter", () => {
				if (this.disabled || this.open) return;
				this._hover = true;
				this._timer && clearTimeout(this._timer);
				this._timer = setTimeout(() => {
					this.render(node);
					this.open = true;
				}, 200);
			});
			triggerEl.addEventListener("mouseleave", (ev) => {
				// 是否处于hover
				if (this._hover) {
					this._hover = false;
					this.open = false;
				}
				this._timer && clearTimeout(this._timer);
			});
		}
		if (option.trigger.includes("focus")) {
			triggerEl.addEventListener("focus", () => {
				if (this.disabled) return;
				this.render(node);
				this.open = true;
			});
			triggerEl.addEventListener("blur", (ev) => {
				this.open = false;
			});
		}
		if (option.trigger.includes("click")) {
			document.addEventListener("click", (ev) => {
				if (this.disabled) return;
				if (triggerEl.contains(ev.target) || this.contains(ev.target)) {
					if (!this.open) {
						this.render(node);
						this.open = true;
					}
				} else {
					this.open = false;
				}
			});
		}
	}
}

/*
new Pop('el, {
  tips : 'xxx',
  dir : 'top',
  trigger: ['hover','focus','click','contextmenu']
})
*/

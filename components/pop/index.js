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
    const auto = this.getAttribute("auto");
		return auto?auto.split(','):[];
	}

	set auto(value) {
		this.setAttribute("auto", value);
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

	getNode(target) {
		let node = target;
		if (!node) {
			return null;
		}
		while (node.shadowRoot && !node.offsetWidth) {
			node = node.shadowRoot.firstElementChild;
		}
		return node;
	}

	render(node) {
		if (!this.isConnected || this.parentNode !== document.body) {
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
		if (this.auto.length) {
			// 自动识别位置
			const w = window.innerWidth;
			const h = window.innerHeight;
			const BOUND = {
				w: this.offsetWidth + 10,
				h: this.offsetHeight + 10,
			};
      const otherdir = this.auto[1];
			if (top < BOUND.h && ['bottom','BL','BR'].includes(otherdir)) {
        this.dir = otherdir;
				return;
			}
			if (h - bottom < BOUND.h  && ['top','TL','TR'].includes(otherdir)) {
				this.dir = otherdir;
				return;
			}
			if (left < BOUND.w && ['right','RT','RB'].includes(otherdir)) {
				this.dir = otherdir;
				return;
			}
			if (w - right < BOUND.w  && ['left','LT','LB'].includes(otherdir)) {
				this.dir = otherdir;
				return;
			}
		}
	}

	// 监听target元素出现
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
	init(target, option) {
		if (!target) return;
		this.disconnect(target);
		const node = this.getNode(target);
		this.node = node;
		Object.keys(option).forEach((el) => {
			if (option[el]) {
				this[el] = option[el];
			}
		});
		if (option.dir.includes(',')) {
			this.auto = option.dir;
			this.dir = option.dir.split(',')[0];
		}
		if (
			option.open ||
			option.trigger === "none" ||
			option.trigger?.includes("none")
		) {
			// 如果有 open 属性控制，或者 trigger 为 none，那么不再通过 target 触发
			this.observer(node);
			this.render();
			return;
		}
		// hover
		if (option.trigger.includes("hover")) {
			target.addEventListener("mouseenter", () => {
				if (this.disabled || this.open) return;
				this._hover = true;
				this._timer && clearTimeout(this._timer);
				this._timer = setTimeout(() => {
					this.render();
					this.open = true;
				}, 200);
			});
			target.addEventListener("mouseleave", (ev) => {
				// 是否处于hover
				if (this._hover) {
					this._hover = false;
					this.open = false;
				}
				this._timer && clearTimeout(this._timer);
			});
		}
		if (option.trigger.includes("focus")) {
			target.addEventListener("focus", () => {
				if (this.disabled) return;
				this.render();
				this.open = true;
			});
			target.addEventListener("blur", (ev) => {
				this.open = false;
			});
		}
		if (option.trigger.includes("click")) {
			document.addEventListener("click", (ev) => {
				if (this.disabled) return;
				if (target.contains(ev.target) || this.contains(ev.target)) {
					if (!this.open) {
						this.render();
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

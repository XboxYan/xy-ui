import Base from "../xy-base.js";
import style from "./index.css?inline" assert { type: "css" };

export default class Pop extends Base {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.adoptedStyle(style);
	}

  get dir() {
		return this.getAttribute("dir") || "BL,TL";
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

  get trigger() {
		return this.getAttribute("trigger") || "hover,focus";
	}

  set trigger(value) {
    this.setAttribute("trigger", value)
  }

	set open(value) {
		if (value) {
			this.setPosition();
		}
    this.toggleAttribute("open", value);
	}

	set offset(value) {
		const [x, y] = value.split(",");
		this.style.setProperty("--offset-x", x);
		this.style.setProperty("--offset-y", y);
	}

  get node() {
    return this.getNode(this.target)
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

	render() {
		if (!this.isConnected || this.parentNode !== document.body) {
			document.body.append(this);
			this.clientWidth;
		}
	}

	// 设置tips位置
	setPosition() {
    if (this.trigger?.includes('contextmenu')) return
		const { left, top, right, bottom } = this.node.getBoundingClientRect();
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
			if (top < BOUND.h) {
        const dir = ['bottom','BL','BR'].find(el => this.auto.includes(el));
        dir && (this.dir = dir);
				return;
			}
			if (h - bottom < BOUND.h) {
				const dir = ['top','TL','TR'].find(el => this.auto.includes(el));
        dir && (this.dir = dir);
				return;
			}
			if (left < BOUND.w) {
				const dir = ['right','RT','RB'].find(el => this.auto.includes(el));
        dir && (this.dir = dir);
				return;
			}
			if (w - right < BOUND.w) {
				const dir = ['left','LT','LB'].find(el => this.auto.includes(el));
        dir && (this.dir = dir);
				return;
			}
		}
	}

	// 监听target元素出现
	observer() {
		const observer = new IntersectionObserver((ioes) => {
			ioes.forEach((ioe) => {
				const el = ioe.target;
				const intersectionRatio = ioe.intersectionRatio;
				if (intersectionRatio > 0 && intersectionRatio <= 1) {
					this.setPosition();
					observer.unobserve(el);
				}
			});
		});
		observer.observe(this.node);
	}

	// 监听删除
	disconnect(target) {
		// xy包裹的元素不用监听
		if (target.parentNode.tagName.startsWith("XY-")) return;
		const observerOptions = {
			childList: true,
			subtree: true,
			characterData: false,
		};
		const observer = new MutationObserver((ioes) => {
			ioes.forEach((ioe) => {
				if (ioe?.removedNodes) {
					if ([...ioe.removedNodes].some((el) => el.contains(target))) {
						// console.log('移除了')
						this?.remove();
					}
				}
			});
		});
		observer.observe(document.body, observerOptions);
	}

	// 初始化
	init(target, option) {
		if (!target) return;
    this.target = target;
		this.disconnect(target);
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
			option.trigger?.includes("none")
		) {
			// 如果有 open 属性控制，或者 trigger 为 none，那么不再通过 target 触发
			this.observer();
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
          this.target = target;
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
        this.target = target;
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
            this.target = target;
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

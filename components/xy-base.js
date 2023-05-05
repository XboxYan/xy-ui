export default class Base extends HTMLElement {

  static urlPrefix = 'https://cdn.jsdelivr.net/gh/xboxyan/xy-ui-icons'

  constructor() {
		super();
	}

  #mounted = [];

  adoptedStyle (style, dom) {
    let styleSheet = style
    if (!style.type) {
      // vite会把style编译成成字符串
			styleSheet = new CSSStyleSheet();
			styleSheet.replace(style);
		}
    this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, styleSheet];
  }
  get name () {
    return this.getAttribute('name')
  }
  set name (value) {
    return this.setAttribute('name', value)
  }
  get attr () {
    const attrs = ['type', 'class']
    return [...this.attributes]
    .filter((el) => !el.name.startsWith("on") && !attrs.includes(el.name))
    .map((e) => e.name + "='" + (e.value || 'true')+"'").join(' ')
  }

  // slot元素渲染完成
  renderSlot() {
    if (!this.slots) {
      this.slots = [...this.shadowRoot.querySelectorAll('slot')]
    }
    if (!this.slots.length) return
    return new Promise((resolve) => {
      if (this.#mounted.length === this.slots.length) {
        resolve()
      } else {
        this.slots.forEach((el,i) => el.addEventListener("slotchange", () => {
          if (!this.#mounted[i]) {
            this.#mounted[i] = true
          }
          if (this.#mounted.length === this.slots.length) {
            setTimeout(resolve, 200);
          }
        }))
      }
    })
  }
}
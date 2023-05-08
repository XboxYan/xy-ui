export default class Base extends HTMLElement {

  static urlPrefix = 'https://cdn.jsdelivr.net/gh/xboxyan/xy-ui-icons'

  constructor() {
		super();
	}

  #mounted = false;

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
      if (this.#mounted) {
        resolve()
      } else {
        Promise.all(this.slots.map(el => new Promise((_resolve, reject) => {
          el.addEventListener("slotchange", () => {
            _resolve()
          })
        })))
        .then(() =>{
          console.log('slot加载完成')
          this.#mounted = true
          resolve()
        })
      }
    })
  }
}
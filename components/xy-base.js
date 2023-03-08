export default class extends HTMLElement {
  adoptedStyle (style) {
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
}
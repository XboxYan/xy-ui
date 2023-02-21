import Base from "../xy-base";
import style from "./index.css?inline" assert { type: "css" };

export default class XyTips extends HTMLElement {

  static get observedAttributes() { return ['color', 'title'] }

  constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      this.adoptedStyle(style);
      shadowRoot.innerHTML = `
      <slot></slot>
      `
  }

  get color() {
      return this.getAttribute('color')||'';
  }

  get dir() {
      return this.getAttribute('dir')||'top';
  }

  get tips() {
      return this.getAttribute('tips');
  }

  get type() {
      return this.getAttribute('tips');
  }
  
  get suffix() {
      return this.getAttribute('suffix')||'';
  }

  get prefix() {
      return this.getAttribute('prefix')||'';
  }

  get show() {
      return this.getAttribute('show')!==null;
  }

  set color(value) {
      this.setAttribute('color', value);
  }

  set dir(value) {
      this.setAttribute('dir', value);
  }

  set tips(value) {
      this.setAttribute('tips', value);
  }

  set suffix(value) {
      this.setAttribute('suffix', value);
  }

  set prefix(value) {
      this.setAttribute('prefix', value);
  }

  set show(value) {
      this.setAttribute('show', value);
  }

  set type(value) {
      this.setAttribute('type', value);
  }
  
  connectedCallback() {
      if( this.dir === 'auto' ){
          const { left,top,width,height } = this.getBoundingClientRect();
          const w = document.body.scrollWidth;
          const h = document.body.scrollHeight;
          const TIP_SIZE = 50;
          if( top < TIP_SIZE ){
              this.dir = 'bottom';
          }
          if( h-top-height < TIP_SIZE ){
              this.dir = 'top';
          }
          if( left < TIP_SIZE ){
              this.dir = 'right';
          }
          if( w-left-width < TIP_SIZE ){
              this.dir = 'left';
          }
      }
  }

  attributeChangedCallback (name, oldValue, newValue) {
      if( name == 'color' && this.shadowRoot){
          this.style.setProperty('--color',newValue);
      }
  }
}

if(!customElements.get('xy-tips')){
  customElements.define('xy-tips', XyTips);
}

// node_modules/@giscus/vue/dist/giscus-a53917f0.mjs
var x = window;
var q = x.ShadowRoot && (x.ShadyCSS === void 0 || x.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var J = Symbol();
var F = /* @__PURE__ */ new WeakMap();
var ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = true, s !== J)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
var $t = (i) => new ht(typeof i == "string" ? i : i + "", void 0, J);
var vt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === true)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[r + 1], i[0]);
  return new ht(e, i, J);
};
var _t = (i, t) => {
  q ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const s = document.createElement("style"), n = x.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  });
};
var Z = q ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return $t(e);
})(i) : i;
var D;
var H = window;
var Q = H.trustedTypes;
var gt = Q ? Q.emptyScript : "";
var X = H.reactiveElementPolyfillSupport;
var K = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? gt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} };
var at = (i, t) => t !== i && (t == t || i == i);
var Y = { attribute: true, type: String, converter: K, reflect: false, hasChanged: at };
var A = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, s) => {
      const n = this._$Ep(s, e);
      n !== void 0 && (this._$Ev.set(n, s), t.push(n));
    }), t;
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = false), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = typeof t == "symbol" ? Symbol() : "__" + t, n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Object.defineProperty(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return { get() {
      return this[e];
    }, set(n) {
      const r = this[t];
      this[e] = n, this.requestUpdate(t, r, s);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || Y;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, s = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const n of s)
        this.createProperty(n, e[n]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s)
        e.unshift(Z(n));
    } else
      t !== void 0 && e.push(Z(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return s === false ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) === null || s === void 0 || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return _t(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) === null || s === void 0 ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = Y) {
    var n;
    const r = this.constructor._$Ep(t, s);
    if (r !== void 0 && s.reflect === true) {
      const o = (((n = s.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== void 0 ? s.converter : K).toAttribute(e, s.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var s;
    const n = this.constructor, r = n._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = n.getPropertyOptions(r), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) === null || s === void 0 ? void 0 : s.fromAttribute) !== void 0 ? o.converter : K;
      this._$El = r, this[r] = c.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, s) {
    let n = true;
    t !== void 0 && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || at)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), s.reflect === true && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, s))) : n = false), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((n, r) => this[r] = n), this._$Ei = void 0);
    let e = false;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (t = this._$ES) === null || t === void 0 || t.forEach((n) => {
        var r;
        return (r = n.hostUpdate) === null || r === void 0 ? void 0 : r.call(n);
      }), this.update(s)) : this._$Ek();
    } catch (n) {
      throw e = false, this._$Ek(), n;
    }
    e && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
      var n;
      return (n = s.hostUpdated) === null || n === void 0 ? void 0 : n.call(s);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return true;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, s) => this._$EO(s, this[s], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.finalized = true, A.elementProperties = /* @__PURE__ */ new Map(), A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, X == null || X({ ReactiveElement: A }), ((D = H.reactiveElementVersions) !== null && D !== void 0 ? D : H.reactiveElementVersions = []).push("1.6.1");
var j;
var k = window;
var S = k.trustedTypes;
var tt = S ? S.createPolicy("lit-html", { createHTML: (i) => i }) : void 0;
var f = `lit$${(Math.random() + "").slice(9)}$`;
var ct = "?" + f;
var ft = `<${ct}>`;
var E = document;
var T = (i = "") => E.createComment(i);
var N = (i) => i === null || typeof i != "object" && typeof i != "function";
var dt = Array.isArray;
var mt = (i) => dt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function";
var w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var et = /-->/g;
var st = />/g;
var m = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var it = /'/g;
var nt = /"/g;
var ut = /^(?:script|style|textarea|title)$/i;
var At = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e });
var yt = At(1);
var b = Symbol.for("lit-noChange");
var u = Symbol.for("lit-nothing");
var rt = /* @__PURE__ */ new WeakMap();
var y = E.createTreeWalker(E, 129, null, false);
var St = (i, t) => {
  const e = i.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : "", o = w;
  for (let l = 0; l < e; l++) {
    const h = i[l];
    let g, a, d = -1, _ = 0;
    for (; _ < h.length && (o.lastIndex = _, a = o.exec(h), a !== null); )
      _ = o.lastIndex, o === w ? a[1] === "!--" ? o = et : a[1] !== void 0 ? o = st : a[2] !== void 0 ? (ut.test(a[2]) && (n = RegExp("</" + a[2], "g")), o = m) : a[3] !== void 0 && (o = m) : o === m ? a[0] === ">" ? (o = n ?? w, d = -1) : a[1] === void 0 ? d = -2 : (d = o.lastIndex - a[2].length, g = a[1], o = a[3] === void 0 ? m : a[3] === '"' ? nt : it) : o === nt || o === it ? o = m : o === et || o === st ? o = w : (o = m, n = void 0);
    const I = o === m && i[l + 1].startsWith("/>") ? " " : "";
    r += o === w ? h + ft : d >= 0 ? (s.push(g), h.slice(0, d) + "$lit$" + h.slice(d) + f + I) : h + f + (d === -2 ? (s.push(void 0), l) : I);
  }
  const c = r + (i[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [tt !== void 0 ? tt.createHTML(c) : c, s];
};
var P = class {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const c = t.length - 1, l = this.parts, [h, g] = St(t, e);
    if (this.el = P.createElement(h, s), y.currentNode = this.el.content, e === 2) {
      const a = this.el.content, d = a.firstChild;
      d.remove(), a.append(...d.childNodes);
    }
    for (; (n = y.nextNode()) !== null && l.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const a = [];
          for (const d of n.getAttributeNames())
            if (d.endsWith("$lit$") || d.startsWith(f)) {
              const _ = g[o++];
              if (a.push(d), _ !== void 0) {
                const I = n.getAttribute(_.toLowerCase() + "$lit$").split(f), M = /([.?@])?(.*)/.exec(_);
                l.push({ type: 1, index: r, name: M[2], strings: I, ctor: M[1] === "." ? bt : M[1] === "?" ? wt : M[1] === "@" ? Ut : z });
              } else
                l.push({ type: 6, index: r });
            }
          for (const d of a)
            n.removeAttribute(d);
        }
        if (ut.test(n.tagName)) {
          const a = n.textContent.split(f), d = a.length - 1;
          if (d > 0) {
            n.textContent = S ? S.emptyScript : "";
            for (let _ = 0; _ < d; _++)
              n.append(a[_], T()), y.nextNode(), l.push({ type: 2, index: ++r });
            n.append(a[d], T());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === ct)
          l.push({ type: 2, index: r });
        else {
          let a = -1;
          for (; (a = n.data.indexOf(f, a + 1)) !== -1; )
            l.push({ type: 7, index: r }), a += f.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement("template");
    return s.innerHTML = t, s;
  }
};
function C(i, t, e = i, s) {
  var n, r, o, c;
  if (t === b)
    return t;
  let l = s !== void 0 ? (n = e._$Co) === null || n === void 0 ? void 0 : n[s] : e._$Cl;
  const h = N(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, false), h === void 0 ? l = void 0 : (l = new h(i), l._$AT(i, e, s)), s !== void 0 ? ((o = (c = e)._$Co) !== null && o !== void 0 ? o : c._$Co = [])[s] = l : e._$Cl = l), l !== void 0 && (t = C(i, l._$AS(i, t.values), l, s)), t;
}
var Et = class {
  constructor(t, e) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const { el: { content: s }, parts: n } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : E).importNode(s, true);
    y.currentNode = r;
    let o = y.nextNode(), c = 0, l = 0, h = n[0];
    for (; h !== void 0; ) {
      if (c === h.index) {
        let g;
        h.type === 2 ? g = new R(o, o.nextSibling, this, t) : h.type === 1 ? g = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && (g = new Ot(o, this, t)), this.u.push(g), h = n[++l];
      }
      c !== (h == null ? void 0 : h.index) && (o = y.nextNode(), c++);
    }
    return r;
  }
  p(t) {
    let e = 0;
    for (const s of this.u)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
};
var R = class {
  constructor(t, e, s, n) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cm = (r = n == null ? void 0 : n.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), N(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== b && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : mt(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== u && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: s, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = P.createElement(n.h, this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.p(s);
    else {
      const o = new Et(r, this), c = o.v(this.options);
      o.p(s), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new P(t)), e;
  }
  k(t) {
    dt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const r of t)
      n === e.length ? e.push(s = new R(this.O(T()), this.O(T()), this, this.options)) : s = e[n], s._$AI(r), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, false, true, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cm = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
};
var z = class {
  constructor(t, e, s, n, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, n) {
    const r = this.strings;
    let o = false;
    if (r === void 0)
      t = C(this, t, e, 0), o = !N(t) || t !== this._$AH && t !== b, o && (this._$AH = t);
    else {
      const c = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = C(this, c[s + l], e, l), h === b && (h = this._$AH[l]), o || (o = !N(h) || h !== this._$AH[l]), h === u ? t = u : t !== u && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
var bt = class extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
};
var Ct = S ? S.emptyScript : "";
var wt = class extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, Ct) : this.element.removeAttribute(this.name);
  }
};
var Ut = class extends z {
  constructor(t, e, s, n, r) {
    super(t, e, s, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = C(this, t, e, 0)) !== null && s !== void 0 ? s : u) === b)
      return;
    const n = this._$AH, r = t === u && n !== u || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== u && (n === u || r);
    r && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
};
var Ot = class {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
};
var ot = k.litHtmlPolyfillSupport;
ot == null || ot(P, R), ((j = k.litHtmlVersions) !== null && j !== void 0 ? j : k.litHtmlVersions = []).push("2.6.1");
var Tt = (i, t, e) => {
  var s, n;
  const r = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const c = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    r._$litPart$ = o = new R(t.insertBefore(T(), c), c, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
var B;
var G;
var U = class extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = s.firstChild), s;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Tt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(true);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(false);
  }
  render() {
    return b;
  }
};
U.finalized = true, U._$litElement$ = true, (B = globalThis.litElementHydrateSupport) === null || B === void 0 || B.call(globalThis, { LitElement: U });
var lt = globalThis.litElementPolyfillSupport;
lt == null || lt({ LitElement: U });
((G = globalThis.litElementVersions) !== null && G !== void 0 ? G : globalThis.litElementVersions = []).push("3.2.2");
var Nt = (i) => (t) => typeof t == "function" ? ((e, s) => (customElements.define(e, s), s))(i, t) : ((e, s) => {
  const { kind: n, elements: r } = s;
  return { kind: n, elements: r, finisher(o) {
    customElements.define(e, o);
  } };
})(i, t);
var Pt = (i, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, i);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, i);
} };
function v(i) {
  return (t, e) => e !== void 0 ? ((s, n, r) => {
    n.constructor.createProperty(r, s);
  })(i, t, e) : Pt(i, t);
}
var W;
((W = window.HTMLSlotElement) === null || W === void 0 ? void 0 : W.prototype.assignedElements) != null;
var Rt = (i) => i.strings === void 0;
var It = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var Mt = (i) => (...t) => ({ _$litDirective$: i, values: t });
var xt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
var O = (i, t) => {
  var e, s;
  const n = i._$AN;
  if (n === void 0)
    return false;
  for (const r of n)
    (s = (e = r)._$AO) === null || s === void 0 || s.call(e, t, false), O(r, t);
  return true;
};
var L = (i) => {
  let t, e;
  do {
    if ((t = i._$AM) === void 0)
      break;
    e = t._$AN, e.delete(i), i = t;
  } while ((e == null ? void 0 : e.size) === 0);
};
var pt = (i) => {
  for (let t; t = i._$AM; i = t) {
    let e = t._$AN;
    if (e === void 0)
      t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(i))
      break;
    e.add(i), Lt(t);
  }
};
function Ht(i) {
  this._$AN !== void 0 ? (L(this), this._$AM = i, pt(this)) : this._$AM = i;
}
function kt(i, t = false, e = 0) {
  const s = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0)
    if (t)
      if (Array.isArray(s))
        for (let r = e; r < s.length; r++)
          O(s[r], false), L(s[r]);
      else
        s != null && (O(s, false), L(s));
    else
      O(this, i);
}
var Lt = (i) => {
  var t, e, s, n;
  i.type == It.CHILD && ((t = (s = i)._$AP) !== null && t !== void 0 || (s._$AP = kt), (e = (n = i)._$AQ) !== null && e !== void 0 || (n._$AQ = Ht));
};
var zt = class extends xt {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, s) {
    super._$AT(t, e, s), pt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = true) {
    var s, n;
    t !== this.isConnected && (this.isConnected = t, t ? (s = this.reconnected) === null || s === void 0 || s.call(this) : (n = this.disconnected) === null || n === void 0 || n.call(this)), e && (O(this, t), L(this));
  }
  setValue(t) {
    if (Rt(this._$Ct))
      this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};
var Dt = () => new Yt();
var Yt = class {
};
var V = /* @__PURE__ */ new WeakMap();
var jt = Mt(class extends zt {
  render(i) {
    return u;
  }
  update(i, [t]) {
    var e;
    const s = t !== this.Y;
    return s && this.Y !== void 0 && this.rt(void 0), (s || this.lt !== this.ct) && (this.Y = t, this.dt = (e = i.options) === null || e === void 0 ? void 0 : e.host, this.rt(this.ct = i.element)), u;
  }
  rt(i) {
    var t;
    if (typeof this.Y == "function") {
      const e = (t = this.dt) !== null && t !== void 0 ? t : globalThis;
      let s = V.get(e);
      s === void 0 && (s = /* @__PURE__ */ new WeakMap(), V.set(e, s)), s.get(this.Y) !== void 0 && this.Y.call(this.dt, void 0), s.set(this.Y, i), i !== void 0 && this.Y.call(this.dt, i);
    } else
      this.Y.value = i;
  }
  get lt() {
    var i, t, e;
    return typeof this.Y == "function" ? (t = V.get((i = this.dt) !== null && i !== void 0 ? i : globalThis)) === null || t === void 0 ? void 0 : t.get(this.Y) : (e = this.Y) === null || e === void 0 ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
var Bt = Object.defineProperty;
var Gt = Object.getOwnPropertyDescriptor;
var $ = (i, t, e, s) => {
  for (var n = s > 1 ? void 0 : s ? Gt(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (n = (s ? o(t, e, n) : o(n)) || n);
  return s && n && Bt(t, e, n), n;
};
var p = class extends U {
  constructor() {
    super(), this.GISCUS_SESSION_KEY = "giscus-session", this.GISCUS_DEFAULT_HOST = "https://giscus.app", this.ERROR_SUGGESTION = "Please consider reporting this error at https://github.com/giscus/giscus/issues/new.", this.__session = "", this._iframeRef = Dt(), this.messageEventHandler = this.handleMessageEvent.bind(this), this.hasLoaded = false, this.host = this.GISCUS_DEFAULT_HOST, this.strict = "0", this.reactionsEnabled = "1", this.emitMetadata = "0", this.inputPosition = "bottom", this.theme = "light", this.lang = "en", this.loading = "eager", this.setupSession(), window.addEventListener("message", this.messageEventHandler);
  }
  get iframeRef() {
    var i;
    return (i = this._iframeRef) == null ? void 0 : i.value;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("message", this.messageEventHandler);
  }
  _formatError(i) {
    return `[giscus] An error occurred. Error message: "${i}".`;
  }
  setupSession() {
    const i = location.href, t = new URL(i), e = localStorage.getItem(this.GISCUS_SESSION_KEY), s = t.searchParams.get("giscus") || "";
    if (this.__session = "", s) {
      localStorage.setItem(this.GISCUS_SESSION_KEY, JSON.stringify(s)), this.__session = s, t.searchParams.delete("giscus"), t.hash = "", history.replaceState(void 0, document.title, t.toString());
      return;
    }
    if (e)
      try {
        this.__session = JSON.parse(e);
      } catch (n) {
        localStorage.removeItem(this.GISCUS_SESSION_KEY), console.warn(
          `${this._formatError(n == null ? void 0 : n.message)} Session has been cleared.`
        );
      }
  }
  signOut() {
    localStorage.removeItem(this.GISCUS_SESSION_KEY), this.__session = "", this.update(/* @__PURE__ */ new Map());
  }
  handleMessageEvent(i) {
    if (i.origin !== this.host)
      return;
    const { data: t } = i;
    if (!(typeof t == "object" && t.giscus))
      return;
    if (this.iframeRef && t.giscus.resizeHeight && (this.iframeRef.style.height = `${t.giscus.resizeHeight}px`), t.giscus.signOut) {
      console.log("[giscus] User has logged out. Session has been cleared."), this.signOut();
      return;
    }
    if (!t.giscus.error)
      return;
    const e = t.giscus.error;
    if (e.includes("Bad credentials") || e.includes("Invalid state value") || e.includes("State has expired")) {
      if (localStorage.getItem(this.GISCUS_SESSION_KEY) !== null) {
        console.warn(`${this._formatError(e)} Session has been cleared.`), this.signOut();
        return;
      }
      console.error(
        `${this._formatError(e)} No session is stored initially. ${this.ERROR_SUGGESTION}`
      );
    }
    if (e.includes("Discussion not found")) {
      console.warn(
        `[giscus] ${e}. A new discussion will be created if a comment/reaction is submitted.`
      );
      return;
    }
    console.error(`${this._formatError(e)} ${this.ERROR_SUGGESTION}`);
  }
  sendMessage(i) {
    !this.iframeRef || !this.iframeRef.contentWindow || !this.hasLoaded || this.iframeRef.contentWindow.postMessage({ giscus: i }, this.host);
  }
  updateConfig() {
    const i = {
      setConfig: {
        repo: this.repo,
        repoId: this.repoId,
        category: this.category,
        categoryId: this.categoryId,
        term: this.getTerm(),
        number: +this.getNumber(),
        strict: this.strict === "1",
        reactionsEnabled: this.reactionsEnabled === "1",
        emitMetadata: this.emitMetadata === "1",
        inputPosition: this.inputPosition,
        theme: this.theme,
        lang: this.lang
      }
    };
    this.sendMessage(i);
  }
  firstUpdated() {
    var i;
    (i = this.iframeRef) == null || i.addEventListener("load", () => {
      var t;
      (t = this.iframeRef) == null || t.classList.remove("loading"), this.hasLoaded = true, this.updateConfig();
    });
  }
  requestUpdate(i, t, e) {
    if (!this.hasUpdated || i === "host") {
      super.requestUpdate(i, t, e);
      return;
    }
    this.updateConfig();
  }
  getMetaContent(i, t = false) {
    const e = t ? `meta[property='og:${i}'],` : "", s = document.querySelector(
      e + `meta[name='${i}']`
    );
    return s ? s.content : "";
  }
  _getCleanedUrl() {
    const i = new URL(location.href);
    return i.searchParams.delete("giscus"), i.hash = "", i;
  }
  getTerm() {
    switch (this.mapping) {
      case "url":
        return `${this._getCleanedUrl()}`;
      case "title":
        return document.title;
      case "og:title":
        return this.getMetaContent("title", true);
      case "specific":
        return this.term || "";
      case "number":
        return "";
      case "pathname":
      default:
        return location.pathname.length < 2 ? "index" : location.pathname.substring(1).replace(/\.\w+$/, "");
    }
  }
  getNumber() {
    return this.mapping === "number" && this.term || "";
  }
  getIframeSrc() {
    const i = this._getCleanedUrl().toString(), t = `${i}${this.id ? "#" + this.id : ""}`, e = this.getMetaContent("description", true), s = this.getMetaContent("giscus:backlink") || i, n = {
      origin: t,
      session: this.__session,
      repo: this.repo,
      repoId: this.repoId || "",
      category: this.category || "",
      categoryId: this.categoryId || "",
      term: this.getTerm(),
      number: this.getNumber(),
      strict: this.strict,
      reactionsEnabled: this.reactionsEnabled,
      emitMetadata: this.emitMetadata,
      inputPosition: this.inputPosition,
      theme: this.theme,
      description: e,
      backLink: s
    }, r = this.host || this.GISCUS_DEFAULT_HOST, o = this.lang ? `/${this.lang}` : "", c = new URLSearchParams(n);
    return `${r}${o}/widget?${c}`;
  }
  render() {
    return yt`
      <iframe
        title="Comments"
        scrolling="no"
        class="loading"
        ${jt(this._iframeRef)}
        src=${this.getIframeSrc()}
        loading=${this.loading}
        allow="clipboard-write"
        part="iframe"
      ></iframe>
    `;
  }
};
p.styles = vt`
    :host,
    iframe {
      width: 100%;
      border: none;
      min-height: 150px;
      color-scheme: light dark;
    }

    iframe.loading {
      opacity: 0;
    }
  `;
$([
  v({ reflect: true })
], p.prototype, "host", 2);
$([
  v({ reflect: true })
], p.prototype, "repo", 2);
$([
  v({ reflect: true })
], p.prototype, "repoId", 2);
$([
  v({ reflect: true })
], p.prototype, "category", 2);
$([
  v({ reflect: true })
], p.prototype, "categoryId", 2);
$([
  v({ reflect: true })
], p.prototype, "mapping", 2);
$([
  v({ reflect: true })
], p.prototype, "term", 2);
$([
  v({ reflect: true })
], p.prototype, "strict", 2);
$([
  v({ reflect: true })
], p.prototype, "reactionsEnabled", 2);
$([
  v({ reflect: true })
], p.prototype, "emitMetadata", 2);
$([
  v({ reflect: true })
], p.prototype, "inputPosition", 2);
$([
  v({ reflect: true })
], p.prototype, "theme", 2);
$([
  v({ reflect: true })
], p.prototype, "lang", 2);
$([
  v({ reflect: true })
], p.prototype, "loading", 2);
p = $([
  Nt("giscus-widget")
], p);
export {
  p as GiscusWidget
};
/*! Bundled license information:

@giscus/vue/dist/giscus-a53917f0.mjs:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=giscus-a53917f0-JJCRCOKM.js.map

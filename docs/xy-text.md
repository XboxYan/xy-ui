# xy-text

文本，集成了常见的几种状态。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-text.js';
</script>
<!-- 使用 -->
<xy-text>text</xy-text>
```

内部仅仅集成了部分`css`样式，可随意嵌套，如果不满足完全可以通过`css`自定义。

## 类型`type`

内置不同类型的文本，也就是颜色的区别。

<xy-text>normal</xy-text>

<xy-text type="warning">warning</xy-text>

<xy-text type="error">error</xy-text>

<xy-text type="success">success</xy-text>

```html
<xy-text>normal</xy-text>
<xy-text type="warning">warning</xy-text>
<xy-text type="error">error</xy-text>
<xy-text type="success">success</xy-text>
```

## 行数`rows`

可以设置行数`rows`，超出部分会出现省略号

<xy-slider type="number" min="1" max="10" defaultvalue="3" showtips oninput="this.nextElementSibling.rows=this.value"></xy-slider>
<xy-text rows="3">xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.xy-ui is a front end cross-framework ui library based on web-components.</xy-text>


```html
<xy-text rows="3">a front end cross-framework ui library based on web-components.</xy-text>
```

JavaScript操作`get`、`set`

```js
text.rows;//获取
text.rows = 5;
//原生属性操作
text.getAttribute('rows');
text.setAttribute('rows',5);
```

## 其他

其他还内置了`mark`、`code`属性

<xy-text mark>mark</xy-text>

<xy-text code>code</xy-text>

```html
<xy-text mark>mark</xy-text>
<xy-text code>code</xy-text>
```

<xy-text><xy-text mark>跨框架</xy-text>。无论是<xy-text code>react</xy-text>、<xy-text code>vue</xy-text>还是原生项目均可使用。</xy-text>

<xy-text><xy-text mark>组件化</xy-text>。<xy-text code>shadow dom</xy-text>真正意义上实现了样式和功能的组件化。</xy-text>

```html
<xy-text>
    <xy-text mark>跨框架</xy-text>。无论是<xy-text code>react</xy-text>、<xy-text code>vue</xy-text>还是原生项目均可使用。
</xy-text>
<xy-text>
    <xy-text mark>组件化</xy-text>。<xy-text code>shadow dom</xy-text>真正意义上实现了样式和功能的组件化。
</xy-text>
```

<script setup>
import { onMounted } from 'vue'
  import './index.css'
  onMounted(() => {
    import('../../components/button/')
    import('../../components/button-group/')
    import('../../components/checkbox/')
    import('../../components/switch/')
    import('../../components/radio-group/')
    import('../../components/icon/')
  })
</script>
# button 

按钮。用于替代原生`button`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/button/index.js';
    import '../components/button-group/index.js';
</script>
<!-- 使用 -->
<xy-button>button</xy-button>
```

## 风格`type`

按钮有5种风格，分别为`primary`，`dashed`，`flat`，`link`和默认。

<div class="wrap">
  <xy-button type="primary" id="btn">primary</xy-button>
  <xy-button type="dashed">dashed</xy-button>
  <xy-button type="flat">flat</xy-button>
  <xy-button type="link">link</xy-button>
  <xy-button>default</xy-button>
</div>

```html
<xy-button type="primary">primary</xy-button>
<xy-button type="dashed">dashed</xy-button>
<xy-button type="flat">flat</xy-button>
<xy-button type="link">link</xy-button>
<xy-button>default</xy-button>
```

## 危险按钮`danger`

添加`danger`属性可以变成红色

<div class="wrap">
  <xy-button type="primary" danger>primary</xy-button>
  <xy-button type="dashed" danger>dashed</xy-button>
  <xy-button type="flat" danger>flat</xy-button>
  <xy-button type="link" danger>link</xy-button>
  <xy-button danger>default</xy-button>
</div>

```html
<xy-button type="primary" danger>primary</xy-button>
<xy-button type="dashed" danger>dashed</xy-button>
<xy-button type="flat" danger>flat</xy-button>
<xy-button type="link" danger>link</xy-button>
<xy-button danger>default</xy-button>
```

## 幽灵按钮`ghost`

幽灵按钮将按钮的内容反色，常用在深色背景上。

<div class="wrap" dark>
  <xy-button type="primary" ghost>primary</xy-button>
  <xy-button type="dashed" ghost>dashed</xy-button>
  <xy-button type="flat" ghost>flat</xy-button>
  <xy-button type="link" ghost>link</xy-button>
  <xy-button ghost>default</xy-button>
</div>

```html
<xy-button type="primary" ghost>primary</xy-button>
<xy-button type="dashed" ghost>dashed</xy-button>
<xy-button type="flat" ghost>flat</xy-button>
<xy-button type="link" ghost>link</xy-button>
<xy-button ghost>default</xy-button>
```

## 尺寸`size`

按钮有大、中、小三种尺寸，分别为`large`、`default`（默认）、`small`。

<xy-radio-group name="size" onchange="[...document.querySelectorAll('#sizebtns xy-button')].forEach(el => el.size=this.value)" value="default">
    <xy-radio>large</xy-radio>
    <xy-radio>default</xy-radio>
    <xy-radio>small</xy-radio>
</xy-radio-group>

<div class="wrap"  id="sizebtns">
    <xy-button type="primary">primary</xy-button>
    <xy-button type="dashed">dashed</xy-button>
    <xy-button type="flat">flat</xy-button>
    <xy-button>default</xy-button>
</div>

```html
<xy-button type="primary" size="large">primary</xy-button>
<xy-button type="primary" size="small">primary</xy-button>
<xy-button type="primary">primary</xy-button>
```

## 链接`href`

当设置`href`属性时，`xy-button`内部会渲染成`a`标签。

<div class="wrap">
<xy-button type="primary" href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button type="dashed" href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button type="flat" href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button type="link" href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
</div>

```html
<xy-button href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
```

此外，还可以设置`download`、`target`和`rel`属性，同原生`a`标签。

<!-- <xy-img src="/img/Gokou Ruri.gif"></xy-img> -->

<xy-button href="/img/Gokou Ruri.gif" download="Gokou Ruri">download</xy-button>

```html
<xy-button href="/img/Gokou Ruri.gif" download="Gokou Ruri">download</xy-button>
```

## 禁用`disabled`

通过`disabled`可以禁用按钮，禁用后该按钮上的事件失效，`a`链接也会失效。

<xy-checkbox checked onchange="[...this.nextElementSibling.querySelectorAll('xy-button')].forEach(el => el.disabled = this.checked)">禁用</xy-checkbox>
<div class="wrap">
<xy-button disabled type="primary">primary</xy-button>
<xy-button disabled type="dashed">dashed</xy-button>
<xy-button disabled type="flat">flat</xy-button>
<xy-button disabled type="link">link</xy-button>
<xy-button disabled href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button disabled >default</xy-button>
</div>

```html
<xy-button disabled type="primary">primary</xy-button>
<xy-button disabled type="dashed">dashed</xy-button>
<xy-button disabled type="flat">flat</xy-button>
<xy-button disabled >default</xy-button>
```

JavaScript操作`get`、`set`

```js
btn.disabled;//获取
btn.disabled = false;
btn.disabled = true;
//原生属性操作
btn.getAttribute('disabled');
btn.setAttribute('disabled','');
btn.removeAttribute('disabled');
btn.toggleAttribute('disabled', [force]);
```

> 所有组件关于属性的获取和设置均类似，如下

```js
com.props;//获取
com.props = newProps;
//原生属性操作
com.setAttribute('props',newProps);
com.removeAttribute('props');
```

## 加载`loading`

添加`loading`属性即可让按钮处于加载状态，处于加载状态所有事件会被禁用，类似于`disabled`

<div class="wrap">
  <xy-button type="primary" loading>loading</xy-button>
  <xy-switch checked onchange="this.previousElementSibling.loading = this.checked;"></xy-switch>
</div>

```html
<xy-button type="primary" loading>loading</xy-button>
```

JavaScript操作`get`、`set`

```js
btn.loading;
btn.loading = false;
btn.loading = true;
//原生属性操作
btn.getAttribute('loading');
btn.setAttribute('loading','');
btn.removeAttribute('loading');
btn.toggleAttribute('loading', [force]);
```

## 图标`icon`

当需要在`xy-button`内嵌入`xy-icon`时，可以设置`icon`属性。

关于`xy-icon`的取值可以查看[`icon`](./icon)

<div class="wrap">
<xy-button type="primary" icon="heart">heart</xy-button>
<xy-button type="dashed" icon="thumbs-up">thumbs-up</xy-button>
<xy-button type="flat" icon="solid/magnifying-glass">magnifying-glass</xy-button>
<xy-button icon="solid/link">link</xy-button>
</div>

```html
<xy-button type="primary" icon="heart">heart</xy-button>
<xy-button type="dashed" icon="thumbs-up">thumbs-up</xy-button>
<xy-button type="flat" icon="solid/magnifying-glass">magnifying-glass</xy-button>
<xy-button icon="solid/link">link</xy-button>
```

JavaScript操作`set`

```js
btn.icon = 'name';
//原生属性操作
btn.setAttribute('icon','name');
```

当然，上述图标均位于文字左侧，如果想位于文字右侧，你可以直接嵌套`xy-icon`组件。

<div class="wrap">
  <xy-button type="primary">heart<xy-icon name="heart"></xy-icon></xy-button>
  <xy-button type="primary">right<xy-icon name="solid/angle-right"></xy-icon></xy-button>
</div>

```html
<xy-button>heart<xy-icon name="heart"></xy-icon></xy-button>
<xy-button>right<xy-icon name="solid/angle-right"></xy-icon></xy-button>
```

## 形状`shape`

有 3 种形状，分别是`normal`、`round`、`circle`
其中，当只有`icon`时，可配合`shape=circle`属性，实现圆形图标按钮。

<div class="wrap">
  <xy-button type="primary" icon="heart" shape="circle"></xy-button>
  <xy-button type="primary" icon="heart" shape="round">heart</xy-button>
  <xy-button type="primary" icon="heart">heart</xy-button>
</div>


```html
<xy-button icon="heart" shape="circle"></xy-button>
<xy-button icon="heart" shape="round">heart</xy-button>
<xy-button icon="heart">heart</xy-button>
```

## 块状`block`

`block`属性将使按钮适合其父宽度。

<div class="wrap">
<xy-button type="primary" block>primary</xy-button>
<xy-button type="dashed" block>dashed</xy-button>
<xy-button type="flat" block>flat</xy-button>
<xy-button block>default</xy-button>
</div>

```html
<xy-button type="primary" block>primary</xy-button>
<xy-button type="dashed" block>dashed</xy-button>
<xy-button type="flat" block>flat</xy-button>
<xy-button block>default</xy-button>
```

## 自定义样式`::part(button)`
 需要注意的是，`xy-button`本身不包含任意样式，如果需要自定义按钮本身样式，需要深入到`shadow dom`中，这里暴露了内置伪元素`::part(button)`用来自定义样式

::: tip TIPS
`::part`可以允许自定义 `shadow dom` 中指定元素的样式，https://developer.mozilla.org/en-US/docs/Web/CSS/::part
:::

内部结构如下（可查看控制台）：

```html
<xy-button>
  # shadow-root
    <button part="button">
```

<style>
.custom-button::part(button){
    font-size:20px;
    border-radius:50%;
    height:100px;
    width:100px;
}
</style>
<xy-button type="primary" class="custom-button">primary</xy-button>

```html
<style>
.custom-button::part(button){
    font-size:20px;
    border-radius:50%;
    height:100px;
    width:100px;
}
</style>
<xy-button type="primary" class="custom-button">primary</xy-button>
```

## 状态切换`toggle`

可以给按钮添加`toggle`属性，来实现简单的按钮状态切换。

可以简单的通过`checked`属性改变样式。

<style>
.button-toggle[checked]::part(button){
    background:var(--primary-color);
    color:#fff;
}
</style>
<xy-button toggle class="button-toggle">toggle button</xy-button>

```html
<style>
.button-toggle[checked]::part(button){
    background:var(--primary-color);
    color:#fff;
}
</style>
<xy-button toggle class="button-toggle">toggle button</xy-button>
```

也可以通过`js`获取到`checked`属性。

<xy-button toggle class="button-toggle" icon="heart" onclick="XyMessage.show({icon:'like',text:this.checked?'I dislike it':'I like it'})">like</xy-button>

```js
btn.addEventListener('click',function(ev){
    if(this.checked){
        //do something
    }else{
        //do something
    }
})
```

## 按钮组`xy-button-group`

`<xy-button-group>`可以将一组同类型的按钮组合起来。

需要引入`button-group`

```js
<script type="module">
    import '../components/button-group/index.js';
</script>
```

<div class="wrap" vertical>
<xy-button-group>
    <xy-button>button1</xy-button>
    <xy-button>button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>
<xy-button-group>
    <xy-button type="primary">button1</xy-button>
    <xy-button type="primary">button2</xy-button>
    <xy-button type="primary">button3</xy-button>
    <xy-button type="primary">button4</xy-button>
</xy-button-group>
<xy-button-group>
    <xy-button type="dashed">button1</xy-button>
    <xy-button type="dashed">button2</xy-button>
    <xy-button type="dashed">button3</xy-button>
    <xy-button type="dashed">button4</xy-button>
</xy-button-group>
<xy-button-group>
    <xy-button type="flat">button1</xy-button>
    <xy-button type="flat">button2</xy-button>
    <xy-button type="flat">button3</xy-button>
    <xy-button type="flat">button4</xy-button>
</xy-button-group>
<xy-button-group>
    <xy-button type="primary">button1</xy-button>
    <xy-button type="primary">button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>
</div>

```html
<xy-button-group>
    <xy-button>button1</xy-button>
    <xy-button>button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>
```

也支持整体禁用

<xy-checkbox checked onchange="document.querySelector('#btn-group').disabled=this.checked">禁用</xy-checkbox>
<div class="wrap">
<xy-button-group id="btn-group" disabled>
    <xy-button type="primary">button1</xy-button>
    <xy-button type="primary">button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>
</div>

```html
<xy-button-group disabled>
    <xy-button>button1</xy-button>
    <xy-button>button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>
```

## 事件`event`

与普通`button`标签一致。


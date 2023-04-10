<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/button/')
    import('../../components/checkbox/')
    import('../../components/rate/')
  })
</script>

# rate

常见的评分组件。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/rate/index.js';
</script>
<!-- 使用 -->
<xy-rate></xy-rate>
```

## 值`value`

设置或返回评分组件的`value`属性值。仅能设置为`1~5`之间的整数。

<div class="wrap">
<xy-rate value="2"></xy-rate>
<xy-button type="primary" onclick="this.previousElementSibling.value=3">设置value为3</xy-button>
<xy-button type="primary" onclick="console.log('当前value: '+this.previousElementSibling.previousElementSibling.value)">打印当前value</xy-button>
</div>

JavaScript操作`get`、`set`

```js
rate.value; //获取
rate.value = 2;
//原生属性操作
rate.getAttribute('value');
rate.setAttribute('value',2);
```

## 禁用`disabled`

通过`disabled`可以禁用，禁用后不可改变，可用作展示。

<div class="wrap">
<xy-rate disabled value="2"></xy-rate>
<xy-checkbox checked onchange="this.previousElementSibling.disabled = this.checked;">禁用</xy-checkbox>
</div>

```html
<xy-rate disabled value="2"></xy-rate>
```

JavaScript操作`get`、`set`

```js
rate.disabled;//获取
rate.disabled = false;
rate.disabled = true;
//原生属性操作
rate.getAttribute('disabled');
rate.setAttribute('disabled','');
rate.removeAttribute('disabled');
```

## 尺寸`size`

通过`size`可以设置组件尺寸，默认为`24px`。

<div class="wrap" vertical>
    <xy-rate value="2" size="20"></xy-rate>
    <xy-rate value="2" size="25"></xy-rate>
    <xy-rate value="2" size="30"></xy-rate>
    <xy-rate value="2" size="35"></xy-rate>
</div>

```html
<xy-rate value="2" size="20"></xy-rate>
<xy-rate value="2" size="25"></xy-rate>
<xy-rate value="2" size="30"></xy-rate>
<xy-rate value="2" size="35"></xy-rate>
```

CSS操作（推荐）

```css
xy-rate{
    font-size:30px;
}
```

JavaScript操作`get`、`set`

```js
rate.size;
rate.size = 30;
//原生属性操作
rate.getAttribute('size');
rate.setAttribute('size',30);
```

::: tip
CSS操作更灵活，可以写在样式中，属性值和JavaScript操作优先级更高
:::

## 颜色`color`

通过`color`可以设置组件颜色，默认为主题颜色`--primary-color`。

<div class="wrap" vertical>
    <xy-rate value="2" color="#fadb15"></xy-rate>
    <xy-rate value="2" color="#1E90FF"></xy-rate>
    <xy-rate value="2" color="#F44336"></xy-rate>
    <xy-rate value="2" color="#3F51B5"></xy-rate>
</div>

```html
<xy-rate value="2" color="#fadb15"></xy-rate>
<xy-rate value="2" color="#1E90FF"></xy-rate>
<xy-rate value="2" color="#F44336"></xy-rate>
<xy-rate value="2" color="#3F51B5"></xy-rate>
```

CSS操作（推荐）

```css
xy-rate{
    color: pink;
}
```

JavaScript操作`get`、`set`

```js
rate.color;
rate.color = 'orangered';
//原生属性操作
rate.getAttribute('color');
rate.setAttribute('color','orangered');
```

::: tip
CSS操作更灵活，可以写在样式中，属性值和JavaScript操作优先级更高
:::

## 提示`tips`

可以给评分指定一个提示，用于鼠标`hover`显示状态信息，格式形如`tips1,tips2,tips3,tips4,tips5`

<div class="wrap">
<xy-rate value="1" tips="terrible,bad,normal,good,wonderful"></xy-rate>
</div>

```html
<xy-rate value="1" tips="terrible,bad,normal,good,wonderful"></xy-rate>
```

JavaScript操作`get`、`set`

```js
rate.tips;
rate.tips = ['terrible','bad','normal','good','wonderful'];
//原生属性操作
rate.getAttribute('tips');
rate.setAttribute('tips','terrible,bad,normal,good,wonderful');
```

## 图标`icon`

默认图标为一个星形（⭐️），可选择其他图标。

关于`icon`的取值可以查看[`icon`](./icon)

<div class="wrap" vertical>
<xy-rate value="2" icon="star"></xy-rate>
<xy-rate value="2" icon="thumbs-up"></xy-rate>
<xy-rate value="2" icon="heart"></xy-rate>
<xy-rate value="2" icon="solid/star"></xy-rate>
<xy-rate value="2" icon="solid/thumbs-up"></xy-rate>
<xy-rate value="2" icon="solid/heart"></xy-rate>
</div>

```html
<xy-rate value="2" icon="star"></xy-rate>
<xy-rate value="2" icon="thumbs-up"></xy-rate>
<xy-rate value="2" icon="heart"></xy-rate>
<xy-rate value="2" icon="solid/star"></xy-rate>
<xy-rate value="2" icon="solid/thumbs-up"></xy-rate>
<xy-rate value="2" icon="solid/heart"></xy-rate>
```

JavaScript操作`get`、`set`

```js
rate.icon;
rate.icon = 'star';
//原生属性操作
rate.getAttribute('icon');
rate.setAttribute('icon','star');
```

## 自定义样式`::part(rate)`
如果自带的图标仍不满足需求，可以自定义样式，需要深入到`shadow dom`中，这里暴露了内置伪元素`::part(rate)`用来自定义样式

 内部结构如下（可查看控制台）：

```html
<xy-rate>
  # shadow-root
    <fieldset>
      <input type="radio" value="1" part="rate">
      <input type="radio" value="2" part="rate">
      <input type="radio" value="3" part="rate">
      <input type="radio" value="4" part="rate">
      <input type="radio" value="5" part="rate">
```

内部是通过遮罩实现，需要修改`-webkit-mask-image`，比如

<style scoped>
.custom::part(rate){
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E %3Cpath d='M473.7 73.8l-2.4-2.5c-46-47-118-51.7-169.6-14.8L336 159.9l-96 64 48 128-144-144 96-64-28.6-86.5C159.7 19.6 87 24 40.7 71.4l-2.4 2.4C-10.4 123.6-12.5 202.9 31 256l212.1 218.6c7.1 7.3 18.6 7.3 25.7 0L481 255.9c43.5-53 41.4-132.3-7.3-182.1z'%3E%3C/path%3E %3C/svg%3E")
}
</style>

<div class="wrap">
<xy-rate value="1" class="custom"></xy-rate>
</div>

```css
xy-rate::part(rate){
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E %3Cpath d='M473.7 73.8l-2.4-2.5c-46-47-118-51.7-169.6-14.8L336 159.9l-96 64 48 128-144-144 96-64-28.6-86.5C159.7 19.6 87 24 40.7 71.4l-2.4 2.4C-10.4 123.6-12.5 202.9 31 256l212.1 218.6c7.1 7.3 18.6 7.3 25.7 0L481 255.9c43.5-53 41.4-132.3-7.3-182.1z'%3E%3C/path%3E %3C/svg%3E")
}
```

> 图标来源于 https://www.zhangxinxu.com/sp/icon/

## 事件`event`

该组件暴露了常见的回调事件

### onchange

评分组件在评分完成时触发，键盘左右操作同样触发。

<div class="wrap">
<xy-rate value="1" onchange="console.log('当前value: '+this.value)"></xy-rate>
</div>

```html
<xy-rate value="1" onchange="console.log('当前value: '+this.value)"></xy-rate>
```

其他触发方式

```js
rate.onchange = function(ev){
    //获取value的几种方式
    console.log(this.value);
    console.log(ev.target.value);
}

rate.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
})
```
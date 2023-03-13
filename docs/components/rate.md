<script setup>
  import './index.css'
  import '../../components/button/'
  import '../../components/checkbox/'
  import '../../components/rate/'
</script>

# rate

常见的评分组件。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/xy-rate.js';
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

## 自定义样式`::part(rate)`
默认评分图标是一个星形（⭐️），如果需要自定义，需要深入到`shadow dom`中，这里暴露了内置伪元素`::part(rate)`用来自定义样式

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

内部是通过遮罩实现，需要修改`-webkit-mask-image`，比如下面是一个心形（❤）

<style scoped>
.custom::part(rate){
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E %3Cpath d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'%3E%3C/path%3E %3C/svg%3E")
}
</style>

<div class="wrap">
<xy-rate value="1" class="custom"></xy-rate>
</div>

```css
xy-rate::part(rate){
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E %3Cpath d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'%3E%3C/path%3E %3C/svg%3E")
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
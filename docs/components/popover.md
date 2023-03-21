<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/switch/')
    import('../../components/button/')
    import('../../components/popover/')
  })
</script>

# popover

悬浮提示（操作）框。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/popover/index.js';
</script>
<!-- 使用 -->
<xy-button>pop confirm</xy-button>
<xy-popover>
    <!-- dom -->
    <div>自定义内容</div>
</xy-popover>
```

需要将悬浮内容放入`<xy-popover></xy-popover>`内

## 类型`type`

提供两种默认样式，默认是带指向箭头的，同 [tips](./tips)，如果需要自定义，可以使用`custom`

<div class="wrap">
<xy-button type="primary">default</xy-button>
<xy-popover trigger="hover">
    <xy-button type="flat">菜单一</xy-button>
    <xy-button type="flat">菜单二</xy-button>
    <xy-button type="flat">菜单三</xy-button>
</xy-popover>

<xy-button type="primary">custom</xy-button>
<xy-popover type="custom" trigger="hover">
    <xy-button type="flat">菜单一</xy-button>
    <xy-button type="flat">菜单二</xy-button>
    <xy-button type="flat">菜单三</xy-button>
</xy-popover>
</div>

```html
<xy-button>default</xy-button>
<xy-popover>
    <xy-button type="flat">菜单一</xy-button>
    <xy-button type="flat">菜单二</xy-button>
    <xy-button type="flat">菜单三</xy-button>
</xy-popover>

<xy-button>custom</xy-button>
<xy-popover type="custom">
    <xy-button type="flat">菜单一</xy-button>
    <xy-button type="flat">菜单二</xy-button>
    <xy-button type="flat">菜单三</xy-button>
</xy-popover>
```

## 目标元素`target`

默认情况下，`xy-popover`是由**相邻的前一个节点**（`previousElementSibling`）控制的。如果需要自定义，可以通过`target`来选择，值为合法的选择器，比如`#id`、`.class`等

<div class="wrap">
  <xy-button type="primary" id="t1">target1</xy-button>
  <xy-button type="primary" id="t2">target2</xy-button>
</div>
<xy-popover target="#t1">
    我是 target1 触发的
</xy-popover>
<xy-popover target="#t2">
    我是 target2 触发的
</xy-popover>

```html
<xy-button id="t1">target1</xy-button>
<xy-button id="t2">target2</xy-button>
<xy-popover target="#t1">
    我是 target1 触发的
</xy-popover>
<xy-popover target="#t2">
    我是 target2 触发的
</xy-popover>
```

## 方向`dir`

通过`dir`可以设置悬浮层方向，可以取值`top`、`right`、`bottom`、`left`、`TL`、`TR`、`RT`、`RB`、`BL`、`BR`、`LT`、`LB`。同[tips](./tips)。

<style scoped>
  xy-popover p{
    padding: 0 4px;
    font-size: 14px;
  }
</style>

<div class="dir-wrap">
<div class="a"></div>
<div class="b"></div>
<div class="c"></div>
<div class="d"></div>
<div class="x"></div>
<xy-button>TL</xy-button>
<xy-popover dir="TL">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>top</xy-button>
<xy-popover dir="top">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>TR</xy-button>
<xy-popover dir="TR">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>LT</xy-button>
<xy-popover dir="LT">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>RT</xy-button>
<xy-popover dir="RT">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>left</xy-button>
<xy-popover dir="left">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>right</xy-button>
<xy-popover dir="right">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>LB</xy-button>
<xy-popover dir="LB">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>RB</xy-button>
<xy-popover dir="RB">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>BL</xy-button>
<xy-popover dir="BL">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>bottom</xy-button>
<xy-popover dir="bottom">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
<xy-button>BR</xy-button>
<xy-popover dir="BR">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
</div>

```html
<xy-button>top</xy-button>
<xy-popover dir="top">
  <p>弹出内容</p>
  <p>弹出内容</p>
</xy-popover>
```

JavaScript操作`get`、`set`

```js
popover.dir;
popover.dir = 'right';
//原生属性操作
popover.getAttribute('dir');
popover.setAttribute('dir','right');
```

除了上述 12 个方位外，还可以设置两个值，以逗号分隔，比如`top,bottom`，可以自动根据位置来选择一个合适的方向。默认值为`TL,BL`。

<xy-button>top,bottom</xy-button>
<xy-popover dir="top,bottom">
    <p>我会自动调整位置</p>
    <p>在空间充足的情况下朝上</p>
    <p>在上方空间不足的情况下自动朝下</p>
</xy-popover>

```html
<xy-button>top,bottom</xy-button>
<xy-popover dir="top,bottom">
    <p>我会自动调整位置</p>
    <p>在空间充足的情况下朝上</p>
    <p>在上方空间不足的情况下自动朝下</p>
</xy-popover>
```

## 触发方式`trigger`

## 触发方式`trigger`

还可以通过`trigger`属性定义触发方式，默认为`hover,focus`，还可以设置为`click`，也可任意组合

::: tip
仅用于初始化，后续修改无效。
:::

<div class="wrap">
<xy-button>hover</xy-button>
<xy-popover trigger="hover">
    <p>我是通过 hover 触发的</p>
</xy-popover>
<xy-button>focus</xy-button>
<xy-popover trigger="focus">
    <p>我是通过 focus 触发的</p>
</xy-popover>
<xy-button>click</xy-button>
<xy-popover trigger="click">
    <p>我是通过 click 触发的</p>
</xy-popover>
</div>
<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/button/')
    import('../../components/checkbox/')
    import('../../components/switch/')
    import('../../components/radio-group/')
  })
</script>

# radio

单项选择器。用于替代原生`input[type=radio]`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/radio/index.js';
</script>
<!-- 使用 -->
<xy-radio>radio</xy-radio>
```

## 禁用`disabled`

通过`disabled`可以禁用开关。

<div class="wrap">
<xy-radio disabled>radio</xy-radio>
<xy-checkbox checked onchange="this.previousElementSibling.disabled = this.checked;">禁用</xy-checkbox>
</div>

```html
<xy-radio disabled>radio</xy-radio>
```

JavaScript操作`get`、`set`

```js
radio.disabled;//获取
radio.disabled = false;
radio.disabled = true;
//原生属性操作
radio.setAttribute('disabled','');
radio.removeAttribute('disabled');
```

## 选中`checked`

`checked`属性表示选中，通常不可取消。

<div class="wrap">
<xy-radio>radio</xy-radio>
<xy-button type="primary" onclick="this.previousElementSibling.checked = true;">选中</xy-button>
</div>

```html
<xy-radio checked>radio</xy-radio>
```

通常多个出现，有一个相同的`name`，表示同一组，可以通过`name`来获取当前组的选中（通过`dom`获取即可）。

<div class="wrap">
<xy-radio name="lib" checked>React</xy-radio>
<xy-radio name="lib">Vue</xy-radio>
<xy-radio name="lib">Angular</xy-radio>
<xy-radio name="lib">Other</xy-radio>
<xy-button type="primary" onclick="console.log(document.querySelector('xy-radio[name=lib][checked]')?.value)">获取选中状态</xy-button>
</div>

```html
<xy-radio name="lib" checked>React</xy-radio>
<xy-radio name="lib">Vue</xy-radio>
<xy-radio name="lib">Angular</xy-radio>
<xy-radio name="lib">Other</xy-radio>
```

JavaScript操作`get`、`set`

```js
radio.checked;//获取
radio.checked = false;
radio.checked = true;
//原生属性操作
radio.setAttribute('checked','');
radio.removeAttribute('checked');
document.querySelector('xy-radio[name=lib][checked]').value
```

## 单选框组 `xy-radio-group`

表示同一组，支持以下特性

* 设置和获取`disabled`
* 设置和获取`value`
* 支持`change`事件

<div class="wrap" noborder>
<xy-checkbox checked onchange="document.getElementById('radio-group').disabled = this.checked;">禁用</xy-checkbox>
<xy-button type="primary" onclick="document.getElementById('radio-group').value='Php'">选中Php</xy-button>
</div>
<div class="wrap">
<xy-radio-group id="radio-group" name="lan" disabled value="CSS" onchange="console.log(this.value)">
    <xy-radio>HTML</xy-radio>
    <xy-radio>CSS</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
</div>

```html
<xy-radio-group name="lan" disabled value="CSS">
    <xy-radio>HTML</xy-radio>
    <xy-radio>CSS</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
```

JavaScript操作`get`、`set`

```js
radiogroup.value;//获取
radiogroup.value = 'CSS';
//原生属性操作
radiogroup.getAttribute('value');
radiogroup.setAttribute('value','CSS');
```


## 自定义样式`::part(radio)`
 需要注意的是，`xy-radio`本身不包含任意样式，如果需要自定义单选框本身样式，需要深入到`shadow dom`中，这里暴露了内置伪元素`::part(radio)`用来自定义样式

 内部结构如下（可查看控制台）：

```html
<xy-radio>
  # shadow-root
    <input type="radio" part="radio">
    <label>
      <slot></slot>
    </label>
```

和 [checkbox](/components/checkbox) 是一致的，下面介绍另一种自定义方式

比如，将 `radio` 完全隐藏，然后切换的时候改变文本样式

::: tip
不要直接用`display:none`，这样会失去键盘访问
:::

<style scoped>
xy-radio-group.custom xy-radio::part(radio){
  position: absolute;
  clip-path: inset(100% 100% 0 0);
}
xy-radio-group.custom xy-radio[checked]{
  color: var(--primary-color);
}
</style>

<div class="wrap">
<xy-radio-group class="custom" value="HTML" name="lan">
    <xy-radio>HTML</xy-radio>
    <xy-radio>CSS</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
</div>

```css
xy-radio::part(radio){
  position: absolute;
  clip-path: inset(100%);
}
xy-radio[checked]{
  color: var(--primary-color);
}
```

## 事件`event`

### onchange

在切换完成时触发。

<div class="wrap">
<xy-radio onchange="console.log('当前状态checked:'+this.checked)">radio</xy-radio>
</div>

```html
<xy-radio onchange="console.log('当前状态checked:'+this.checked)">radio</xy-radio>
```

```js
radio.onchange = function(ev){
    //获取checked的几种方式
    console.log(this.checked);
    console.log(ev.target.checked);
}

radio.addEventListener('change',function(ev){
    console.log(this.checked);
    console.log(ev.target.checked);
})
```

`xy-radio-group`支持`change`事件

<div class="wrap">
<xy-radio-group name="lan" value="Javascript" onchange="console.log(this.value)">
    <xy-radio>HTML</xy-radio>
    <xy-radio>CSS</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
</div>

```js
radiogroup.onchange = function(ev){
    //获取value的几种方式
    console.log(this.value);
    console.log(ev.target.value);
}

radiogroup.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
})
```

<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/switch/')
    import('../../components/button/')
    import('../../components/checkbox/')
  })
  const state = reactive({
    value: true
  })
</script>

# switch

开关选择器。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/switch/index.js';
</script>
<!-- 使用 -->
<xy-switch></xy-switch>
```

## 禁用`disabled`

通过`disabled`可以禁用开关。

<div class="wrap">
  <xy-switch disabled></xy-switch>
  <xy-checkbox checked onchange="this.previousElementSibling.disabled = this.checked;">禁用</xy-checkbox>
</div>

```html
<xy-switch disabled></xy-switch>
```

JavaScript操作

```js
switch.disabled;//获取
switch.disabled = false;
switch.disabled = true;
//原生属性操作
switch.setAttribute('disabled','');
switch.removeAttribute('disabled');
```

## 选中`checked`

`checked`属性表示选中。

<div class="wrap">
  <xy-switch checked></xy-switch>
  <xy-button type="primary" onclick="this.previousElementSibling.checked=!this.previousElementSibling.checked">选中切换</xy-button>
</div>

```html
<xy-switch checked></xy-switch>
```

JavaScript操作

```js
switch.checked;//获取
switch.checked = false;
switch.checked = true;
//原生属性操作
switch.setAttribute('checked','');
switch.removeAttribute('checked');
switch.toggleAttribute('checked', [force]);
```

## 尺寸`size`

小号开关。

<div class="wrap">
<xy-switch checked></xy-switch>
<xy-switch checked size="small"></xy-switch>
</div>

```html
<xy-switch checked></xy-switch>
<xy-switch checked size="small"></xy-switch>
```

## 自定义样式`::part(switch)`

`xy-switch`元素本身不包含任意样式，如果需要自定义样式，可以通过内置伪元素`::part(switch)`

内部结构如下（可查看控制台）：

```html
<xy-switch>
  # shadow-root
    <input part="switch" type="checkbox">
```

<style>
.custom-switch::part(switch){
  width: 60px;
  height: 30px;
  padding: 4px;
}
.custom-switch::part(switch)::after{
  background: yellow
}
</style>
<div class="wrap">
<xy-switch class="custom-switch" checked></xy-switch>
</div>

```html
<style>
.custom-switch::part(switch){
  width: 60px;
  height: 30px;
  padding: 4px;
}
.custom-switch::part(switch)::after{
  background: yellow
}
</style>
<xy-switch class="custom-switch" checked></xy-switch>
```

## 事件`event`

### onchange

在切换完成时触发。

<div class="wrap">
<xy-switch onchange="console.log(this.checked)"></xy-switch>
</div>

```html
<xy-switch onchange="console.log(this.checked)"></xy-switch>
```

```js
switch.onchange = function(ev){
    //获取checked的方式
    console.log(this.checked);
    console.log(ev.target.checked);
}

switch.addEventListener('change',function(ev){
    console.log(this.checked);
    console.log(ev.target.checked);
})
```
<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/switch/')
    import('../../components/button/')
    import('../../components/checkbox/')
    import('../../components/slider/')
  })
  const state = reactive({
    value: 0
  })
</script>

# slider

滑动条，展示当前值和可选范围。用于替代原生`input[type=range]`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/slider/index.js';
</script>
<!-- 使用 -->
<xy-slider></xy-slider>
```

`xy-slider`属性与原生`input[type=range]`大致相同，如下

## 值`value`

设置或返回滑块条的默认值（默认为50）。

<div class="wrap" vertical>
<xy-slider></xy-slider> 
<xy-slider value="30"></xy-slider>
<xy-slider value="100"></xy-slider>
<xy-button type="primary" onclick="this.previousElementSibling.value = 50;">设置值为50</xy-button>
</div>

```html
<xy-slider></xy-slider>
<xy-slider value="30"></xy-slider>
<xy-slider value="100"></xy-slider>
```

## 禁用`disabled`

通过`disabled`可以禁用滑动条。

<div class="wrap">
<xy-slider disabled></xy-slider>
<xy-checkbox checked onchange="this.previousElementSibling.disabled = this.checked;">禁用</xy-checkbox>
</div>

```html
<xy-slider disabled></xy-slider>
```

JavaScript操作`get`、`set`

```js
slider.disabled; //获取
slider.disabled = false;
slider.disabled = true;
//原生属性操作
slider.setAttribute('disabled','');
slider.removeAttribute('disabled');
```


## 提示`tips`

可以添加`tips`属性，可以在滑动时显示`value`值。

<div class="wrap">
<xy-slider value="30" tips></xy-slider>
</div>

```html
<xy-slider value="30" tips></xy-slider>
```

还可以进行插值表达式`${value}`

<div class="wrap">
<xy-slider tips="￥${value*2}"></xy-slider>
</div>

```html
<xy-slider tips="￥${value*2}"></xy-slider>
```


JavaScript操作`set`

```js
slider.tips = '${value}%';
slider.tips = false;
//原生属性操作
slider.setAttribute('tips','${value}%');
slider.removeAttribute('tips');
```


## 最小值`min`、最大值`max`、步长`step`

设置或返回滑块条的`min`和`max`属性值。默认值分别为`0`和`100`。

设置或返回滑块条的`step`属性值。默认值为`1`。

<div class="wrap">
<xy-slider min="0" max="100" step="10" id="xy-slider-step" tips></xy-slider>
</div>

<div class="wrap" noborder>
  min:
  <input class="input" style="width:100px" label="min" type="number" value="0" min="-100" max="100" oninput="document.getElementById('xy-slider-step').min=this.value;">
  max:
  <input class="input" style="width:100px" label="max" type="number" value="100" min="1" max="300" oninput="document.getElementById('xy-slider-step').max=this.value;">
  step:
  <input class="input" style="width:100px" label="step" type="number" value="10" min="1" max="50" oninput="document.getElementById('xy-slider-step').step=this.value;">
</div>

```html
<xy-slider min="0" max="100" step="10" tips></xy-slider>
```

JavaScript操作`get`、`set`

```js
slider.step; //获取
slider.step = 10;
//原生属性操作
slider.getAttribute('step');
slider.setAttribute('step',10);
```

## 垂直滑动条`vertical`

添加`vertical`属性可以垂直展示

<div class="wrap">
<xy-slider vertical tips></xy-slider>
</div>

```html
<xy-slider vertical tips></xy-slider>
```

默认高度为`150px`，可以使用`CSS`修改

```css
slider{
    height:200px;
}
```
<style>
  .vertical{
    height: 200px;
  }
</style>

<div class="wrap">
<xy-slider class="vertical" vertical tips></xy-slider>
</div>

## 自定义样式`::part(slider)`
 需要注意的是，`xy-slider`本身不包含任意样式，如果需要自定义滑动输入条本身样式，需要深入到`shadow dom`中，这里暴露了内置伪元素`::part(slider)`用来自定义样式

 内部结构如下（可查看控制台）：

```html
<xy-slider>
  # shadow-root
    <input type="range" part="slider">
      ::after
```

比如改为实心的滑块（仅支持Chrome）

<style scoped>
.custom::part(slider)::after{
  background: var(--primary-color)
}
</style>

<div class="wrap">
<xy-slider class="custom" tips></xy-slider>
</div>

```css
xy-slider::part(slider)::after{
  background: var(--primary-color)
}
```



## 事件`event`

该组件暴露了常见的回调事件

### onchange

滑动条在滑动完成时触发。

<div class="wrap">
<xy-slider tips onchange="console.log('当前value: '+this.value)"></xy-slider>
</div>

```html
<xy-slider tips onchange="fn(event)"></xy-slider>
```

其他触发方式

```js
slider.onchange = function(ev){
    //获取value的几种方式
    console.log(this.value);
    console.log(ev.target.value);
}

slider.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
})
```

### oninput

滑动条在滑动时触发。

<div class="wrap">
<xy-slider tips oninput="console.log('当前value: '+this.value)"></xy-slider>
</div>

```html
<xy-slider tips oninput="fn(event)"></xy-slider>
```

```js
slider.oninput = function(ev){
    console.log(this.value);
    console.log(ev.target.value);
}

slider.addEventListener('input',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
})
```
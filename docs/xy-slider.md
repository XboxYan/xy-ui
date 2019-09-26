# xy-slider

滑动条，展示当前值和可选范围。用于替代原生`input[type=range]`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-slider.js';
</script>
<!-- 使用 -->
<xy-slider></xy-slider>
```

`xy-slider`属性与原生`input[type=range]`大致相同，如下

## 初始值`defaultvalue`

设置或返回滑块条的默认值（默认为0）。

<xy-slider></xy-slider>
<xy-slider defaultvalue="30"></xy-slider>
<xy-slider defaultvalue="50"></xy-slider>

```html
<xy-slider></xy-slider>
<xy-slider defaultvalue="30"></xy-slider>
<xy-slider defaultvalue="50"></xy-slider>
```

## 禁用`disabled`

通过`disabled`可以禁用滑动条。

<xy-slider defaultvalue="50" disabled></xy-slider>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-slider defaultvalue="50" disabled></xy-slider>
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

## 提示`showtips`

可以添加`showtips`属性，可以在滑动时显示`value`值。

<xy-slider defaultvalue="50" showtips></xy-slider>

```html
<xy-slider defaultvalue="50" showtips></xy-slider>
```

JavaScript操作`set`

```js
slider.showtips = false;
slider.showtips = true;
//原生属性操作
slider.setAttribute('showtips','');
slider.removeAttribute('showtips');
```

## 前缀`prefix`、后缀`suffix`

在`showtips`的情况下，如果添加`prefix`或者`suffix`，可以在显示`value`时追加一个前（后）缀。比如单位，百分比。

<xy-slider defaultvalue="30" showtips prefix="$"></xy-slider>
<xy-slider defaultvalue="50" showtips prefix="value:"></xy-slider>
<xy-slider defaultvalue="30" showtips suffix="%"></xy-slider>
<xy-slider defaultvalue="50" showtips suffix="km"></xy-slider>

```html
<xy-slider defaultvalue="30" showtips prefix="$"></xy-slider>
<xy-slider defaultvalue="50" showtips prefix="value:"></xy-slider>
<xy-slider defaultvalue="30" showtips suffix="%"></xy-slider>
<xy-slider defaultvalue="50" showtips suffix="km"></xy-slider>
```

JavaScript操作`set`

```js
slider.prefix = '%';
slider.suffix = '$';
//原生属性操作
slider.setAttribute('prefix','$');
slider.setAttribute('suffix','%');
```

## 最小值`min`、最大值`max`、步长`step`

设置或返回滑块条的`min`和`max`属性值。默认值分别为`0`和`100`。

设置或返回滑块条的`step`属性值。默认值为`1`。

<xy-slider defaultvalue="50" min="0" max="100" step="10" id="xy-slider-step" showtips></xy-slider>
<xy-input style="width:100px" label="min" type="number" min="-100" max="100" onchange="document.getElementById('xy-slider-step').min=this.value;" defaultvalue="0"></xy-input>
<xy-input style="width:100px" label="max" type="number" min="1" max="300" onchange="document.getElementById('xy-slider-step').max=this.value;" defaultvalue="100"></xy-input>
<xy-input style="width:100px" label="step" type="number" min="1" max="50" onchange="document.getElementById('xy-slider-step').step=this.value;" defaultvalue="10"></xy-input>

```html
<xy-slider defaultvalue="30" min="0" max="100" step="5" showtips></xy-slider>
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

<xy-slider vertical showtips defaultvalue="10"></xy-slider>
<xy-slider vertical showtips defaultvalue="50"></xy-slider>

```html
<xy-slider vertical showtips defaultvalue="50"></xy-slider>
```

默认高度为`300px`，宽度为`20px`，可以使用`CSS`修改

```css
slider{
    width:50px;
    height:150px;
}
```

<xy-slider style="width:50px;height:150px;" vertical showtips defaultvalue="10"></xy-slider>
<xy-slider style="width:50px;height:150px;" vertical showtips defaultvalue="50"></xy-slider>

## 值`value`

设置或返回滑块条的`value`属性值。
该属性值在`xy-slider`标签上不可见。

<xy-slider showtips></xy-slider>
<xy-button type="primary" onclick="this.previousElementSibling.value=50">设置value为50</xy-button>
<xy-button type="primary" onclick="XyMessage.info('当前value: '+this.previousElementSibling.previousElementSibling.value)">显示当前value</xy-button>

JavaScript操作`get`、`set`

```js
slider.value; //获取
slider.value = 50;
//原生属性操作
slider.getAttribute('value');
slider.setAttribute('value',50);
```

## 事件`event`

该组件暴露了常见的回调事件

### onchange

滑动条在滑动完成时触发。

<xy-slider onchange="XyMessage.info('当前value: '+this.value)"></xy-slider>

```html
<xy-slider onchange="XyMessage.info('当前value: '+this.value)"></xy-slider>
```

其他触发方式

```js
slider.onchange = function(ev){
    //获取value的几种方式
    /*
    event:{
        detail:{
            value,
        }
    }
    */
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
}

slider.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
})
```

### oninput

滑动条在滑动时触发。

<xy-slider oninput="XyMessage.info('当前value: '+this.value)"></xy-slider>

```html
<xy-slider oninput="fn(event)"></xy-slider>
```

```js
slider.oninput = function(ev){
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
}

slider.addEventListener('input',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
})
```

### onfocus、onblur

`focus`、`blur`后的回调事件。

与[`xy-button`](xy-button.md?id=onfocus、onblur)使用方式一致。

## 方法`function`

### focus

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，支持方向键。

现支持鼠标滚轮操作，滚动速率是`step`的`5`倍，也就是说，如果`step`是`1`，那么每次滚动会增加（或减少）`5`

<xy-slider onfocus="XyMessage.info('focus')" onchange="XyMessage.info(this.value)"></xy-slider>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
slider.focus();
```

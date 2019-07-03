# xy-slider

滑动条，展示当前值和可选范围。用于替代原生`input[type=range]`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/xy-slider.js';
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

```html
<xy-slider defaultvalue="50" disabled></xy-slider>
```

JavaScript操作

```js
slider.disabled; //获取
slider.disabled = false;
slider.disabled = true;
//原生属性操作
slider.setAttribute('disabled','');
slider.removeAttribute('disabled');
```

## 最小值`min`、最大值`max`

设置或返回滑块条的`min`和`max`属性值。默认值分别为`0`和`100`。


<xy-slider defaultvalue="100" min="0" max="300"></xy-slider>
<xy-slider defaultvalue="30" min="-100" max="100"></xy-slider>

```html
<xy-slider defaultvalue="100" min="0" max="300"></xy-slider>
<xy-slider defaultvalue="30" min="-100" max="100"></xy-slider>
```

JavaScript操作

```js
slider.min; //获取
slider.min = 50;
//原生属性操作
slider.setAttribute('min',50);
```

## 步长`step`

设置或返回滑块条的`step`属性值。默认值为`1`。

<xy-slider defaultvalue="30" min="0" max="100" step="5"></xy-slider>
<xy-slider defaultvalue="50" min="0" max="100" step="10"></xy-slider>

```html
<xy-slider defaultvalue="30" min="0" max="100" step="5"></xy-slider>
<xy-slider defaultvalue="50" min="0" max="100" step="10"></xy-slider>
```

JavaScript操作

```js
slider.step; //获取
slider.step = 10;
//原生属性操作
slider.setAttribute('step',10);
```

## 提示`showtips`

可以添加`showtips`属性，可以在滑动时显示`value`值。

<xy-slider defaultvalue="50" showtips></xy-slider>

```html
<xy-slider defaultvalue="50" showtips></xy-slider>
```

JavaScript操作

```js
slider.showtips = false;
slider.showtips = true;
//原生属性操作
slider.setAttribute('showtips','');
slider.removeAttribute('showtips');
```

## 值`value`

设置或返回滑块条的`value`属性值。
该属性值在`html`标签上不可见。

JavaScript操作

```js
slider.value; //获取
slider.value = 50;
//原生属性操作
slider.setAttribute('value',50);
```

## 事件

该组件暴露了常见的回调事件

### change

滑动条在滑动完成时触发。

```html
<xy-slider onchange="fn(event)"></xy-slider>
```

```js
slider.onchange = function(ev){
    //获取value的几种方式
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

### input

滑动条在滑动时触发。

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

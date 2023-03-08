<script setup>
  import './index.css'
  import '../../components/button/'
  import '../../components/switch/'
  import '../../components/radio/'
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
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>
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
<xy-radio name="lib">React</xy-radio>
<xy-radio name="lib">Vue</xy-radio>
<xy-radio name="lib">Angular</xy-radio>
<xy-radio name="lib">Other</xy-radio>
<xy-button type="primary" onclick="XyMessage.info(document.querySelector('xy-radio[name=lib][checked]').value)">获取选中状态</xy-button>
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
```

现新增`xy-radio-group`组件，表示同一组，

* `defaultvalue`设置初始选中项
* 设置和获取`disabled`
* 设置和获取`vaule`
* 支持`change`事件

<xy-radio-group name="lan" disabled defaultvalue="Css">
    <xy-radio>Html</xy-radio>
    <xy-radio>Css</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>
<xy-button type="primary" onclick="this.previousElementSibling.previousElementSibling.value='Php'">选中Php</xy-button>

```html
<xy-radio-group name="lan" disabled defaultvalue="Css">
    <xy-radio>Html</xy-radio>
    <xy-radio>Css</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
```

JavaScript操作`get`、`set`

```js
radiogroup.value;//获取
radiogroup.value = 'Css';
//原生属性操作
radiogroup.getAttribute('value');
radiogroup.setAttribute('value','Css');
```

## 必填项`required`

表单验证属性，表示必填，作用于`xy-radio-group`

配合[`checkValidity()`](xy-radio.md?id=checkValidity)方法可以主动校验

## 事件`event`

### onchange

在切换完成时触发。

<div class="wrap">
<xy-radio onchange="XyMessage.info('当前状态checked:'+this.checked)">radio</xy-radio>
</div>

```html
<xy-radio onchange="XyMessage.info('当前状态checked:'+this.checked)">radio</xy-radio>
```

```js
radio.onchange = function(ev){
    //获取checked的几种方式
    /*
    event:{
        detail:{
            checked,
        }
    }
    */
    console.log(this.checked);
    console.log(ev.target.checked);
    console.log(ev.detail.checked);
}

radio.addEventListener('change',function(ev){
    console.log(this.checked);
    console.log(ev.target.checked);
    console.log(ev.detail.checked);
})
```

`xy-radio-group`支持`change`事件

<div class="wrap">
<xy-radio-group name="lan" defaultvalue="Javascript" onchange="XyMessage.info(this.value)">
    <xy-radio>Html</xy-radio>
    <xy-radio>Css</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
</div>

```js
radiogroup.onchange = function(ev){
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

radiogroup.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
})
```

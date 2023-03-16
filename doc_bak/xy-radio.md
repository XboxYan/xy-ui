# xy-radio

单项选择器。用于替代原生`input[type=radio]`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-radio.js';
</script>
<!-- 使用 -->
<xy-radio>radio</xy-radio>
```

## 禁用`disabled`

通过`disabled`可以禁用开关。

<xy-radio disabled>radio</xy-radio>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

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

## 值`value`

返回`value`。

通常`xy-radio`会有一个`value`属性，类似于`id`，如果不存在则返回文本内容`textContent`。

<xy-radio value="AAA">radio</xy-radio>
<xy-button type="primary" onclick="XyMessage.info(this.previousElementSibling.value)">获取value</xy-button>

```html
<xy-radio value="AAA">radio</xy-radio>
<xy-button type="primary" onclick="XyMessage.info(this.previousElementSibling.value)">获取value</xy-button>
```

JavaScript操作`get`

```js
radio.value;//获取
//原生属性操作
radio.getAttribute('value');
```

## 选中`checked`

`checked`属性表示选中，通常不可取消。

<xy-radio>radio</xy-radio>
<xy-button type="primary" onclick="this.previousElementSibling.checked = true;">选中</xy-button>

```html
<xy-radio checked>radio</xy-radio>
```

通常多个出现，有一个相同的`name`，表示同一组，可以通过`name`来获取当前组的选中（通过`dom`获取即可）。

<xy-radio name="lib" checked>React</xy-radio>
<xy-radio name="lib">Vue</xy-radio>
<xy-radio name="lib">Angular</xy-radio>
<xy-radio name="lib">Other</xy-radio>
<xy-button type="primary" onclick="XyMessage.info(document.querySelector('xy-radio[name=lib][checked]').value)">获取选中状态</xy-button>

```html
<xy-radio name="lib" checked>React</xy-radio>
<xy-radio name="lib">Vue</xy-radio>
<xy-radio name="lib">Angular</xy-radio>
<xy-radio name="lib">Other</xy-radio>
<xy-button type="primary" onclick="XyMessage.info(document.querySelector('xy-radio[name=lib][checked]').value)">获取选中状态</xy-button>
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

<xy-radio onchange="XyMessage.info('当前状态checked:'+this.checked)">radio</xy-radio>

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

<xy-radio-group name="lan" defaultvalue="Javascript" onchange="XyMessage.info(this.value)">
    <xy-radio>Html</xy-radio>
    <xy-radio>Css</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>

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

### onfocus、onblur

`focus`、`blur`后的回调事件。

与[`xy-button`](xy-button.md?id=onfocus、onblur)使用方式一致。

## 方法`function`

### focus

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，`Enter`或者`Space`选中。

<xy-radio onchange="XyMessage.info('当前状态checked:'+this.checked)">radio</xy-radio>
<xy-button type="primary" onfocus="XyMessage.info('focus')" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
radio.focus();
```

### reset

复原选项，回到默认值。

<xy-radio-group name="books" defaultvalue="React">
    <xy-radio>React</xy-radio>
    <xy-radio>Vue</xy-radio>
    <xy-radio>Angular</xy-radio>
    <xy-radio>Flutter</xy-radio>
    <xy-radio>Swift</xy-radio>
</xy-radio-group>
<xy-button type="primary" onclick="this.previousElementSibling.reset()">reset</xy-button>

```js
radiogroup.reset();
```

### checkValidity

用于主动校验，弹出提示信息。

<xy-radio-group required name="lan">
    <xy-radio>Html</xy-radio>
    <xy-radio>Css</xy-radio>
    <xy-radio>Javascript</xy-radio>
    <xy-radio>Php</xy-radio>
    <xy-radio>Dart</xy-radio>
</xy-radio-group>
<xy-button type="primary" onclick="this.previousElementSibling.checkValidity()">主动校验</xy-button>

```js
radiogroup.checkValidity();
```
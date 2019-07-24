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

### onfocus、onblur

`focus`、`blur`后的回调事件。

与[`xy-button`](xy-button.md?id=onfocus、onblur)使用方式一致。

## 方法`function`

### focus

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，`Enter`切换选中状态。

<xy-radio onchange="XyMessage.info('当前状态checked:'+this.checked)">radio</xy-radio>
<xy-button type="primary" onfocus="XyMessage.info('focus')" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
radio.focus();
```
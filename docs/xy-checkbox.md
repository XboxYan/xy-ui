# xy-checkbox

多项选择器。用于替代原生`input[type=checkbox]`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-checkbox.js';
</script>
<!-- 使用 -->
<xy-checkbox>checkbox</xy-checkbox>
```

## 禁用`disabled`

通过`disabled`可以禁用开关。

<xy-checkbox disabled>checkbox</xy-checkbox>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-checkbox disabled>checkbox</xy-checkbox>
```

JavaScript操作

```js
checkbox.disabled;//获取
checkbox.disabled = false;
checkbox.disabled = true;
//原生属性操作
checkbox.setAttribute('disabled','');
checkbox.removeAttribute('disabled');
```

## 值`value`

返回`value`。

通常`xy-checkbox`会有一个`value`属性，类似于`id`，如果不存在则返回文本内容`textContent`。

<xy-checkbox value="AAA">checkbox</xy-checkbox>
<xy-button type="primary" onclick="XyMessage.info(this.previousElementSibling.value)">获取value</xy-button>

```html
<xy-checkbox value="AAA">checkbox</xy-checkbox>
<xy-button type="primary" onclick="XyMessage.info(this.previousElementSibling.value)">获取value</xy-button>
```

JavaScript操作

```js
checkbox.value;//获取
//原生属性操作
checkbox.getAttribute('value');
```

## 选中`checked`

`checked`属性表示选中。

<xy-checkbox checked>checkbox</xy-checkbox>
<xy-switch checked onchange="this.previousElementSibling.checked = this.checked;"></xy-switch>

```html
<xy-checkbox checked>checkbox</xy-checkbox>
```

通常多个出现，有一个相同的`name`，表示同一组，可以通过`name`来获取当前组的选中（通过`dom`获取即可）。

<xy-checkbox name="lang" checked>Html</xy-checkbox>
<xy-checkbox name="lang">Css</xy-checkbox>
<xy-checkbox name="lang">Javascript</xy-checkbox>
<xy-checkbox name="lang">Python</xy-checkbox>
<xy-checkbox name="lang">Php</xy-checkbox>
<xy-checkbox name="lang">Dart</xy-checkbox>
<xy-checkbox name="lang">Swift</xy-checkbox>
<xy-button type="primary" onclick="XyMessage.info(Array.from(document.querySelectorAll('xy-checkbox[name=lang][checked]')).map(el=>el.textContent))">获取选中状态</xy-button>

```html
<xy-checkbox name="lang" checked>Html</xy-checkbox>
<xy-checkbox name="lang">Css</xy-checkbox>
<xy-checkbox name="lang">Javascript</xy-checkbox>
<xy-checkbox name="lang">Python</xy-checkbox>
<xy-checkbox name="lang">Php</xy-checkbox>
<xy-checkbox name="lang">Dart</xy-checkbox>
<xy-checkbox name="lang">Swift</xy-checkbox>
<xy-button type="primary" onclick="XyMessage.info(Array.from(document.querySelectorAll('xy-checkbox[name=lang][checked]')).map(el=>el.textContent))">获取选中状态</xy-button>
```


JavaScript操作

```js
checkbox.checked;//获取
checkbox.checked = false;
checkbox.checked = true;
//原生属性操作
checkbox.setAttribute('checked','');
checkbox.removeAttribute('checked');
```

## 事件`event`

### onchange

在切换完成时触发。

<xy-checkbox onchange="XyMessage.info('当前状态checked:'+this.checked)">checkbox</xy-checkbox>

```html
<xy-checkbox onchange="XyMessage.info('当前状态checked:'+this.checked)">checkbox</xy-checkbox>
```

```js
checkbox.onchange = function(ev){
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

checkbox.addEventListener('change',function(ev){
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

<xy-checkbox onfocus="XyMessage.info('focus')" onchange="XyMessage.info('当前状态checked:'+this.checked)">checkbox</xy-checkbox>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
checkbox.focus();
```
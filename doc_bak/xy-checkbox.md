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

现新增`xy-checkbox-group`组件，表示同一组，

* `defaultvalue`设置初始选中项，格式为`defaultvalue="React,Angular"`
* 设置和获取`disabled`
* 设置和获取`vaule`（数组格式）
* 支持`change`事件

<xy-checkbox-group name="books" disabled defaultvalue="React,Angular">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>
<xy-button type="primary" onclick="this.previousElementSibling.previousElementSibling.value='[\'Vue\',\'Flutter\']'">选中Vue、Flutter</xy-button>

```html
<xy-checkbox-group name="books" disabled defaultvalue="React,Angular">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
```

JavaScript操作`get`、`set`

```js
radiogroup.value;//获取
radiogroup.value = ['React','Vue'];
//原生属性操作
radiogroup.getAttribute('value');
radiogroup.setAttribute('value',['React','Vue']);
```

## 不确定状态`indeterminate`

可以通过`JavaScript`设置`xy-checkbox`的不确定状态

<xy-checkbox>indeterminate</xy-checkbox>
<xy-button type="primary" onclick="this.previousElementSibling.indeterminate='true'">设置indeterminate</xy-button>

JavaScript操作`get`、`set`

```js
checkbox.indeterminate;//获取
checkbox.indeterminate = false;
checkbox.indeterminate = true;
```

## 必填项`required`

表单验证属性，表示必填，可作用于`xy-checkbox`或者`xy-checkbox-group`上

<xy-checkbox required>I agree</xy-checkbox>

```html
<xy-checkbox required>I agree</xy-checkbox>
```

> 常用于同意用户协议等功能，默认提示信息为"如果要继续，请选中此框"，可用`errortips`自定义提示。

如果是在`xy-checkbox-group`上，则表示必须要选一项。

配合[`checkValidity()`](xy-checkbox.md?id=checkValidity)方法可以主动校验

## 最少项`min`、最多项`max`

表单验证属性，表示最少选中和最多选中项目

<xy-checkbox-group name="books" required min="2" max="3" defaultvalue="React,Angular">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>

```html
<xy-checkbox-group name="books" required min="2" max="3" defaultvalue="React,Angular">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
```

## 合法性`validity`

可以通过属性`validity`来获取多选框的合法性。

<xy-checkbox-group name="books" required min="2" max="3">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
<xy-button type="primary" onclick="XyMessage.info('合法性:'+this.previousElementSibling.validity)">合法性</xy-button>

JavaScript操作`get`

```js
checkbox.validity;//获取
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

`xy-checkbox-group`支持`change`事件

<xy-checkbox-group name="books" required min="2" max="3" defaultvalue="React,Angular" onchange="XyMessage.info(this.value)">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>


```js
checkboxgroup.onchange = function(ev){
    //获取value的几种方式
    /*
    event:{
        detail:{
            value,
        }
    }
    */
    console.log(this.value);//["React","Angular"]
    console.log(ev.target.value);
    console.log(ev.detail.value);
}

checkboxgroup.addEventListener('change',function(ev){
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

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，`Enter`或者`Space`切换选中状态。

<xy-checkbox onfocus="XyMessage.info('focus')" onchange="XyMessage.info('当前状态checked:'+this.checked)">checkbox</xy-checkbox>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
checkbox.focus();
```

### reset

复原选项，回到默认值。

<xy-checkbox-group name="books" defaultvalue="React,Angular">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
<xy-button type="primary" onclick="this.previousElementSibling.reset()">reset</xy-button>

```js
checkboxgroup.reset();
```

### checkValidity

用于主动校验，弹出提示信息。

<xy-checkbox-group name="books" required min="2" max="3">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
<xy-button type="primary" onclick="this.previousElementSibling.checkValidity()">主动校验</xy-button>

```js
checkboxgroup.checkValidity();
```
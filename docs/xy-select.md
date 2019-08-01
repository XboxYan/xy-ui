# xy-select

下拉选择器。用于替代原生`select`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-select.js';
</script>
<!-- 使用 -->
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

> `xy-select`配合`xy-option`才能渲染到下拉菜单中，其他标签不会渲染。

## 风格`type`

跟随`xy-button`。

<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select type="flat">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select type="primary">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select type="dashed">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select type="flat">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select type="primary">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select type="dashed">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

## 块状`block`

跟随`xy-button`，宽度充满父级。

<xy-select block>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<xy-select block>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

## 初始值`defaultvalue`

设置或返回下拉选择器的默认值，如果不设置，则默认选中第一项。

<xy-select defaultvalue="2">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<xy-select defaultvalue="2">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

## 禁用`disabled`

通过`disabled`可以禁用下拉选择器。

<xy-select disabled>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-select disabled>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

JavaScript操作`get`、`set`

```js
select.disabled; //获取
select.disabled = false;
select.disabled = true;
//原生属性操作
select.setAttribute('disabled','');
select.removeAttribute('disabled');
```

## 值`value`、文本`text`

设置或返回下拉选择器的当前`value`属性值。

返回下拉选择器的`text`。

`value`指定在`xy-option`上，`text`指`xy-option`的`textContent`。

该属性值在`xy-select`标签上不可见。

<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-button type="primary" onclick="this.previousElementSibling.value='3'">选中Option3</xy-button>
<xy-button type="primary" onclick="XyMessage.info('当前选中: '+this.previousElementSibling.previousElementSibling.text)">获取当前选中textContent</xy-button>

JavaScript操作`get`、`set`

```js
select.value; //获取
select.text; //获取textContent(没有set方法)
select.value = 50;
//原生属性操作
select.setAttribute('value',50);
select.getAttribute('value');
```

## 事件`event`

### onchange

在下拉选中完成时触发。

<xy-select onchange="XyMessage.info('当前选中value:'+this.value)">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<xy-select onchange="XyMessage.info('当前选中value:'+this.value)">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

```js
select.onchange = function(ev){
    //获取value和text的几种方式
    /*
    event:{
        detail:{
            value,
            text,
        }
    }
    */
    console.log(this.value);
    console.log(this.text);
    console.log(ev.target.value);
    console.log(ev.target.text);
    console.log(ev.detail.value);
    console.log(ev.detail.text);
}

select.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(this.text);
    console.log(ev.target.value);
    console.log(ev.target.text);
    console.log(ev.detail.value);
    console.log(ev.detail.text);
})
```

### onfocus

`focus`后的回调事件。

与[`xy-button`](xy-button.md?id=onfocus、onblur)使用方式一致。

## 方法`function`

### focus

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，支持方向键。

<xy-select onfocus="XyMessage.info('focus')" onblur="XyMessage.info('blur')" onchange="XyMessage.info('当前选中value:'+this.value)">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
select.focus();
```

## 其他

`xy-select`除了包裹`xy-option`以外，还能包裹其他标签，比如`a`链接

<style>
.xy-link{
    display:block;
    padding:0 .8em;
}
</style>
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
    <a class="xy-link" href="#">link</a>
</xy-select>

```html
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
    <a class="xy-link" href="#">link</a>
</xy-select>
```
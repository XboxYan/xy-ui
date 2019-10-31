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

## 占位`placeholder`

当没有设置初始值`defaultvalue`时，可设置默认提示，默认为`请选择`。

<xy-select placeholder="请选择一项">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<xy-select placeholder="请选择一项">
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

如果设置在`xy-option`可单独禁用某一项

<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2" disabled>Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2" disabled>Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

## 值`value`、文本`text`

设置或返回下拉选择器的当前`value`属性值。

返回下拉选择器的`text`。

`value`指定在`xy-option`上，`text`指`xy-option`的`textContent`。

每个`xy-option`必须指定一个不重复的`value`。

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

## 分组`xy-optgroup`

可以通过`xy-optgroup`进行分组，名称为`label`。

<xy-select>
    <xy-optgroup label="group1">
        <xy-option value="1">Option1</xy-option>
        <xy-option value="2">Option2</xy-option>
        <xy-option value="3">Option3</xy-option>
    </xy-optgroup>
    <xy-optgroup label="group2">
        <xy-option value="4">Option4</xy-option>
        <xy-option value="5">Option5</xy-option>
    </xy-optgroup>
    <xy-option value="6">Option6</xy-option>
</xy-select>

```html
<xy-select>
    <xy-optgroup label="group1">
        <xy-option value="1">Option1</xy-option>
        <xy-option value="2">Option2</xy-option>
        <xy-option value="3">Option3</xy-option>
    </xy-optgroup>
    <xy-optgroup label="group2">
        <xy-option value="4">Option4</xy-option>
        <xy-option value="5">Option5</xy-option>
    </xy-optgroup>
    <xy-option value="6">Option6</xy-option>
</xy-select>
```


## 搜索`search`

添加`search`可对选项进行搜索。

过滤的条件是`xy-option`中的`key`属性（不区分大小写）。

<xy-select search>
    <xy-option value="wuhan" key="wuhan-武汉-wh">武汉</xy-option>
    <xy-option value="beijing" key="beijing-北京-bj">北京</xy-option>
    <xy-option value="shnaghai" key="shnaghai-上海-sh">上海</xy-option>
    <xy-option value="shenzhen" key="shenzhen-深圳-sz">深圳</xy-option>
    <xy-option value="chongqing" key="chongqing-重庆-cq">重庆</xy-option>
    <xy-option value="hangzhou" key="hangzhou-杭州-hz">杭州</xy-option>
    <xy-option value="guangzhou" key="guangzhou-广州-gz">广州</xy-option>
    <xy-option value="hongkong" key="hongkong-香港-hk">香港</xy-option>
</xy-select>

```html
<xy-select search>
    <xy-option value="wuhan" key="wuhan-武汉-wh">武汉</xy-option>
    <xy-option value="beijing" key="beijing-北京-bj">北京</xy-option>
    <xy-option value="shnaghai" key="shnaghai-上海-sh">上海</xy-option>
    <xy-option value="shenzhen" key="shenzhen-深圳-sz">深圳</xy-option>
    <xy-option value="chongqing" key="chongqing-重庆-cq">重庆</xy-option>
    <xy-option value="hangzhou" key="hangzhou-杭州-hz">杭州</xy-option>
    <xy-option value="guangzhou" key="guangzhou-广州-gz">广州</xy-option>
    <xy-option value="hongkong" key="hongkong-香港-hk">香港</xy-option>
</xy-select>
```

> 内部通过属性选择器`xy-option:not([key*="${value}" i])`简单实现，设置`search`后，`type`风格失效

## 必填项`required`

表单验证属性，表示必填

<xy-select required>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

<xy-select type="flat" required>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

<xy-select type="primary" required>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

<xy-select type="dashed" required>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<xy-select required>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

> 默认提示信息为`请选择一项`，可通过`errortips`自定义提示。

## 合法性`validity`

可以通过属性`validity`来获取下拉框的合法性。

<xy-select required>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-button type="primary" onclick="XyMessage.info('合法性:'+this.previousElementSibling.validity)">合法性</xy-button>

JavaScript操作`get`

```js
select.validity;//获取
```

## 自定义尺寸

默认情况下，`xy-select`尺寸跟随`xy-button`，可以自定义宽高

<style>
.xy-select-custom{
    width:120px;
    height:30px;
}
</style>
<xy-select class="xy-select-custom">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>

```html
<style>
.xy-select-custom{
    width:120px;
    height:30px;
}
</style>
<xy-select class="xy-select-custom">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
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

### reset

复原选项，回到默认值。

<xy-select defaultvalue="2">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-button type="primary" onclick="this.previousElementSibling.reset()">reset</xy-button>

```js
select.reset();
```

当然，直接操作也是可行的

```js
this.value = this.defaultvalue;
```

### checkValidity

用于主动校验，弹出提示信息。

<xy-select required>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-button type="primary" onclick="this.previousElementSibling.checkValidity()">主动校验</xy-button>

```js
select.checkValidity();
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
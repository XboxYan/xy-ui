# xy-switch

开关选择器。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './components/xy-switch.js';
</script>
<!-- 使用 -->
<xy-switch></xy-switch>
```

## 禁用`disabled`

通过`disabled`可以禁用开关。

<xy-switch disabled></xy-switch>
<xy-button type="primary" onclick="this.previousElementSibling.disabled=!this.previousElementSibling.disabled">禁用切换</xy-button>

```html
<xy-switch disabled></xy-switch>
```

JavaScript操作

```js
switch.disabled;//获取
switch.disabled = false;
switch.disabled = true;
//原生属性操作
switch.setAttribute('disabled','');
switch.removeAttribute('disabled');
```

## 选中`checked`

`checked`属性表示选中。

<xy-switch checked></xy-switch>
<xy-button type="primary" onclick="this.previousElementSibling.checked=!this.previousElementSibling.checked">选中切换</xy-button>

```html
<xy-switch checked></xy-switch>
```


JavaScript操作

```js
switch.checked;//获取
switch.checked = false;
switch.checked = true;
//原生属性操作
switch.setAttribute('checked','');
switch.removeAttribute('checked');
```

## change事件

在切换完成时触发。

<xy-switch onchange="XyMessage.info('当前状态checked:'+this.checked)"></xy-switch>

```html
<xy-switch onchange="XyMessage.info('当前状态checked:'+this.checked)"></xy-switch>
```

```js
switch.onchange = function(ev){
    //获取checked的几种方式
    console.log(this.checked);
    console.log(ev.target.checked);
    console.log(ev.detail.checked);
}

switch.addEventListener('change',function(ev){
    console.log(this.checked);
    console.log(ev.target.checked);
    console.log(ev.detail.checked);
})
```

# xy-switch

开关选择器。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-switch.js';
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

## 自定义尺寸

内部采用`em`相对尺寸，可通过`font-size`来控制大小。

<xy-switch checked></xy-switch>
<xy-slider min="10" max="50" defaultvalue="16" suffix="px" showtips oninput="this.previousElementSibling.style.fontSize=this.value+'px'" ></xy-slider>

```html
<style>
xy-switch{
    font-size:20px;
}
</style>
<xy-switch checked></xy-switch>
```

## 事件`event`

### onchange

在切换完成时触发。

<xy-switch onchange="XyMessage.info('当前状态checked:'+this.checked)"></xy-switch>

```html
<xy-switch onchange="XyMessage.info('当前状态checked:'+this.checked)"></xy-switch>
```

```js
switch.onchange = function(ev){
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

switch.addEventListener('change',function(ev){
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

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，`Enter`切换开关。

<xy-switch onfocus="XyMessage.info('focus')" onchange="XyMessage.info('当前状态checked:'+this.checked)"></xy-switch>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
switch.focus();
```
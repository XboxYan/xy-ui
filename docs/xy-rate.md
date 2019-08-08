# xy-rate

常见的评分组件。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-rate.js';
</script>
<!-- 使用 -->
<xy-rate></xy-rate>
```

## 默认值`defaultvalue`

可以给评分指定一个初始值`defaultvalue`，取值为`1~5`之间的整数。

<xy-rate defaultvalue="2"></xy-rate>

```html
<xy-rate defaultvalue="2"></xy-rate>
```

## 值`value`

设置或返回评分组件的`value`属性值。仅能设置为`1~5`之间的整数。

该属性值在`xy-rate`标签上不可见。

<xy-rate defaultvalue="2"></xy-rate>
<xy-button type="primary" onclick="this.previousElementSibling.value=3">设置value为3</xy-button>
<xy-button type="primary" onclick="XyMessage.info('当前value: '+this.previousElementSibling.previousElementSibling.value)">显示当前value</xy-button>

JavaScript操作`get`、`set`

```js
rate.value; //获取
rate.value = 2;
//原生属性操作
rate.getAttribute('value');
rate.setAttribute('value',2);
```

## 禁用`disabled`

通过`disabled`可以禁用，禁用后事件失效。

<xy-rate disabled defaultvalue="2"></xy-rate>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-rate disabled defaultvalue="2"></xy-rate>
```

JavaScript操作`get`、`set`

```js
rate.disabled;//获取
rate.disabled = false;
rate.disabled = true;
//原生属性操作
rate.getAttribute('disabled');
rate.setAttribute('disabled','');
rate.removeAttribute('disabled');
```

## 图标`icon`

默认图标为`star-fill`，可选择其他图标。

关于`xy-icon`的取值可以查看[`xy-icon`](xy-icon.md)

<xy-rate defaultvalue="2" icon="star"></xy-rate>

<xy-rate defaultvalue="2" icon="like-fill"></xy-rate>

<xy-rate defaultvalue="2" icon="heart-fill"></xy-rate>

<xy-rate defaultvalue="2" icon="like"></xy-rate>

<xy-rate defaultvalue="2" icon="heart"></xy-rate>

```html
<xy-rate defaultvalue="2" icon="star"></xy-rate>
<xy-rate defaultvalue="2" icon="like-fill"></xy-rate>
<xy-rate defaultvalue="2" icon="heart-fill"></xy-rate>
<xy-rate defaultvalue="2" icon="like"></xy-rate>
<xy-rate defaultvalue="2" icon="heart"></xy-rate>
```

## 尺寸`size`

通过`size`可以设置组件尺寸，默认为`font-size`大小（`20px`）。

<xy-rate defaultvalue="2" size="20"></xy-rate>

<xy-rate defaultvalue="2" size="25"></xy-rate>

<xy-rate defaultvalue="2" size="30"></xy-rate>

<xy-rate defaultvalue="2" size="35"></xy-rate>

```html
<xy-rate defaultvalue="2" size="20"></xy-rate>
<xy-rate defaultvalue="2" size="25"></xy-rate>
<xy-rate defaultvalue="2" size="30"></xy-rate>
<xy-rate defaultvalue="2" size="35"></xy-rate>
```

CSS操作（推荐）

```css
xy-rate{
    font-size:30px;
}
```

JavaScript操作`get`、`set`

```js
rate.size;
rate.size = 30;
//原生属性操作
rate.getAttribute('size');
rate.setAttribute('size',30);
```

> CSS操作更灵活，可以写在样式中，属性值和JavaScript操作优先级更高

## 颜色`color`

通过`color`可以设置组件颜色，默认为主题颜色`themeColor`。

<xy-rate defaultvalue="2" color="orangered"></xy-rate>

<xy-rate defaultvalue="2" color="#1E90FF"></xy-rate>

<xy-rate defaultvalue="2" color="#F44336"></xy-rate>

<xy-rate defaultvalue="2" color="#3F51B5"></xy-rate>

```html
<xy-rate defaultvalue="2" color="orangered"></xy-rate>
<xy-rate defaultvalue="2" color="#1E90FF"></xy-rate>
<xy-rate defaultvalue="2" color="#F44336"></xy-rate>
<xy-rate defaultvalue="2" color="#3F51B5"></xy-rate>
```

JavaScript操作`get`、`set`

```js
rate.color;
rate.color = 'orangered';
//原生属性操作
rate.getAttribute('color');
rate.setAttribute('color','orangered');
```

可以通过`css`控制默认未选中颜色（默认为`#eee`）

<style>
.rate-color{
    color:yellow
}
</style>
<xy-rate defaultvalue="2" color="#F44336" class="rate-color"></xy-rate>

```html

<style>
.rate-color{
    color:yellow
}
</style>
<xy-rate defaultvalue="2" color="#F44336" class="rate-color"></xy-rate>
```

## 提示`tips`

可以给评分指定一个提示，用于鼠标`hover`显示状态信息，格式形如`tips1,tips2,tips3,tips4,tips5`

<xy-rate defaultvalue="1" tips="terrible,bad,normal,good,wonderful"></xy-rate>

```html
<xy-rate defaultvalue="1" tips="terrible,bad,normal,good,wonderful"></xy-rate>
```

## 事件`event`

该组件暴露了常见的回调事件

### onchange

评分组件在评分完成时触发，键盘左右操作同样触发。

<xy-rate defaultvalue="1" onchange="XyMessage.info('当前value: '+this.value)"></xy-rate>

```html
<xy-rate defaultvalue="1" onchange="XyMessage.info('当前value: '+this.value)"></xy-rate>
```

其他触发方式

```js
rate.onchange = function(ev){
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

rate.addEventListener('change',function(ev){
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

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，支持方向键。

<xy-rate onfocus="XyMessage.info('focus')" onblur="XyMessage.info('blur')" onchange="XyMessage.info(this.value)"></xy-rate>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
rate.focus();
```
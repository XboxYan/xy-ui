# xy-color-picker

颜色选择器。

![xy-color-picker](../screenshot/color-picker.png)

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-color-picker.js';
</script>
<!-- 使用 -->
<xy-color-picker></xy-color-picker>
```

## 默认值`defaultvalue`

可以给颜色选择器指定一个初始颜色值`defaultvalue`，取值为合法的颜色值。

|类型|示例|web支持|
|---|---|---|
|关键字|`red`、`blue`|支持|
|hex(a)|`#42b983`、`#42B983BA`|支持|
|rgb(a)|`rgb(66, 185, 131)`、`rgba(66, 185, 131, 0.73)`|支持|
|hls(a)|`hsl(153, 47%, 49%)`、`hsla(153, 47%, 49%, 0.73)`|支持|
|hsv(a)|`hsv(153, 47%, 49%)`、`hsva(153, 47%, 49%, 0.73)`|不支持|
|cmyk|`cmyk(20%, 35%, 74%, 53%)`|不支持|

> 其中，web支持颜色关键字、`hex(a)`、`rgb(a)`、`hls(a)`四种方式。

<xy-color-picker defaultvalue="rgb(66, 185, 131)"></xy-color-picker>

```html
<xy-color-picker defaultvalue="rgb(66, 185, 131)"></xy-color-picker>
```

## 值`value`、颜色`color`

设置或返回颜色选择器的`value`属性值。值为合法的颜色值。默认返回当前格式下的颜色值。

返回颜色的详细信息`color`，可以将值转换成任意格式的颜色值。

```js
//color
{
    h: 16.23529411764704
    s: 66.42857142857143
    v: 71.71875
    a: 1
    toCMYK: f,
    toHEXA: f,
    toHSLA: f,
    toHSVA:f,
    toRGBA: f,
}

color.toRGBA().toString()//返回RGBA的颜色值
```

该属性值在`xy-color-picker`标签上不可见。

<xy-color-picker defaultvalue="rgb(66, 185, 131)" id="color-picker-value"></xy-color-picker>

<xy-button type="primary" onclick="document.getElementById('color-picker-value').value='orangered'">设置value为orangered</xy-button>
<xy-button type="primary" onclick="XyMessage.info('当前value: '+document.getElementById('color-picker-value').value)">显示当前value</xy-button>

JavaScript操作`get`、`set`

```js
color.value; //获取
color.color; //获取
color.value = 'orangered';
//原生属性操作
color.getAttribute('value');
color.getAttribute('color');
color.setAttribute('value','orangered');
```

## 禁用`disabled`

通过`disabled`可以禁用，禁用后无法打开颜色选择面板。

<xy-color-picker disabled defaultvalue="rgb(66, 185, 131)"></xy-color-picker>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-color-picker disabled defaultvalue="rgb(66, 185, 131)"></xy-color-picker>
```

JavaScript操作`get`、`set`

```js
color.disabled;//获取
color.disabled = false;
color.disabled = true;
//原生属性操作
color.getAttribute('disabled');
color.setAttribute('disabled','');
color.removeAttribute('disabled');
```

## 方向`dir`

通过`dir`可以设置颜色悬浮层方向，默认为`bottomleft`，可以取值`top`、`right`、`bottom`、`left`、`topleft`、`topright`、`righttop`、`rightbottom`、`bottomleft`、`bottomright`、`lefttop`、`leftbottom`。同[`xy-popover`](xy-popover.md)。

<xy-color-picker defaultvalue="rgb(66, 185, 131)" dir="topleft"></xy-color-picker>

```html
<xy-color-picker defaultvalue="rgb(66, 185, 131)" dir="topleft"></xy-color-picker>
```

JavaScript操作`get`、`set`

```js
color.dir;
color.dir = 'right';
//原生属性操作
color.getAttribute('dir');
color.setAttribute('dir','right');
```

## 自定义尺寸

默认情况下，`xy-color-picker`是一个圆角正方形，可以设置宽高

<style>
.color-picker-custom{
    width:100px;
    height:30px;
}
</style>
<xy-color-picker class="color-picker-custom" defaultvalue="rgb(66, 185, 131)"></xy-color-picker>

```html
<style>
.color-picker-custom{
    width:100px;
    height:30px;
}
</style>
<xy-color-picker class="color-picker-custom" defaultvalue="rgb(66, 185, 131)"></xy-color-picker>
```

## 事件`event`

该组件暴露了常见的回调事件

### onchange

当选好颜色后，按确定按钮可以触发`change`回调。

<xy-color-picker defaultvalue="rgb(66, 185, 131)" onchange="XyMessage.info('当前value: '+this.value)"></xy-color-picker>

```html
<xy-color-picker defaultvalue="rgb(66, 185, 131)" onchange="XyMessage.info('当前value: '+this.value)"></xy-color-picker>
```

其他触发方式

```js
color.onchange = function(ev){
    //获取value的几种方式
    /*
    event:{
        detail:{
            value,
            color:{
                h: 16.23529411764704
                s: 66.42857142857143
                v: 71.71875
                a: 1
                toCMYK: f,
                toHEXA: f,
                toHSLA: f,
                toHSVA:f,
                toRGBA: f,
            }
        }
    }
    */
    console.log(this.value);
    console.log(this.color);
    console.log(ev.target.value);
    console.log(ev.detail.value);
    this.color.toRGBA().toString() //rgba(255,255,255,1)
}

color.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(this.color);
    console.log(ev.target.value);
    console.log(ev.detail.value);
    this.color.toRGBA().toString() //rgba(255,255,255,1)
})
```



## 其他

`xy-color-picker`内部基于`xy-popover`和`xy-color-pane`实现。

```html
<xy-popover >
    <xy-button class="color-btn"></xy-button>
    <xy-popcon>
        <xy-color-pane id="color-pane"></xy-color-pane>
        <div class="pop-footer">
            <xy-button id="btn-cancel">取消</xy-button>
            <xy-button type="primary" id="btn-submit">确认</xy-button>
        </div>
    </xy-popcon>
</xy-popover>
```

其中，`xy-color-pane`为颜色选择面板，可独立使用。

<xy-color-pane defaultvalue="rgb(66, 185, 131)"></xy-color-pane>

```html
<xy-color-pane defaultvalue="rgb(66, 185, 131)"></xy-color-pane>
```

事件和属性与`xy-color-picker`一致。

```js
colorPane.value = 'orangered';
colorPane.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(this.color);
    console.log(ev.target.value);
    console.log(ev.detail.value);
    this.color.toRGBA().toString() //rgba(255,255,255,1)
})
```
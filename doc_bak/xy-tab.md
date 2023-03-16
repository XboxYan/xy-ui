# xy-tab

标签页。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-tab.js';
</script>
<!-- 使用 -->
<xy-tab>
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>
```

`xy-tab`需和`xy-tab-content`组合使用。

## 名称`label`

每个`xy-tab-content`需要指定一个名称`label`，用于显示标签头。

<xy-tab>
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>

```html
<xy-tab>
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>
```

JavaScript操作`get`、`set`

> 作用于`xy-tab-content`

```js
//xy-tab-content
content.label;
content.label = 'tab';
//原生属性操作
content.getAttribute('label');
content.setAttribute('label','tab');
```

## 禁用`disabled`

每个`xy-tab-content`可以指定`disabled`属性，用来禁用该标签页。

<xy-tab>
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content id="tab-content-disabled" label="tab2" disabled>tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>
<xy-switch checked onchange="document.getElementById('tab-content-disabled').disabled = this.checked;"></xy-switch>

```html
<xy-tab>
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content label="tab2" disabled>tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>
```

JavaScript操作`get`、`set`

> 作用于`xy-tab-content`

```js
//xy-tab-content
content.disabled;
content.disabled = true;
content.disabled = false;
//原生属性操作
content.getAttribute('disabled');
content.setAttribute('disabled','');
content.removeAttribute('disabled');
```

## 标识`key`、`activekey`

每个`xy-tab-content`需要指定一个标识`key`，没有会默认以序列号为`key`，

`activekey`作用在`xy-tab`上，可以指定切换到具体标签页，也可以指定初始值。

<xy-tab activekey="B">
    <xy-tab-content label="tab1" key="A">tab1</xy-tab-content>
    <xy-tab-content label="tab2" key="B">tab2</xy-tab-content>
    <xy-tab-content label="tab3" key="C">tab3</xy-tab-content>
</xy-tab>
<xy-button type="primary" onclick="this.previousElementSibling.activekey='C'">跳转tab3</xy-button>

```html
<xy-tab activekey="B">
    <xy-tab-content label="tab1" key="A">tab1</xy-tab-content>
    <xy-tab-content label="tab2" key="B">tab2</xy-tab-content>
    <xy-tab-content label="tab3" key="C">tab3</xy-tab-content>
</xy-tab>
<xy-button type="primary" onclick="this.previousElementSibling.activekey='C'">跳转tab3</xy-button>
```

JavaScript操作`get`、`set`

```js
tab.activekey;
tab.activekey = 'key';
//原生属性操作
tab.getAttribute('activekey');
tab.setAttribute('activekey','key');
```

## 图标`icon`

每个`xy-tab-content`可以指定`icon`，配合`label`实现图标加文字的效果。

<xy-tab>
    <xy-tab-content label="home" icon="home">tab1</xy-tab-content>
    <xy-tab-content label="message" icon="message">tab2</xy-tab-content>
    <xy-tab-content label="user" icon="user">tab3</xy-tab-content>
</xy-tab>

```html
<xy-tab>
    <xy-tab-content label="home" icon="home">tab1</xy-tab-content>
    <xy-tab-content label="message" icon="message">tab2</xy-tab-content>
    <xy-tab-content label="user" icon="user">tab3</xy-tab-content>
</xy-tab>
```

也可以单独指定`icon`，不使用`label`。

<xy-tab>
    <xy-tab-content icon="home">tab1</xy-tab-content>
    <xy-tab-content icon="message">tab2</xy-tab-content>
    <xy-tab-content icon="user">tab3</xy-tab-content>
</xy-tab>

```html
<xy-tab>
    <xy-tab-content icon="home">tab1</xy-tab-content>
    <xy-tab-content icon="message">tab2</xy-tab-content>
    <xy-tab-content icon="user">tab3</xy-tab-content>
</xy-tab>
```

JavaScript操作`get`、`set`

> 作用于`xy-tab-content`

```js
//xy-tab-content
content.icon;
content.icon = 'name';
//原生属性操作
content.getAttribute('icon');
content.setAttribute('icon','name');
```

## 风格`type`

可选择标签页风格，`flat`、`card`，默认为`flat`

* `card`卡片式风格，通常适用于有背景的卡片中
* `line`线框式风格

<xy-radio-group onchange="this.nextElementSibling.type=this.value" defaultvalue="flat">
    <xy-radio value="flat">flat</xy-radio>
    <xy-radio value="card">card</xy-radio>
    <xy-radio value="line">line</xy-radio>
</xy-radio-group>
<xy-tab type="flat" style="padding:.8em;">
    <xy-tab-content label="home" icon="home">tab1</xy-tab-content>
    <xy-tab-content label="message" icon="message">tab2</xy-tab-content>
    <xy-tab-content label="user" icon="user">tab3</xy-tab-content>
</xy-tab>
<style>
xy-tab[type="card"]{
    background:#f1f1f1;
}
</style>

```css
xy-tab[type="card"]{
    padding:.8em; 
    background:#f1f1f1;
}
```
```html
<xy-tab type="card">
    ...
</xy-tab>
```

> 纯`CSS`修改(属性选择器)，当设置成`card`或者`line`风格时，容器不再有滚动动画


## 对齐`align`

设置标签头的对齐方式，默认为`start`(居左)，可设置`center`(居中)、`end`（居右）

<xy-radio-group onchange="this.nextElementSibling.align=this.value" defaultvalue="start">
    <xy-radio value="start">start</xy-radio>
    <xy-radio value="center">center</xy-radio>
    <xy-radio value="end">end</xy-radio>
</xy-radio-group>
<xy-tab type="card" style="padding:.8em; background:#f1f1f1">
    <xy-tab-content label="home" icon="home">tab1</xy-tab-content>
    <xy-tab-content label="message" icon="message">tab2</xy-tab-content>
    <xy-tab-content label="user" icon="user">tab3</xy-tab-content>
</xy-tab>

```html
<xy-tab type="card" align="center">
    ...
</xy-tab>
```

JavaScript操作`get`、`set`

> 作用于`xy-tab`

```js
//xy-tab
tab.align;
tab.align = 'center';
//原生属性操作
tab.getAttribute('align');
tab.setAttribute('align','center');
```

## 事件`event`

### onchange

`xy-tab`切换完成时触发。

<xy-tab onchange="XyMessage.info(event.detail.label)">
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>

```html
<xy-tab onchange="XyMessage.info(event.detail.label)">
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>
```


```js
tab.onchange = function(ev){
    //获取key、index和label的几种方式
    /*
    event:{
        detail:{
            key,
            index,
            label,
        }
    }
    */
    const { key, index, label } = ev.detail;
    console.log(key, index, label);
}

tab.addEventListener('change',function(ev){
    const { key, index, label } = ev.detail;
    console.log(key, index, label);
})
```

## 其他

当`tab`比较多时，超出范围，会自动滚动。

<xy-tab>
    <xy-tab-content label="tab11111111111111">tab1</xy-tab-content>
    <xy-tab-content label="tab2222222222222">tab2</xy-tab-content>
    <xy-tab-content label="tab333333333">tab3</xy-tab-content>
    <xy-tab-content label="tab4">tab4</xy-tab-content>
    <xy-tab-content label="tab5">tab5</xy-tab-content>
    <xy-tab-content label="tab64444444444">tab6</xy-tab-content>
    <xy-tab-content label="tab7">tab7</xy-tab-content>
    <xy-tab-content label="tab855555555">tab8</xy-tab-content>
    <xy-tab-content label="tab9">tab9</xy-tab-content>
    <xy-tab-content label="tab106666666666">tab10</xy-tab-content>
</xy-tab>

各个组件相互独立，可以随意嵌套，如下。

<xy-tab>
    <xy-tab-content label="tab1">
        <xy-tab>
            <xy-tab-content label="1-tab1">1-tab1</xy-tab-content>
            <xy-tab-content label="1-tab2">1-tab2</xy-tab-content>
            <xy-tab-content label="1-tab3">1-tab3</xy-tab-content>
        </xy-tab>
    </xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>

```html
<xy-tab>
    <xy-tab-content label="tab1">
        <xy-tab>
            <xy-tab-content label="1-tab1">1-tab1</xy-tab-content>
            <xy-tab-content label="1-tab2">1-tab2</xy-tab-content>
            <xy-tab-content label="1-tab3">1-tab3</xy-tab-content>
        </xy-tab>
    </xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3">tab3</xy-tab-content>
</xy-tab>
```


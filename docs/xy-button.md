# xy-button

按钮。用于替代原生`button`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-button.js';
</script>
<!-- 使用 -->
<xy-button>button</xy-button>
```

## 风格`type`

按钮有5种风格，分别为`primary`，`dashed`，`flat`，`danger`和默认。

<xy-button type="primary" id="btn">primary</xy-button>
<xy-button type="dashed">dashed</xy-button>
<xy-button type="flat">flat</xy-button>
<xy-button type="danger">danger</xy-button>
<xy-button>default</xy-button>

```html
<xy-button type="primary">primary</xy-button>
<xy-button type="dashed">dashed</xy-button>
<xy-button type="flat">flat</xy-button>
<xy-button type="danger">danger</xy-button>
<xy-button>default</xy-button>
```

## 链接`href`

当设置`href`属性时，`xy-button`内部会渲染成`a`标签。

<xy-button type="primary" href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button type="dashed" href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button type="flat" href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
<xy-button href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>


```html
<xy-button href="https://github.com/XboxYan/xy-ui">visit xy-ui</xy-button>
```

此外，还可以设置`download`、`target`和`rel`属性，同原生`a`标签。

<xy-img src="/img/Gokou Ruri.gif"></xy-img>

<xy-button href="/img/Gokou Ruri.gif" download="Gokou Ruri">download</xy-button>

```html
<xy-button href="/img/Gokou Ruri.gif" download="Gokou Ruri">download</xy-button>
```

## 禁用`disabled`

通过`disabled`可以禁用按钮，禁用后该按钮上的事件失效。

<xy-button disabled type="primary">primary</xy-button>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

<xy-button disabled type="dashed">dashed</xy-button>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

<xy-button disabled type="flat">flat</xy-button>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

<xy-button disabled >default</xy-button>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

<xy-button href="https://github.com/XboxYan/xy-ui" disabled>visit xy-ui</xy-button>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-button disabled type="primary">primary</xy-button>
<xy-button disabled type="dashed">dashed</xy-button>
<xy-button disabled type="flat">flat</xy-button>
<xy-button disabled >default</xy-button>
```

JavaScript操作`get`、`set`

```js
btn.disabled;//获取
btn.disabled = false;
btn.disabled = true;
//原生属性操作
btn.getAttribute('disabled');
btn.setAttribute('disabled','');
btn.removeAttribute('disabled');
```

!> 所有组件关于属性的获取和设置均类似，如下

```js
com.props;//获取
com.props = newProps;
//原生属性操作
com.setAttribute('props',newProps);
com.removeAttribute('props');
```

## 按钮组`xy-button-group`

`<xy-button-group>`可以将一组同类型的按钮组合起来。

<xy-button-group>
    <xy-button>button1</xy-button>
    <xy-button>button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>

<p></p>

<xy-button-group>
    <xy-button type="primary">button1</xy-button>
    <xy-button type="primary">button2</xy-button>
    <xy-button type="primary">button3</xy-button>
    <xy-button type="primary">button4</xy-button>
</xy-button-group>

<p></p>

<xy-button-group>
    <xy-button type="dashed">button1</xy-button>
    <xy-button type="dashed">button2</xy-button>
    <xy-button type="dashed">button3</xy-button>
    <xy-button type="dashed">button4</xy-button>
</xy-button-group>

<p></p>

<xy-button-group>
    <xy-button type="flat">button1</xy-button>
    <xy-button type="flat">button2</xy-button>
    <xy-button type="flat">button3</xy-button>
    <xy-button type="flat">button4</xy-button>
</xy-button-group>

<p></p>

<xy-button-group>
    <xy-button type="primary">button1</xy-button>
    <xy-button type="primary">button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>

```html
<xy-button-group>
    <xy-button>button1</xy-button>
    <xy-button>button2</xy-button>
    <xy-button>button3</xy-button>
    <xy-button>button4</xy-button>
</xy-button-group>
```


## 状态切换`toggle`

可以给按钮添加`toggle`属性，来实现简单的按钮状态切换。

可以简单的通过`checked`属性改变样式。

<style>
.button-toggle[checked]{
    background:var(--themeColor);
    color:#fff;
}
</style>
<xy-button toggle class="button-toggle">toggle button</xy-button>

```html
<style>
.button-toggle[checked]{
    background:var(--themeColor);
    color:#fff;
}
</style>
<xy-button toggle class="button-toggle">toggle button</xy-button>
```

也可以通过`js`获取到`checked`属性。

<xy-button toggle class="button-toggle" icon="like" onclick="XyMessage.show({icon:'like',text:this.checked?'I dislike it':'I like it'})">like</xy-button>

```js
btn.addEventListener('click',function(ev){
    if(this.checked){
        //do something
    }else{
        //do something
    }
})
```

## 加载`loading`

添加`loading`属性即可让按钮处于加载状态，处于加载状态所有事件会被禁用，类似于`disabled`

<xy-button type="primary" loading>loading</xy-button>
<xy-switch checked onchange="this.previousElementSibling.loading = this.checked;"></xy-switch>

```html
<xy-button type="primary" loading>loading</xy-button>
```

JavaScript操作`get`、`set`

```js
btn.loading;
btn.loading = false;
btn.loading = true;
//原生属性操作
btn.getAttribute('loading');
btn.setAttribute('loading','');
btn.removeAttribute('loading');
```

## 图标`icon`

当需要在`xy-button`内嵌入`xy-icon`时，可以设置`icon`属性。

关于`xy-icon`的取值可以查看[`xy-icon`](xy-icon.md)

<xy-button type="primary" icon="heart">like</xy-button>
<xy-button type="dashed" icon="search">search</xy-button>
<xy-button type="flat" icon="left">back</xy-button>
<xy-button icon="link">link</xy-button>

```html
<xy-button type="primary" icon="heart">like</xy-button>
<xy-button type="dashed" icon="search">search</xy-button>
<xy-button type="flat" icon="left">back</xy-button>
<xy-button icon="link">link</xy-button>
```

JavaScript操作`set`

```js
btn.icon = 'name';
//原生属性操作
btn.setAttribute('icon','name');
```

当然，上述图标均位于文字左侧，如果想位于文字右侧，你可以直接嵌套`xy-icon`组件。

<xy-button>heart<xy-icon name="heart"></xy-icon></xy-button>
<xy-button>right<xy-icon name="right"></xy-icon></xy-button>

```html
<xy-button>heart  <xy-icon name="heart"></xy-icon></xy-button>
<xy-button>right  <xy-icon name="right"></xy-icon></xy-button>
```

## 形状`shape`

当只有`icon`时，可配合`shape=circle`属性，实现圆形图标按钮。

<xy-button type="primary" icon="heart" shape="circle"></xy-button>
<xy-button type="dashed" icon="heart" shape="circle"></xy-button>
<xy-button type="flat" icon="heart" shape="circle"></xy-button>
<xy-button icon="heart" shape="circle"></xy-button>

```html
<xy-button type="primary" icon="heart" shape="circle"></xy-button>
<xy-button type="dashed" icon="heart" shape="circle"></xy-button>
<xy-button type="flat" icon="heart" shape="circle"></xy-button>
<xy-button icon="heart" shape="circle"></xy-button>
```

## 块状`block`

`block`属性将使按钮适合其父宽度。

<xy-button type="primary" block>primary</xy-button>
<xy-button type="dashed" block>dashed</xy-button>
<xy-button type="flat" block>flat</xy-button>
<xy-button block>default</xy-button>

```html
<xy-button type="primary" block>primary</xy-button>
<xy-button type="dashed" block>dashed</xy-button>
<xy-button type="flat" block>flat</xy-button>
<xy-button block>default</xy-button>
```

当然该属性只是样式的重置，你可以通过`CSS`来实现

```css
xy-button{
    diplay:flex;
}
```

## 事件`event`

与普通`button`标签一致。

### onfocus、onblur

`focus`、`blur`后的回调事件。

<xy-button onfocus="XyMessage.info('focus')" onblur="XyMessage.info('blur')">primary</xy-button>

```html
<xy-button onfocus="XyMessage.info('focus')" onblur="XyMessage.info('blur')">primary</xy-button>
```

其他触发方式

```js
btn.onfocus = function(ev){
    console.log(ev)
}

btn.addEventListener('focus',function(ev){
    console.log(ev)
})
```

### 其他事件

`onclick`、`onmousedown`等等，使用方式同上。

## 方法`function`

### focus

用于主动聚焦`focus`，聚焦以后可以响应键盘事件，`Enter`可以触发`click`事件。

<xy-button onclick="XyMessage.info('click')" onfocus="XyMessage.info('focus')" onblur="XyMessage.info('blur')" >primary</xy-button>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
btn.focus();
```

## 自定义样式

目前可以修改的部分样式如下

```css
:host{ 
    display:inline-flex; 
    padding:0 .8em; 
    box-sizing:border-box; 
    height: 36px; 
    align-items:center;
    justify-content: center;
    border:1px solid #ddd; 
    font-size: 14px; 
    color: #333;  
    border-radius: 3px; 
}
```

下面是一个自定义样式的按钮

<style>
.custom-button{
    font-size:20px;
    border-radius:50%;
    height:100px;
    width:100px;
}
</style>
<xy-button type="primary" class="custom-button">primary</xy-button>

```html
<style>
.custom-button{
    font-size:20px;
    border-radius:50%;
    height:100px;
    width:100px;
}
</style>
<xy-button type="primary" class="custom-button">primary</xy-button>
```

也可以通过修改`font-size`来控制按钮尺寸

<style>
.custom-button2{
    font-size:30px;
}
</style>
<xy-button type="primary" class="custom-button2">primary</xy-button>

```html
<style>
.custom-button2{
    font-size:30px;
}
</style>
<xy-button type="primary" class="custom-button2">primary</xy-button>
```

> 大部分组件均可通过`font-size`来控制组件尺寸

此外，所有组件均有主题颜色`themeColor`，通过`CSS`自定义属性实现

详细可参考[主题](themeColor.md)。
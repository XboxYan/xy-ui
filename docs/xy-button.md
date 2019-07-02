# xy-button

用于替代原生`button`

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/xy-button.mjs';
</script>
<!-- 使用 -->
<xy-button>button</xy-button>
```

## 类型`type`

按钮有4种类型，分别为`primary`，`dashed`，`flat`和默认。

<xy-button type="primary" id="btn">primary</xy-button>
<xy-button type="dashed">dashed</xy-button>
<xy-button type="flat">flat</xy-button>
<xy-button>default</xy-button>

```html
<xy-button type="primary">primary</xy-button>
<xy-button type="dashed">dashed</xy-button>
<xy-button type="flat">flat</xy-button>
<xy-button>default</xy-button>
```

## 禁用`disabled`

通过`disabled`可以禁用按钮，禁用后该按钮上的事件失效。

<xy-button disabled type="primary">primary</xy-button>
<xy-button disabled type="dashed">dashed</xy-button>
<xy-button disabled type="flat">flat</xy-button>
<xy-button disabled >default</xy-button>

```html
<xy-button disabled type="primary">primary</xy-button>
<xy-button disabled type="dashed">dashed</xy-button>
<xy-button disabled type="flat">flat</xy-button>
<xy-button disabled >default</xy-button>
```

JavaScript操作

```js
btn.disabled = false;
btn.disabled = true;
//原生属性操作
btn.setAttribute('disabled','');
btn.removeAttribute('disabled');
```

## 加载`loading`

添加`loading`属性即可让按钮处于加载状态，处于加载状态所有事件会被禁用，类似于`disabled`

<xy-button type="primary" loading>loading</xy-button>

```html
<xy-button type="primary" loading>loading</xy-button>
```

JavaScript操作

```js
btn.loading = false;
btn.loading = true;
//原生属性操作
btn.setAttribute('loading','');
btn.removeAttribute('loading');
```

## 图标`icon`

当需要在`xy-button`内嵌入`xy-icon`时，可以设置`icon`属性。

关于`xy-icon`的取值可以查看[`xy-icon`](/xy-icon.md)

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

```js
btn.icon = 'name';
//原生属性操作
btn.setAttribute('icon','name');
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

## 自定义样式

目前可以修改的部分样式如下

```css
:host{ 
    display:inline-block; 
    line-height: 2.4; 
    font-size: 14px; 
    color: #333;  
    border-radius: 3px; 
}
```

下面是一个自定义样式的按钮
```html
<style>
.custom-button{
    font-size:20px;
    border-radius:5px;
    line-height:40px;
}
</style>
<xy-button type="primary" class="custom-button">primary</xy-button>
```

<style>
.custom-button{
    font-size:20px;
    border-radius:5px;
    line-height:40px;
}
</style>
<xy-button type="primary" class="custom-button">primary</xy-button>

此外，所有组件均有主题颜色`themeColor`，通过`CSS`自定义属性实现

详细可参考[主题](/主题.md)。
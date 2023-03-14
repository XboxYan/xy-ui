<script setup>
  import './index.css'
  import '../../components/icon/'
  import '../../components/checkbox/'
</script>

# icon

语义化的矢量图形。

图标来源：[https://fontawesome.com](https://fontawesome.com/v6/search?o=r&m=free&s=regular%2Csolid) 免费图标

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/xy-icon.js';
</script>
<!-- 使用 -->
<xy-icon name="user" size="30" color="orangered"></xy-icon>
```

## 名称`name`

图标名称与图标包名称相同，可参考[https://fontawesome.com](https://fontawesome.com/v6/search?o=r&m=free&s=regular%2Csolid)

<div class="wrap">
<xy-icon size="40" name="user"></xy-icon>
<xy-icon size="40" name="flag"></xy-icon>
<xy-icon size="40" name="image"></xy-icon>
<xy-icon size="40" name="star"></xy-icon>
<xy-icon size="40" name="face-smile"></xy-icon>
<xy-icon size="40" name="bell"></xy-icon>
<xy-icon size="40" name="audio"></xy-icon>
</div>

```html
<xy-icon name="user"></xy-icon>
<xy-icon name="flag"></xy-icon>
<xy-icon name="image"></xy-icon>
<xy-icon name="star"></xy-icon>
<xy-icon name="face-smile"></xy-icon>
<xy-icon name="bell"></xy-icon>
<xy-icon name="audio"></xy-icon>
```

JavaScript操作`set`

```js
icon.name = 'user';
//原生属性操作
icon.setAttribute('name','user');
```

## 类型`type`

图标有两种类型，`regular（常规、线性）`（默认）和`solid（填充）`

::: tip
并不是每种图标都对应两种风格，具体可以查看 [https://fontawesome.com](https://fontawesome.com/v6/search?o=r&m=free&s=regular%2Csolid)
:::

<div class="wrap">
<xy-icon name="flag" size="40"></xy-icon>
<xy-icon name="flag" type="solid" size="40"></xy-icon>
<xy-icon name="clock" size="40"></xy-icon>
<xy-icon name="clock" type="solid" size="40"></xy-icon>
<xy-icon name="star" size="40"></xy-icon>
<xy-icon name="star" type="solid" size="40"></xy-icon>
</div>

```html
<xy-icon name="flag"></xy-icon>
<xy-icon name="flag" type="solid"></xy-icon>
<xy-icon name="clock"></xy-icon>
<xy-icon name="clock" type="solid"></xy-icon>
<xy-icon name="star"></xy-icon>
<xy-icon name="star" type="solid"></xy-icon>
```

JavaScript操作`set`

```js
icon.type = 'solid';
//原生属性操作
icon.setAttribute('type','solid');
```


## 尺寸`size`

通过`size`可以设置图标尺寸，默认为`font-size`大小。

<div class="wrap">
<xy-icon name="flag" size="20"></xy-icon>
<xy-icon name="flag" size="30"></xy-icon>
<xy-icon name="flag" size="40"></xy-icon>
<xy-icon name="flag" size="50"></xy-icon>
</div>

```html
<xy-icon name="flag" size="20"></xy-icon>
<xy-icon name="flag" size="30"></xy-icon>
<xy-icon name="flag" size="40"></xy-icon>
<xy-icon name="flag" size="50"></xy-icon>
```

CSS操作（推荐）

```css
xy-icon{
    font-size:30;
}
```

JavaScript操作`get`、`set`

```js
icon.size;
icon.size = 30;
//原生属性操作
icon.getAttribute('size');
icon.setAttribute('size',30);
```

::: tip
CSS操作更灵活，可以写在样式中，属性值和JavaScript操作优先级更高，下同
:::

## 颜色`color`

通过`color`可以设置图标颜色，默认为`color`文字颜色。

<div class="wrap">
<xy-icon size="40" name="flag" color="orangered"></xy-icon>
<xy-icon size="40" name="flag" color="#1E90FF"></xy-icon>
<xy-icon size="40" name="flag" color="#F44336"></xy-icon>
<xy-icon size="40" name="flag" color="#3F51B5"></xy-icon>
</div>

```html
<xy-icon name="flag" color="orangered"></xy-icon>
<xy-icon name="flag" color="#1E90FF"></xy-icon>
<xy-icon name="flag" color="#F44336"></xy-icon>
<xy-icon name="flag" color="#3F51B5"></xy-icon>
```

CSS操作（推荐）

```css
xy-icon{
    color: orangered;
}
```

JavaScript操作`get`、`set`

```js
icon.color;
icon.color = 'orangered';
//原生属性操作
icon.getAttribute('color');
icon.setAttribute('color','orangered');
```

## 旋转`spin`

添加`spin`属性可以让图标旋转起来，实现`loading`的效果

<div class="wrap">
<xy-icon size="40" name="spinner" type="solid" spin></xy-icon>
<xy-icon size="40" name="rotate" type="solid" spin></xy-icon>
<xy-icon size="40" name="yin-yang" type="solid" spin></xy-icon>
<xy-icon size="40" name="arrow-rotate-right" type="solid" spin></xy-icon>
</div>

```html
<xy-icon name="spinner" type="solid" spin></xy-icon>
<xy-icon name="rotate" type="solid" spin></xy-icon>
<xy-icon name="yin-yang" type="solid" spin></xy-icon>
<xy-icon name="arrow-rotate-right" type="solid" spin></xy-icon>
```

> 其实就是一个`css`动画

JavaScript操作`get`、`set`

```js
icon.spin;
icon.spin = false;
icon.spin = true;
//原生属性操作
icon.getAttribute('spin');
icon.setAttribute('spin','');
icon.removeAttribute('spin');
icon.toggleAttribute('spin', [force]);
```

可以简单实现一个自定义 `loading`

<div class="wrap">
<xy-icon name="spinner" type="solid" spin style="color: var(--primary-color)"></xy-icon>
<xy-checkbox checked onchange="this.previousElementSibling.spin = this.checked;">加载</xy-checkbox>
</div>
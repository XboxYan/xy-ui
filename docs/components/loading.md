<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/icon/')
    import('../../components/loading/')
  })
</script>

# loading

加载器，用于页面和区块的加载中状态。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/loading/index.js';
</script>
<!-- 使用 -->
<xy-loading></xy-loading>
```

## 尺寸`size`

通过`size`可以设置加载器尺寸，默认为`font-size`大小。

<div class="wrap">
<xy-loading></xy-loading>
<xy-loading size="30"></xy-loading>
<xy-loading size="40"></xy-loading>
<xy-loading size="50"></xy-loading>
</div>

```html
<xy-loading></xy-loading>
<xy-loading size="30"></xy-loading>
<xy-loading size="40"></xy-loading>
<xy-loading size="50"></xy-loading>
```

CSS操作（推荐）

```css
xy-loading{
    font-size:30px;
}
```

JavaScript操作`get`、`set`

```js
loading.size;
loading.size = 30;
//原生属性操作
loading.getAttribute('size');
loading.setAttribute('size',30);
```

::: tip
CSS操作更灵活，可以写在样式中，属性值和JavaScript操作优先级更高，下同
:::

## 颜色`color`

通过`color`可以设置加载器颜色，默认为主题颜色`--primary-color`。

<div class="wrap">
<xy-loading size="40"></xy-loading>
<xy-loading size="40" color="green"></xy-loading>
<xy-loading size="40" color="olivedrab"></xy-loading>
<xy-loading size="40" color="orange"></xy-loading>
</div>

```html
<xy-loading size="40"></xy-loading>
<xy-loading size="40" color="green"></xy-loading>
<xy-loading size="40" color="olivedrab"></xy-loading>
<xy-loading size="40" color="orange"></xy-loading>
```

CSS操作（推荐）

```css
xy-loading{
    color:orangered;
}
```

JavaScript操作`get`、`set`

```js
loading.color;
loading.color = 'orangered';
//原生属性操作
loading.getAttribute('color');
loading.setAttribute('color','orangered');
```

## 其他

可以直接嵌套文本作为加载提示语

<div class="wrap">
<xy-loading>loading...</xy-loading>
</div>

```html
<xy-loading>loading...</xy-loading>
```

如果需要垂直排列，设置一下`css`就可以了

<div class="wrap">
<xy-loading style="flex-direction:column">loading...</xy-loading>
</div>

```html
<style>
xy-loading{
    flex-direction:column
}
</style>
<xy-loading>loading...</xy-loading>
```

如需其他图标的`loading`可参考[icon](icon?#旋转spin)
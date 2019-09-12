# xy-layout

布局，基于`flex`和`grid`的简单实现。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-layout.js';
</script>
<!-- 使用 -->
<xy-layout row expand>
    <xy-layout class="side"></xy-layout>
    <xy-layout expand center class="main">
        <xy-layout center class="box">xy-layout</xy-layout>
    </xy-layout>
    <xy-layout class="side"></xy-layout>
</xy-layout>

<xy-row gutter="10">
    <xy-col span="4">col-4</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="4">col-4</xy-col>
</xy-row>
```

内部仅仅根据属性选择器实现，属性可叠加使用。

## 水平排列`row`

默认为垂直排列，`row`表示水平排列。

<xy-layout row>
    <xy-layout class="box">1</xy-layout>
    <xy-layout class="box box-o">2</xy-layout>
</xy-layout>

```html
<xy-layout row>
    <xy-layout class="box">1</xy-layout>
    <xy-layout class="box box-o">2</xy-layout>
</xy-layout>
```

## 填充`expand`

根据剩余空间填充（主轴方向）。

<xy-layout row>
    <xy-layout class="box" expand>1</xy-layout>
    <xy-layout class="box box-o">2</xy-layout>
</xy-layout>

```html
<xy-layout row>
    <xy-layout class="box" expand>1</xy-layout>
    <xy-layout class="box box-o">2</xy-layout>
</xy-layout>
```

如果有多个，则会等分剩余空间。

<xy-layout row>
    <xy-layout class="box">1</xy-layout>
    <xy-layout class="box box-o" expand>2</xy-layout>
    <xy-layout class="box" expand>3</xy-layout>
</xy-layout>

```html
<xy-layout row>
    <xy-layout class="box">1</xy-layout>
    <xy-layout class="box box-o" expand>2</xy-layout>
    <xy-layout class="box" expand>3</xy-layout>
</xy-layout>
```

## 居中`center`

默认水平垂直居中，可以指定某一方向居中，主轴`mainAxis`和交叉轴`crosAxis`。

<xy-layout center style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>

```html
<xy-layout center style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>
```

`center="crosAxis"`

<xy-layout row center="crosAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>

```html
<xy-layout row center="crosAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>
```

`center="mainAxis"`

<xy-layout row center="mainAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>

```html
<xy-layout row center="mainAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>
```

## 栅格`row`、`col`

现在支持栅格系统，基于`grid`布局

`24`栅格系统。把水平方向行`xy-row`平均分为`24`份，然后指定每一列`xy-col`的跨越范围`span`

<xy-row gutter="10">
    <xy-col span="12">col-12</xy-col>
    <xy-col span="12">col-12</xy-col>
    <xy-col span="4">col-4</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="4">col-4</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
</xy-row>

```html
<xy-row gutter="10">
    <xy-col span="12">col-12</xy-col>
    <xy-col span="12">col-12</xy-col>
    <xy-col span="4">col-4</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="4">col-4</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
</xy-row>
```

## 间隔`gutter`

通过`gutter`属性可以设置栅格间隔

<xy-slider type="number" min="0" max="24" suffix="px" defaultvalue="10" showtips oninput="this.nextElementSibling.gutter=this.value"></xy-slider>
<xy-row gutter="10">
    <xy-col span="4">col-4</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="8">col-8</xy-col>
    <xy-col span="4">col-4</xy-col>
</xy-row>

JavaScript操作`get`、`set`

```js
row.gutter;//获取
row.gutter = 10;
//原生属性操作
row.getAttribute('gutter');
row.setAttribute('gutter',10);
```

## 示例

下面是一个`xy-layout`简单的示例。

<xy-layout class="layout">
    <xy-layout class="header">HEADER</xy-layout>
    <xy-layout row expand>
        <xy-layout class="side"></xy-layout>
        <xy-layout expand center class="main">
            <xy-layout center class="box">xy-layout</xy-layout>
        </xy-layout>
        <xy-layout class="side"></xy-layout>
    </xy-layout>
    <xy-layout class="footer">FOOTER</xy-layout>
</xy-layout>

```html
<xy-layout class="layout">
    <xy-layout class="header">HEADER</xy-layout>
    <xy-layout row expand>
        <xy-layout class="side"></xy-layout>
        <xy-layout expand center class="main">
            <xy-layout center class="box">xy-layout</xy-layout>
        </xy-layout>
        <xy-layout class="side"></xy-layout>
    </xy-layout>
    <xy-layout class="footer">FOOTER</xy-layout>
</xy-layout>
```
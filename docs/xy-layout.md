# xy-layout

布局，基于`flex`的简单实现。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './components/xy-layout.js';
</script>
<!-- 使用 -->
<xy-layout row expand>
    <xy-layout class="side"></xy-layout>
    <xy-layout expand center class="main">
        <xy-layout center class="box">xy-layout</xy-layout>
    </xy-layout>
    <xy-layout class="side"></xy-layout>
</xy-layout>
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

<xy-layout center="crosAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>

```html
<xy-layout center="crosAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>
```

`center="mainAxis"`

<xy-layout center="mainAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>

```html
<xy-layout center="mainAxis" style="height:200px">
    <xy-layout class="box">1</xy-layout>
</xy-layout>
```

## 示例

下面是一个简单的示例。

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
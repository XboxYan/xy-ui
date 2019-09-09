# xy-table

表格，基于`grid`的简单实现，可简单代替`table`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-table.js';
</script>
<!-- 使用 -->
<xy-table>
    <xy-tr>
        <xy-th>Name</xy-th>
        <xy-th>Age</xy-th>
        <xy-th>Address</xy-th>
    </xy-tr>
    <xy-tr>
        <xy-td>John Brown</xy-td>
        <xy-td>32</xy-td>
        <xy-td>New York No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
</xy-table>
```

内部仅仅根据`grid`布局实现，如果不满足需求或者差异太大，也可以直接使用`table`标签。

## 行`xy-tr`、表头`xy-th`、表格`xy-td`

`xy-tr`、`xy-th`、`xy-td`分别对应原生`tr`、`th`、`td`，结构用法如下

<xy-table>
    <xy-tr>
        <xy-th>Name</xy-th>
        <xy-th>Age</xy-th>
        <xy-th>Address</xy-th>
    </xy-tr>
    <xy-tr>
        <xy-td>John Brown</xy-td>
        <xy-td>32</xy-td>
        <xy-td>New York No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
</xy-table>

```html
<xy-table>
    <xy-tr>
        <xy-th>Name</xy-th>
        <xy-th>Age</xy-th>
        <xy-th>Address</xy-th>
    </xy-tr>
    <xy-tr>
        <xy-td>John Brown</xy-td>
        <xy-td>32</xy-td>
        <xy-td>New York No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
</xy-table>
```

默认情况下，`xy-th`居中显示，`xy-td`为默认对齐方式，可简单通过`text-align:center`修改对齐方式

```css
xy-td{
    text-align:center;
}
```

<xy-table style="text-align:center;">
    <xy-tr>
        <xy-th>Name</xy-th>
        <xy-th>Age</xy-th>
        <xy-th>Address</xy-th>
    </xy-tr>
    <xy-tr>
        <xy-td>John Brown</xy-td>
        <xy-td>32</xy-td>
        <xy-td>New York No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
</xy-table>

## 表格分配

默认情况下，表格是均等分配。这里采用了`grid`布局，可实现通过`css`来控制表格分配，默认均等分配如下

```css
xy-table{
    grid-template-columns: repeat(3,1fr); /* 1fr 1fr 1fr */
}
```

如需改成跟随内容自适应，可进行如下修改

<xy-table style="grid-template-columns: auto 1fr 1fr;">
    <xy-tr>
        <xy-th>Name</xy-th>
        <xy-th>Age</xy-th>
        <xy-th>Address</xy-th>
    </xy-tr>
    <xy-tr>
        <xy-td>John Brown</xy-td>
        <xy-td>32</xy-td>
        <xy-td>New York No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
</xy-table>

```css
xy-table{
    grid-template-columns: auto 1fr 1fr; 
    /* 第一列自适应，剩余两项均等分配 */
}
```

也可改为具体数值，如下

<xy-table style="grid-template-columns: 100px auto 1fr;">
    <xy-tr>
        <xy-th>Name</xy-th>
        <xy-th>Age</xy-th>
        <xy-th>Address</xy-th>
    </xy-tr>
    <xy-tr>
        <xy-td>John Brown</xy-td>
        <xy-td>32</xy-td>
        <xy-td>New York No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
</xy-table>

```css
xy-table{
    grid-template-columns: 100px auto 1fr;
     /* 第一列100px，第二列自适应，剩余两项均等分配 */
}
```

> 以上所有规则均为`grid`布局规范

## 加载中`loading`

可以给表格设置`loading`属性，表示加载中，一般用于数据渲染

<xy-table style="grid-template-columns: auto auto 1fr; margin-bottom:20px;" loading>
    <xy-tr>
        <xy-th>Name</xy-th>
        <xy-th>Age</xy-th>
        <xy-th>Address</xy-th>
    </xy-tr>
    <xy-tr>
        <xy-td>John Brown</xy-td>
        <xy-td>32</xy-td>
        <xy-td>New York No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
    <xy-tr>
        <xy-td>Jim Green</xy-td>
        <xy-td>42</xy-td>
        <xy-td>London No. 1 Lake Park</xy-td>
    </xy-tr>
</xy-table>
<xy-switch checked onchange="this.previousElementSibling.loading = this.checked;"></xy-switch>

```html
<xy-table loading>
    ...
</xy-table>
```

JavaScript操作`get`、`set`

```js
table.loading;
table.loading = false;
table.loading = true;
//原生属性操作
table.getAttribute('loading');
table.setAttribute('loading','');
table.removeAttribute('loading');
```
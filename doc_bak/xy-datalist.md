# xy-datalist

数据列表，可以用于各种常见的输入框下拉列表。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-datalist.js';
</script>
<!-- 使用 -->
<xy-input list="city"></xy-input>
<xy-datalist id="city">
    <xy-option value="wuhan">武汉</xy-option>
    <xy-option value="beijin">北京</xy-option>
    <xy-option value="shanghai">上海</xy-option>
</xy-datalist>
```

同原生`datalist`使用方式相同。

## 一般使用

给`xy-input`绑定`list`属性，`xy-datalist`指定相同的`id`即可

可实现原生类似搜索匹配的功能

<xy-input list="city"></xy-input>
<xy-datalist id="city">
    <xy-option value="wuhan">武汉</xy-option>
    <xy-option value="beijin">北京</xy-option>
    <xy-option value="shanghai">上海</xy-option>
</xy-datalist>

```html
<xy-input list="city"></xy-input>
<xy-datalist id="city">
    <xy-option value="wuhan">武汉</xy-option>
    <xy-option value="beijin">北京</xy-option>
    <xy-option value="shanghai">上海</xy-option>
</xy-datalist>
```

> xy-option 可指定`value`属性，作为匹配依据

## 动态补全

可通过给value设置`${value}`关键字符来实现动态补全的效果

<xy-input list="email"></xy-input>
<xy-datalist id="email">
    <xy-option value="${value}@live.com">@live.com</xy-option>
    <xy-option value="${value}@qq.com">@qq.com</xy-option>
    <xy-option value="${value}@yuewen.com">@yuewen.com</xy-option>
</xy-datalist>

```html
<xy-input list="email"></xy-input>
<xy-datalist id="email">
    <xy-option value="${value}@live.com">@live.com</xy-option>
    <xy-option value="${value}@qq.com">@qq.com</xy-option>
    <xy-option value="${value}@yuewen.com">@yuewen.com</xy-option>
</xy-datalist>
```
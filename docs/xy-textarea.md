# xy-textarea

多行输入框。用于替代原生`textarea`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-input.js';
</script>
<!-- 使用 -->
<xy-textarea></xy-textarea>
```

继承自`xy-input.js`。大部分属性通用，不支持`pattern`校验。

<xy-textarea required  placeholder="required"></xy-textarea>

```html
<xy-textarea required  placeholder="required"></xy-textarea>
```

<xy-textarea label="info" placeholder="info" ></xy-textarea>

```html
<xy-textarea label="info" placeholder="info" ></xy-textarea>
```

<xy-textarea icon="location" placeholder="location" ></xy-textarea>

```html
<xy-textarea icon="location" placeholder="location" ></xy-textarea>
```

## 行数`rows`

可以通过`rows`指定`xy-textarea`最大显示行数。

<xy-textarea placeholder="rows" rows="5" ></xy-textarea>

```html
<xy-textarea placeholder="rows" rows="5" ></xy-textarea>
```
<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/select/')
    import('../../components/optgroup/')
    import('../../components/option/')
    import('../../components/checkbox/')
    import('../../components/button/')
    import('../../components/message/').then((res)=> {
        window.message = res.default
    })
  })
</script>

# select

下拉选择器。用于替代原生`select`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/select/index.js';
</script>
<!-- 使用 -->
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

## 值`value`

设置或返回下拉选择器的默认值，如果不设置，则默认选中第一项。

<div class="wrap">
<xy-select value="2">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-button type="primary" onclick="this.previousElementSibling.value='3'">选中Option3</xy-button>
</div>

```html
<xy-select value="2">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

JavaScript操作`get`、`set`

```js
select.value; //获取
select.value = "3";
//原生属性操作
select.setAttribute('value','');
```

:::tip
这里的`value`取决于`xy-option`的`value`属性，如果`xy-option`没有设置`value`属性，默认为`textContent`
:::

## 禁用`disabled`

通过`disabled`可以禁用下拉选择器。

<div class="wrap">
<xy-select disabled>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-checkbox checked onchange="this.previousElementSibling.disabled = this.checked;">禁用</xy-checkbox>
</div>

```html
<xy-select disabled>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

JavaScript操作`get`、`set`

```js
select.disabled; //获取
select.disabled = false;
select.disabled = true;
//原生属性操作
select.setAttribute('disabled','');
select.removeAttribute('disabled');
```

如果设置在`xy-option`可单独禁用某一项

<div class="wrap">
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2" disabled>Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
    <xy-option value="4">Option4</xy-option>
    <xy-option value="5">Option5</xy-option>
</xy-select>
</div>

```html
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2" disabled>Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

## 分组`xy-optgroup`

可以通过`xy-optgroup`进行分组，名称为`label`。

<div class="wrap">
<xy-select>
    <xy-optgroup label="group1">
        <xy-option value="1">Option1</xy-option>
        <xy-option value="2">Option2</xy-option>
        <xy-option value="3">Option3</xy-option>
    </xy-optgroup>
    <xy-optgroup label="group2">
        <xy-option value="4">Option4</xy-option>
        <xy-option value="5">Option5</xy-option>
    </xy-optgroup>
</xy-select>
</div>

```html
<xy-select>
    <xy-optgroup label="group1">
        <xy-option value="1">Option1</xy-option>
        <xy-option value="2">Option2</xy-option>
        <xy-option value="3">Option3</xy-option>
    </xy-optgroup>
    <xy-optgroup label="group2">
        <xy-option value="4">Option4</xy-option>
        <xy-option value="5">Option5</xy-option>
    </xy-optgroup>
</xy-select>
```

如果给分组加上`disabled`属性，可以将下面的选项全部禁用

<div class="wrap">
<xy-select>
    <xy-optgroup label="group1">
        <xy-option value="1">Option1</xy-option>
        <xy-option value="2">Option2</xy-option>
        <xy-option value="3">Option3</xy-option>
    </xy-optgroup>
    <xy-optgroup label="group2" disabled>
        <xy-option value="4">Option4</xy-option>
        <xy-option value="5">Option5</xy-option>
    </xy-optgroup>
</xy-select>
</div>




## 自定义插槽`slot=button`

默认情况下选择器是`xy-button`，如果需要自定义样式，可以指定具名插槽`slot=button`，选中的文本会自动渲染到这个标签上

比如下面是不同风格按钮的选择器

<div class="wrap">
<xy-select>
    <xy-button type="primary" slot="button"></xy-button>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select>
    <xy-button type="dashed" slot="button"></xy-button>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select>
    <xy-button type="flat" slot="button"></xy-button>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<xy-select>
    <xy-button type="link" slot="button"></xy-button>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
</div>

```html
<xy-select>
    <xy-button type="primary" slot="button"></xy-button>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

还可以指定选中文本显示的节点，通过`behavior="selected-value"`指定（没有该属性时默认渲染到`slot="button"`本身）

<style scoped>
.custom-select-button::part(button):active{
    background: transparent;
}
.custom-select-button label{
    position: absolute;
    font-size: 12px;
    background: var(--primary-bg);
    left: 8px;
    top: -8px;
    transform: scale(.8)
}
</style>

<div class="wrap">
<xy-select>
    <xy-button class="custom-select-button" slot="button">
        <label>地区</label>
        <span behavior="selected-value"></span>
    </xy-button>
    <xy-option>北京</xy-option>
    <xy-option>上海</xy-option>
    <xy-option>武汉</xy-option>
</xy-select>
</div>

```html
<style>
.custom-button label{
    position: absolute;
    font-size: 12px;
    background: var(--primary-bg);
    left: 8px;
    top: -8px;
    transform: scale(.8)
}
</style>
<xy-select>
    <xy-button class="custom-button" slot="button">
        <label>地区</label>
        <span behavior="selected-value"></span>
    </xy-button>
    <xy-option>北京</xy-option>
    <xy-option>上海</xy-option>
    <xy-option>武汉</xy-option>
</xy-select>
```

## 事件`event`

### onchange

在下拉选中完成时触发。

<div class="wrap">
<xy-select onchange="message.info('当前选中value:'+this.value)">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
</div>

```html
<xy-select onchange="message.info('当前选中value:'+this.value)">
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
```

```js
select.onchange = function(ev){
    console.log(this.value);
    console.log(this.label);
    console.log(ev.target.value);
    console.log(ev.target.label);
}

select.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(this.label);
    console.log(ev.target.value);
    console.log(ev.target.label);
})
```


## 其他

`xy-select`除了包裹`xy-option`以外，还能包裹其他标签，比如`a`链接

<style>
.xy-link{
    display:block;
    padding:0 .8em;
}
</style>
<div class="wrap">
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
    <a class="xy-link" href="#">link</a>
</xy-select>
</div>

```html
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
    <a class="xy-link" href="#">link</a>
</xy-select>
```
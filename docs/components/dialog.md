<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/icon/')
    import('../../components/button/')
    import('../../components/checkbox/')
    import('../../components/dialog/').then((res)=> {
        window.dialog = res.default
    })
    import('../../components/message/').then((res)=> {
        window.message = res.default
    })
  })
</script>

# dialog

弹窗。用于代替原生`dialog`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import dialog from '../components/dialog/index.js';
    //使用
    dialog.alert('alert');
</script>
<!-- 使用 -->
<xy-dialog open>
    <div>dialog</div>
</xy-dialog>
```

:::tip
`<script type="module"></script>`中的变量是局部变量，如果需要`dialog`在全局范围内使用，可以执行`window.dialog = dialog;`。

如果是在 `vue`、`react`中，可以无需赋值到全局对象
:::

## dialog[method]

与[message](./message)类似，`dialog`也提供了几个静态`API`方法，其实就是图标不同。

* `dialog.alert(config)`

* `dialog.info(config)`

* `dialog.success(config)`

* `dialog.error(config)`

* `dialog.warning(config)`

* `dialog.confirm(config)`


所有方法返回均为`<xy-dialog></xy-dialog>`对象。

`config`支持两种类型的参数。

```js
dialog.alert(title, onsubmit);
dialog.info(title, onsubmit);
dialog.success(title, onsubmit);
dialog.error(title, onsubmit);
dialog.warning(title, onsubmit);
```

<div class="wrap">
<xy-button type="primary" onclick="dialog.alert('这是一个alert弹窗')">alert</xy-button>
<xy-button type="primary" onclick="dialog.info('这是一个info弹窗')">info</xy-button>
<xy-button type="primary" onclick="dialog.success('这是一个success弹窗')">success</xy-button>
<xy-button type="primary" onclick="dialog.error('这是一个error弹窗')">error</xy-button>
<xy-button type="primary" onclick="dialog.warning('这是一个warning弹窗')">warning</xy-button>
</div>

还支持`Object`参数类型，好处是可以自定义更多参数

```js
//object传入
dialog.alert({
    title:'title',//标题
    submittext:'ok',//确定键文本
    canceltext:'cancel',//取消键文本
    onsubmit:function(){
        //按确定键的操作
    },
    content:'content',//内容
});
```

<div class="wrap">
<xy-button type="primary" onclick="dialog.success({title:'自定义标题',content:'我是自定义success弹窗', submittext:'自定义确认按钮'})">自定义参数的success</xy-button>
</div>


`dialog.confirm`有两个按钮，确定键和取消键

```js
dialog.confirm(title, onsubmit, oncancel);
//object传入
dialog.confirm({
    title:'title',//标题
    submittext:'ok',//确定键文本
    canceltext:'cancel',//取消键文本
    onsubmit:function(){
        //按确定键的操作
    },
    oncancel:function(){
        //按取消键的操作
    },
    content:'content',//内容
});
```

<div class="wrap">
<xy-button type="primary" onclick="dialog.confirm('这是一个 confirm 弹窗',()=>{message.info('submit')},()=>{message.info('cancel')})">confirm</xy-button>
</div>

## 显示`open`

当`dialog`内容比较复杂时，可以直接写在页面上，通过`open`属性来控制显示。

<xy-dialog id="dialog01" title="自定义弹窗内容" submittext="确 定">
    这里是是自定义内容
    <xy-checkbox>删除历史记录</xy-checkbox>
</xy-dialog>
<div class="wrap">
<xy-button type="primary" onclick="document.getElementById('dialog01').open = true;">open dialog</xy-button>
</div>

```html
<xy-dialog title="自定义弹窗内容">
    这里是是自定义内容
    <xy-checkbox>删除历史记录</xy-checkbox>
</xy-dialog>
```

JavaScript操作`set`

```js
dialog.open = false;
dialog.open = true;
//原生属性操作
dialog.setAttribute('open',true);
```

## 插槽 `slot=icon`、`slot=footer`

提供两个额外插槽，可以用来自定义图标和页脚（支持多个，比如多个按钮）

<xy-dialog id="dialog1x" title="自定义插槽">
    <xy-icon slot="icon" name="solid/mug-hot" color="#ff7875"></xy-icon>
    这里是是自定义内容
    <xy-button type="flat" slot="footer" close danger>算了</xy-button>
    <xy-button type="primary" slot="footer" danger>删除</xy-button>
</xy-dialog>

<div class="wrap">
<xy-button type="primary" onclick="document.getElementById('dialog1x').open = true;">open dialog</xy-button>
</div>

```html
<xy-dialog id="dialog1x" title="自定义插槽">
    <xy-icon slot="icon" name="solid/mug-hot" color="#ff7875"></xy-icon>
    这里是是自定义内容
    <xy-button type="flat" slot="footer" close danger>算了</xy-button>
    <xy-button type="primary" slot="footer" danger>删除</xy-button>
</xy-dialog>
```

> 给按钮添加`close`属性可以自动关闭弹窗

## 加载`loading`

实际业务中可能会出现异步关闭的情况，可以在`onsubmit`回调中添加`loading`属性，在异步操作结束后主动关闭弹窗。

<xy-dialog id="dialog02" title="标题" >
    这是一个异步关闭的弹窗
</xy-dialog>
<div class="wrap">
<xy-button type="primary" onclick="window.dialog02 = document.getElementById('dialog02');window.dialog02.open = true;window.dialog02.onsubmit = function(){this.loading = true;setTimeout(()=>{this.open = false;}, 2000);}">open dialog</xy-button>
</div>

```js
dialog.onsubmit = function(){
    this.loading = true;
    setTimeout(()=>{
        this.open = false;
    }, 2000);
}
```

JavaScript操作`set`

```js
dialog.loading = false;
dialog.loading = true;
//原生属性操作
dialog.setAttribute('loading',true);
```

## 自定义样式`::part(dialog)`，`::part(title)`，`::part(footer)`

由于内部结构比较多，这里暴露了弹窗、标题和页脚用来自定义样式

内部结构如下（可查看控制台）：

```html
<xy-dialog>
  # shadow-root
  <dialog part="dialog">
    <h4 part="title">
    <slot></slot>
    <slot name="footer" part="footer">
```

比如下面是一个标题和按钮居中的弹窗

<style scoped>
.custom-dialog::part(dialog){
    width: 400px;
}
.custom-dialog::part(title){
    text-align: center
}
.custom-dialog::part(footer){
    justify-content: center
}
</style>

<xy-dialog class="custom-dialog" id="dialog03" title="标题" >
    这是一个自定义样式的弹窗
</xy-dialog>
<div class="wrap">
<xy-button type="primary" onclick="document.getElementById('dialog03').open = true">自定义样式的弹窗</xy-button>
</div>

```css
xy-dialog::part(dialog){
    width: 400px;
}
xy-dialog::part(title){
    text-align: center
}
xy-dialog::part(footer){
    justify-content: center
}
```

## 事件`event`

### onsubmit

在点击确认操作时执行。

### oncancel

在点击取消操作时执行。

<xy-button type="primary" onclick="dialog.confirm('confirm',()=>{message.info('submit')},()=>{message.info('cancel')})">confirm</xy-button>

```js
dialog.onsubmit = function(){
    //
}
dialog.addEventListener('submit',function(){
    //
})
dialog.oncancel = function(){
    //
}
dialog.addEventListener('cancel',function(){
    //
})
```



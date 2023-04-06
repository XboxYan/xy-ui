<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/button/')
    import('../../components/dialog/').then((res)=> {
        window.dialog = res.default
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

与`xy-message`类似，`dialog`也提供了几个静态`API`方法。

* `dialog.alert(config)`

* `dialog.success(config)`

* `dialog.error(config)`

* `dialog.warning(config)`

* `dialog.confirm(config)`

* `dialog.prompt(config)`

所有方法返回均为`<xy-dialog></xy-dialog>`对象。

`config`支持两种类型的参数。

```js
dialog.alert(title, ok);
//object传入
dialog.alert({
    title:'title',//标题
    oktext:'ok',//确定键文本
    canceltext:'cancel',//取消键文本
    ok:function(){
        //按确定键的操作
    },
    content:'content',//内容
});

```

<div class="wrap">
<xy-button type="primary" onclick="dialog.alert('alert')">alert</xy-button>
<xy-button type="primary" onclick="dialog.info('info')">info</xy-button>
<xy-button type="primary" onclick="dialog.success({title:'成功',content:'success',oktext:'send'})">success</xy-button>
<xy-button type="primary" onclick="dialog.error('error')">error</xy-button>
<xy-button type="primary" onclick="dialog.warning('warning')">warning</xy-button>
</div>

`dialog.confirm`有两个按钮，确定键和取消键

```js
dialog.confirm(title, ok, cancel);
//object传入
dialog.confirm({
    title:'title',//标题
    oktext:'ok',//确定键文本
    canceltext:'cancel',//取消键文本
    type:'error',//类型，可选择以上几类
    ok:function(){
        //按确定键的操作
    },
    cancel:function(){
        //按取消键的操作
    },
    content:'content',//内容
});
```
<xy-button type="primary" onclick="dialog.confirm('this is a question',()=>{XyMessage.info('ok')},()=>{XyMessage.info('cancel')})">confirm</xy-button>
<xy-button type="primary" onclick="dialog.confirm({type:'error',content:'this is a danger confirm'})">danger confirm</xy-button>

`dialog.prompt`用于显示可提示用户进行输入的对话框。

```js
dialog.prompt(title, ok, cancel);
//object传入
dialog.prompt({
    title:'title',//标题
    oktext:'ok',//确定键文本
    ok:function(value){
        console.log(value);
        //返回输入内容
        //按确定键的操作
    },
    cancel:function(){
        //按取消键的操作
    },
    content:'content',//内容描述
});
```

<xy-button type="primary" onclick="dialog.prompt('',(value)=>{XyMessage.info(value)},()=>{XyMessage.info('cancel')})">prompt</xy-button>
<xy-button type="primary" onclick="dialog.prompt({content:'please input your name',ok:(value)=>{XyMessage.info(value)}})">prompt with content</xy-button>

## 显示`open`

当`dialog`内容比较复杂时，可以直接写在页面`body`上，通过`open`属性来控制显示。

<xy-dialog id="dialog01" title="自定义弹窗内容" submittext="确 定">
    这里是是自定义内容
</xy-dialog>
<div class="wrap">
<xy-button type="primary" onclick="document.getElementById('dialog01').open = true;">open dialog</xy-button>
</div>

```html
<body>
    <xy-button type="primary" onclick="document.getElementById('dialog01').open = true;">open dialog</xy-button>
    <xy-dialog id="dialog01" title="自定义弹窗内容" oktext="确 定">
        <xy-tab>
            <xy-tab-content label="tab1">tab1</xy-tab-content>
            <xy-tab-content label="tab2">tab2</xy-tab-content>
            <xy-tab-content label="tab3">tab3</xy-tab-content>
        </xy-tab>
    </xy-dialog>
</body>
```

JavaScript操作`set`

```js
dialog.open = false;
dialog.open = true;
//原生属性操作
dialog.setAttribute('open',true);
```

设置`type="confirm"`可出现两个按钮，用法同上。

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

## 事件`event`

### onsubmit

在点击确认操作时执行。

### oncancel

在点击取消操作时执行。

<xy-button type="primary" onclick="dialog.confirm('confirm',()=>{XyMessage.info('submit')},()=>{XyMessage.info('cancel')})">confirm</xy-button>

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



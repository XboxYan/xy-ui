# xy-dialog

对话框。用于代替原生`dialog`、`alert`、`comfirm`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import XyDialog from './node_modules/xy-ui/components/xy-dialog.js';
    //使用
    XyDialog.alert('alert');
</script>
<!-- 使用 -->
<xy-dialog>
    <div>dialog</div>
</xy-dialog>
```
!> `<script type="module"></script>`中的变量是局部变量，如果需要`XyDialog`在全局范围内使用，可以执行`window.XyDialog = XyDialog;`。

> 如果是全部引用则没有这个问题，已经默认挂载在`window`对象上了

## XyDialog[level]

与`xy-message`类似，`XyDialog`也提供了几个静态`API`方法。

* `XyDialog.alert(config)`

* `XyDialog.success(config)`

* `XyDialog.error(config)`

* `XyDialog.warning(config)`

* `XyDialog.confirm(config)`

* `XyDialog.prompt(config)`

所有方法返回均为`<xy-dialog></xy-dialog>`对象。

`config`支持两种类型的参数。

```js
XyDialog.alert(title, ok);
//object传入
XyDialog.alert({
    title:'title',//标题
    oktext:'ok',//确定键文本
    canceltext:'cancel',//取消键文本
    ok:function(){
        //按确定键的操作
    },
    content:'content',//内容
});

```

<xy-button type="primary" onclick="XyDialog.alert('alert')">alert</xy-button>
<xy-button type="primary" onclick="XyDialog.info('info')">info</xy-button>
<xy-button type="primary" onclick="XyDialog.success({title:'成功',content:'success',oktext:'send'})">success</xy-button>
<xy-button type="primary" onclick="XyDialog.error('error')">error</xy-button>
<xy-button type="primary" onclick="XyDialog.warning('warning')">warning</xy-button>

`XyDialog.confirm`有两个按钮，确定键和取消键

```js
XyDialog.confirm(title, ok, cancel);
//object传入
XyDialog.confirm({
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
<xy-button type="primary" onclick="XyDialog.confirm('this is a question',()=>{XyMessage.info('ok')},()=>{XyMessage.info('cancel')})">confirm</xy-button>
<xy-button type="primary" onclick="XyDialog.confirm({type:'error',content:'this is a danger confirm'})">danger confirm</xy-button>

`XyDialog.prompt`用于显示可提示用户进行输入的对话框。

```js
XyDialog.prompt(title, ok, cancel);
//object传入
XyDialog.prompt({
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

<xy-button type="primary" onclick="XyDialog.prompt('',(value)=>{XyMessage.info(value)},()=>{XyMessage.info('cancel')})">prompt</xy-button>
<xy-button type="primary" onclick="XyDialog.prompt({content:'please input your name',ok:(value)=>{XyMessage.info(value)}})">prompt with content</xy-button>

## 显示`open`

当`XyDialog`内容比较复杂时，可以直接写在页面`body`上，通过`open`属性来控制显示。

<xy-dialog id="dialog01" title="自定义弹窗内容" oktext="确 定">
    <xy-tab>
        <xy-tab-content label="tab1">tab1</xy-tab-content>
        <xy-tab-content label="tab2">tab2</xy-tab-content>
        <xy-tab-content label="tab3">tab3</xy-tab-content>
    </xy-tab>
</xy-dialog>
<xy-button type="primary" onclick="document.getElementById('dialog01').open = true;">open dialog</xy-button>

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

<xy-dialog id="dialog02" title="标题" oktext="确 定" canceltext="取消" >
    这是一个异步关闭的弹窗
</xy-dialog>
<xy-button type="primary" onclick="window.dialog02 = document.getElementById('dialog02');window.dialog02.open = true;window.dialog02.onsubmit = function(){this.loading = true;setTimeout(()=>{this.open = false;}, 1000);}">open dialog</xy-button>

```js
dialog.onsubmit = function(){
    this.loading = true;//添加loading属性后可以阻止关闭
    setTimeout(()=>{
        this.open = false;
    }, 1000);
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

<xy-button type="primary" onclick="XyDialog.confirm('confirm',()=>{XyMessage.info('submit')},()=>{XyMessage.info('cancel')})">confirm</xy-button>

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



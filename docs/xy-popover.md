# xy-popover

悬浮提示（操作）框。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-popover.js';
</script>
<!-- 使用 -->
<xy-popover>
    <xy-button>pop confirm</xy-button>
    <xy-popcon>
        <!-- dom -->
        <div>
            <div>自定义删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
        </div>
    </xy-popcon>
</xy-popover>

<xy-popover content="提示<br>提示"><xy-button>pop confirm</xy-button></xy-popover>
```

通常配合嵌套`xy-popcon`来实现自定义悬浮框。

## 类型`type`

当没有设置类型`type`时，`xy-popover`没有任何交互样式，仅仅提供悬浮功能。

<xy-popover content="提示111<br>提示222"><xy-button>xy-popover</xy-button></xy-popover>

可以设置`comfirm`和`pane`两种类型。

#### 确认提示框`comfirm`

当设置`type=comfirm`时，`xy-popover`为一个确认提示层。

<xy-popover type="confirm" onsubmit="XyMessage.success('next')" oncancel="XyMessage.warning('cancel')" title="确定删除吗?" content="删除后无法撤销">
    <xy-button>pop confirm</xy-button>
</xy-popover>

```html
<xy-popover type="confirm" title="确定删除吗?" content="删除后无法撤销" onsubmit="XyMessage.success('next')" oncancel="XyMessage.warning('cancel')" >
    <xy-button>pop confirm</xy-button>
</xy-popover>
```

和`xy-dialog`比较类似，提供了`title（标题）`、`content（内容）`属性来显示内容，同时支持`submit`、`cancel`事件回调。

```js
popover.onsubmit = function(){
    //
}
popover.addEventListener('submit',function(){
    //
})
popover.oncancel = function(){
    //
}
popover.addEventListener('cancel',function(){
    //
})
```

#### 普通提示框`pane`

当设置`type=pane`时，`xy-popover`为一个普通提示层，没有交互确认取消按钮。

<xy-popover type="pane" title="提示" content="这是提示信息">
    <xy-button>pop pane</xy-button>
</xy-popover>

```html
<xy-popover type="pane" title="提示" content="这是提示信息">
    <xy-button>pop pane</xy-button>
</xy-popover>
```

#### 自定义

当内容需要自定义时，`content`可能无法满足需求，可以将`dom`节点直接嵌入`xy-popcon`中。

!> 此时所有属性均定义在`xy-popcon`上。

**自定义确认框**


<xy-popover>
    <xy-button>pop confirm</xy-button>
    <xy-popcon title="确定删除吗?" type="confirm" onsubmit="XyMessage.success('next')">
        <div>
            <div>自定义删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
        </div>
    </xy-popcon>
</xy-popover>

```html
<xy-popover>
    <xy-button>pop confirm</xy-button>
    <xy-popcon title="确定删除吗?" type="confirm" onsubmit="XyMessage.success('next')">
        <div>
            <div>自定义删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
            <div>删除后无法撤销</div>
        </div>
    </xy-popcon>
</xy-popover>
```

**自定义提示框**

<style>
.pop-tips{
    font-size:14px;
}
</style>
<xy-popover>
    <xy-button>pop pane</xy-button>
    <xy-popcon type="pane" title="提示">
        <div class="pop-tips">
            <div>这是一段提示提示提示提示提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示示提</div>
            <div>这是一段提示</div>
            <div>这是一段提示示提</div>
        </div>
    </xy-popcon>
</xy-popover>

```html
<xy-popover>
    <xy-button>pop pane</xy-button>
    <xy-popcon type="pane" title="提示">
        <div class="pop-tips">
            <div>这是一段提示提示提示提示提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
        </div>
    </xy-popcon>
</xy-popover>
```


**自定义下拉框**

<style>
.pop-list a{
    display:block;
    padding:0 .8em;
    line-height: 36px;
}
.pop-list a:hover{
    background:#f1f1f1;
}
</style>
<xy-popover>
    <xy-button>pop list</xy-button>
    <xy-popcon>
        <div class="pop-list">
            <a href="#">链接一</a>
            <a href="#">链接一</a>
            <a href="#">链接一</a>
            <a href="#">链接一</a>
            <a href="#">链接一</a>
        </div>
    </xy-popcon>
</xy-popover>

```html
<style>
.pop-list a{
    display:block;
    padding:0 .8em;
    line-height: 36px;
}
.pop-list a:hover{
    background:#f1f1f1;
}
</style>
<xy-popover>
    <xy-button>pop confirm</xy-button>
    <xy-popcon>
        <div class="pop-list">
            <a href="#">链接一</a>
            <a href="#">链接一</a>
            <a href="#">链接一</a>
            <a href="#">链接一</a>
            <a href="#">链接一</a>
        </div>
    </xy-popcon>
</xy-popover>
```

## disabled

未完...
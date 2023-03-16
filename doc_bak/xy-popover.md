# xy-popover

悬浮提示（操作）框。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-popover.js';
</script>
<!-- 使用 -->

<!--简易模式-->
<xy-popover content="提示"><xy-button>pop confirm</xy-button></xy-popover>

<!--自定义模式-->
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
```

有两种模式，简易模式和自定义模式，自定义模式通常配合嵌套`xy-popcon`来实现自定义悬浮框。

## 类型`type`

当没有设置类型`type`时，`xy-popover`没有任何交互样式，仅仅提供悬浮功能，可以自定义内容。

<xy-popover content="提示111"><xy-button>xy-popover</xy-button></xy-popover>

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

<xy-popover type="pane" title="提示" content="这是提示信息提示信息">
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

此时，事件监听绑定在`popcon`上。

```js
popcon.onsubmit = function(){
    //
}
popcon.addEventListener('submit',function(){
    //
})
popcon.oncancel = function(){
    //
}
popcon.addEventListener('cancel',function(){
    //
})
```

**自定义提示框**

<style>
.pop-tips{
    font-size:14px;
}
</style>
<xy-popover>
    <xy-tips tips="点击查看更多提示" style="margin:0"><xy-icon size="16" name="question-circle"></xy-icon></xy-tips>
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
    <xy-tips tips="点击查看更多提示"><xy-icon size="16" name="question-circle"></xy-icon></xy-tips>
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
            <a href="#">链接链接一</a>
            <a href="#">链接链接一</a>
            <a href="#">链接链接一</a>
            <a href="#">链接一</a>
            <a href="#">链接链接一</a>
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

> 该属性仅作用在`xy-popover`上

当设置`disabled`时，可以禁用悬浮层，对于`type=confirm`可以直接触发`submit`事件。

<xy-popover disabled type="confirm" onsubmit="XyMessage.success('next')" oncancel="XyMessage.warning('cancel')" title="确定删除吗?" content="删除后无法撤销">
    <xy-button>pop confirm</xy-button>
</xy-popover>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

<p></p>

<xy-popover disabled>
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
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-popover disabled type="confirm" onsubmit="XyMessage.success('next')" oncancel="XyMessage.warning('cancel')" title="确定删除吗?" content="删除后无法撤销">
    <xy-button>pop confirm</xy-button>
</xy-popover>

<xy-popover disabled>
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
```

JavaScript操作`get`、`set`

```js
popover.disabled;//获取
popover.disabled = false;
popover.disabled = true;
//原生属性操作
popover.getAttribute('disabled');
popover.setAttribute('disabled','');
popover.removeAttribute('disabled');
```

## 方向`dir`

> 该属性仅作用在`xy-popover`上

通过`dir`可以设置悬浮层方向，默认为`bottomleft`，可以取值`top`、`right`、`bottom`、`left`、`topleft`、`topright`、`righttop`、`rightbottom`、`bottomleft`、`bottomright`、`lefttop`、`leftbottom`。同[`xy-tips`](xy-tips.md)。

<xy-popover dir="top" type="confirm" onsubmit="XyMessage.success('next')" title="确定删除吗?" content="删除后无法撤销"><xy-button>top</xy-button></xy-popover>

```html
<xy-popover dir="top" type="confirm" onsubmit="XyMessage.success('next')" title="确定删除吗?" content="删除后无法撤销"><xy-button>top</xy-button></xy-popover>

```

JavaScript操作`get`、`set`

```js
popover.dir;
popover.dir = 'right';
//原生属性操作
popover.getAttribute('dir');
popover.setAttribute('dir','right');
```


## 触发`trigger`

默认触发方式是`click`（鼠标单击），还可以选择`hover`、`focus`、`contextmenu`（鼠标右键）。

需要注意的是`hover`、`focus`需要使用自定义模式。

**hover触发**

<xy-popover trigger="hover">
    <xy-button>hover</xy-button>
    <xy-popcon>
        <div class="pop-list">
            <a href="#">链接一</a>
            <a href="#">链接链接一</a>
            <a href="#">链接一</a>
        </div>
    </xy-popcon>
</xy-popover>

```html
<xy-popover trigger="hover">
    <xy-button>hover</xy-button>
    <xy-popcon>
        <div class="pop-list">
            <a href="#">链接一</a>
            <a href="#">链接链接一</a>
            <a href="#">链接一</a>
        </div>
    </xy-popcon>
</xy-popover>
```

**focus触发**

<xy-popover trigger="focus">
    <xy-button>focus</xy-button>
    <xy-popcon>
        <div class="pop-list">
            <a href="#">链接一</a>
            <a href="#">链接链接一</a>
            <a href="#">链接一</a>
        </div>
    </xy-popcon>
</xy-popover>

```html
<xy-popover trigger="focus">
    <xy-button>focus</xy-button>
    <xy-popcon>
        <div class="pop-list">
            <a href="#">链接一</a>
            <a href="#">链接链接一</a>
            <a href="#">链接一</a>
        </div>
    </xy-popcon>
</xy-popover>
```

**contextmenu触发**

可以取代原生右键菜单，在该条件下，方向`dir`无效，位置跟随鼠标。

<xy-popover class="pop-user" trigger="contextmenu">
    <xy-img src="https://images.pexels.com/photos/698808/pexels-photo-698808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></xy-img>
    <xy-popcon>
        <div class="pop-list">
            <xy-button block type="flat">重新加载</xy-button>
            <xy-button block type="flat">另存为</xy-button>
            <xy-button block type="flat">检查</xy-button>
        </div>
    </xy-popcon>
</xy-popover>

```html
<xy-popover trigger="contextmenu">
    <xy-img src="https://images.pexels.com/photos/698808/pexels-photo-698808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></xy-img>
    <xy-popcon>
        <xy-button block type="flat">重新加载</xy-button>
        <xy-button block type="flat">另存为</xy-button>
        <xy-button block type="flat">检查</xy-button>
    </xy-popcon>
</xy-popover>
```

## 显示`open`

> 该属性仅作用在`xy-popcon`上

默认情况下，关闭`xy-popcon`可以通过点击关闭按钮和点击文档其他地方完成。

`xy-popcon`还可以通过`open`属性主动控制显示。

<xy-popover>
    <xy-tips tips="点击查看提示" style="margin:0"><xy-icon size="16" name="question-circle"></xy-icon></xy-tips>
    <xy-popcon type="pane" title="提示">
        <div class="pop-tips">
            <div>这是一段提示提示提示提示提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
        </div>
        <xy-button style="margin:10px 0 0 0;" onclick="this.parentNode.open = false;">关闭</xy-button>
    </xy-popcon>
</xy-popover>

```html
<xy-popover>
    <xy-tips tips="点击查看提示"><xy-icon size="16" name="question-circle"></xy-icon></xy-tips>
    <xy-popcon type="pane" title="提示">
        <div class="pop-tips">
            <div>这是一段提示提示提示提示提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
        </div>
        <xy-button onclick="this.parentNode.open = false;">关闭</xy-button>
    </xy-popcon>
</xy-popover>
```

JavaScript操作`get`、`set`

```js
popcon.open;
popcon.open = true;
popcon.open = false;
//原生属性操作
popcon.getAttribute('open');
popcon.setAttribute('open',true);
```

也可以给需要关闭的元素添加`autoclose`属性，点击后自动关闭

<xy-popover>
    <xy-tips tips="点击查看提示" style="margin:0"><xy-icon size="16" name="question-circle"></xy-icon></xy-tips>
    <xy-popcon type="pane" title="提示">
        <div class="pop-tips">
            <div>这是一段提示提示提示提示提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
            <div>这是一段提示</div>
        </div>
        <xy-button style="margin:10px 0 0 0;" autoclose>关闭</xy-button>
    </xy-popcon>
</xy-popover>

```html
<xy-popover>
    <xy-tips tips="点击查看提示"><xy-icon size="16" name="question-circle"></xy-icon></xy-tips>
    <xy-popcon type="pane" title="提示">
        ...
        <xy-button autoclose>关闭</xy-button>
    </xy-popcon>
</xy-popover>
```

## 示例

这是一个很常见的下拉菜单。

<style>
.pop-user xy-popcon xy-button{
    margin:0;
    justify-content: flex-start;
}
</style>
<xy-popover class="pop-user">
    <xy-button type="flat" shape="circle" icon="user"></xy-button>
    <xy-popcon>
        <xy-button block type="flat">xboxyan</xy-button>
        <xy-button block type="flat">info</xy-button>
        <xy-button block type="flat">setting</xy-button>
        <xy-button block type="flat">login out</xy-button>
    </xy-popcon>
</xy-popover>

```html
<style>
.pop-user xy-popcon xy-button{
    margin:0;
    justify-content: flex-start;
}
</style>
<xy-popover class="pop-user">
    <xy-button type="flat" shape="circle" icon="user"></xy-button>
    <xy-popcon>
        <xy-button block type="flat">xboxyan</xy-button>
        <xy-button block type="flat">info</xy-button>
        <xy-button block type="flat">setting</xy-button>
        <xy-button block type="flat">login out</xy-button>
    </xy-popcon>
</xy-popover>
```

这是一个多级菜单，支持`hover`、`focus`、`click`触发。

<style>
.pop-menu xy-button,.pop-menu xy-popover{
    display:flex;
    margin:0;
    justify-content: flex-start;
}
.pop-menu xy-popover:hover>xy-button,.pop-menu xy-popover:focus-within>xy-button{
    color:var(--themeColor,#42b983);
} 
.pop-menu>xy-popcon xy-popcon{
    margin-left:-10px;
}
</style>
<xy-popover class="pop-menu" trigger="hover" dir="righttop">
    <xy-button>hover Menu</xy-button>
    <xy-popcon>
        <xy-popover trigger="hover" dir="righttop">
            <xy-button block type="flat">itemA<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-button block type="flat">subMenu1</xy-button>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-popover trigger="hover" dir="righttop">
            <xy-button block type="flat">itemB<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-popover trigger="hover" dir="righttop">
                    <xy-button block type="flat">sub-itemB<xy-icon name="right"></xy-icon></xy-button>
                    <xy-popcon>
                        <xy-button block type="flat">subMenu1</xy-button>
                        <xy-button block type="flat">subMenu2</xy-button>
                        <xy-button block type="flat">subMenu3</xy-button>
                    </xy-popcon>
                </xy-popover>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-button block type="flat">itemC</xy-button>
    </xy-popcon>
</xy-popover>

<xy-popover class="pop-menu" trigger="focus" dir="righttop">
    <xy-button>focus Menu</xy-button>
    <xy-popcon>
        <xy-popover trigger="focus" dir="righttop">
            <xy-button block type="flat">itemA<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-button block type="flat">subMenu1</xy-button>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-popover trigger="focus" dir="righttop">
            <xy-button block type="flat">itemB<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-popover trigger="focus" dir="righttop">
                    <xy-button block type="flat">sub-itemB<xy-icon name="right"></xy-icon></xy-button>
                    <xy-popcon>
                        <xy-button block type="flat">subMenu1</xy-button>
                        <xy-button block type="flat">subMenu2</xy-button>
                        <xy-button block type="flat">subMenu3</xy-button>
                    </xy-popcon>
                </xy-popover>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-button block type="flat">itemC</xy-button>
    </xy-popcon>
</xy-popover>

<xy-popover class="pop-menu" dir="righttop">
    <xy-button>click Menu</xy-button>
    <xy-popcon>
        <xy-popover dir="righttop">
            <xy-button block type="flat">itemA<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-button block type="flat">subMenu1</xy-button>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-popover dir="righttop">
            <xy-button block type="flat">itemB<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-popover dir="righttop">
                    <xy-button block type="flat">sub-itemB<xy-icon name="right"></xy-icon></xy-button>
                    <xy-popcon>
                        <xy-button block type="flat">subMenu1</xy-button>
                        <xy-button block type="flat">subMenu2</xy-button>
                        <xy-button block type="flat">subMenu3</xy-button>
                    </xy-popcon>
                </xy-popover>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-button block type="flat">itemC</xy-button>
    </xy-popcon>
</xy-popover>

```html
<xy-popover class="pop-menu" trigger="hover" dir="righttop">
    <xy-button>Menu</xy-button>
    <xy-popcon>
        <xy-popover trigger="hover" dir="righttop">
            <xy-button block type="flat">itemA<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-button block type="flat">subMenu1</xy-button>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-popover trigger="hover" dir="righttop">
            <xy-button block type="flat">itemB<xy-icon name="right"></xy-icon></xy-button>
            <xy-popcon>
                <xy-popover trigger="hover" dir="righttop">
                    <xy-button block type="flat">sub-itemB<xy-icon name="right"></xy-icon></xy-button>
                    <xy-popcon>
                        <xy-button block type="flat">subMenu1</xy-button>
                        <xy-button block type="flat">subMenu2</xy-button>
                        <xy-button block type="flat">subMenu3</xy-button>
                    </xy-popcon>
                </xy-popover>
                <xy-button block type="flat">subMenu2</xy-button>
                <xy-button block type="flat">subMenu3</xy-button>
                <xy-button block type="flat">subMenu4</xy-button>
            </xy-popcon>
        </xy-popover>
        <xy-button block type="flat">itemC</xy-button>
    </xy-popcon>
</xy-popover>
```

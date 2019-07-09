# xy-ui

`xy-ui`是一套使用原生`Web Components`规范开发的跨框架UI组件库。[查看文档](https://xy-ui.codelabo.cn/docs)

风格参考`Ant Design`、`Metiral Design`。

[github](https://github.com/XboxYan/XYUI)

## 特性

* 跨框架。无论是`react`、`vue`还是原生项目均可使用。
* 组件化。`shadow dom`真正意义上实现了样式和功能的组件化。
* 类原生。一个组件就像使用一个`div`标签一样。
* 无依赖。纯原生，无需任何预处理器编译。
* 无障碍。支持键盘访问。

## 原则

在实现组件功能时，遵循`CSS`为主，`JavaScript`为辅的思路，`UI`和业务逻辑分离，使得代码结构上更加简约。

比如`xy-button`有一个点击扩散的水波纹效果，就是采用`CSS`来实现，`JavaScript`只是辅助完成鼠标位置的获取

```css
.btn::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: var(--x,0); 
    top: var(--y,0);
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: translate(-50%,-50%) scale(10);
    opacity: 0;
    transition: transform .3s, opacity .8s;
}
.btn:not([disabled]):active::after {
    transform: translate(-50%,-50%) scale(0);
    opacity: .3;
    transition: 0s;
}
```

详细可查看源码。大部分组件都是类似的设计。

## 兼容性

现代浏览器。

包括移动端，不支持`IE`。

> `IE`不支持原生`customElements`，[webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)可以实现对`IE`的兼容，不过很多`CSS`特性仍然无效，所以放弃

## 安装

目前还没有托管`npm`，可以在`github`上获取最新文件。

目录如下：

```text
.
└── xy-ui
    ├── components //功能组件
    |   ├── xy-icon.js
    |   └── ...
    └── iconfont //图标库
        └── icon.svg
```
     

将`components`和`iconfont`文件夹放入项目当中。

## 依赖

部分组件使用需要依赖其他组件，依赖关系如下

|组件|依赖项|描述|
|---|---|---|
|`xy-button`|`xy-icon`、`xy-loading`|按钮。组件使用了`icon`和`loading`属性。|
|`xy-icon`|无|图标。|
|`xy-slider`|`xy-tips`|滑动条。组件使用了`showtips`属性。|
|`xy-select`|`xy-button`|下拉选择器。组件内部使用`xy-button`组合而成。|
|`xy-tab`|`xy-button`|标签页。组件导航按钮使用了`xy-button`。|
|`xy-loading`|无|加载。|
|`xy-switch`|无|开关。|
|`xy-checkbox`|无|多选。|
|`xy-radio`|无|单选。|
|`xy-tips`|无|提示。|
|`xy-message`|`xy-icon`|全局提示。提示信息图标使用`xy-icon`。|
|`xy-dialog`|`xy-icon`、`xy-button`、`xy-loading`|弹窗提示。提示信息图标使用`xy-icon`，确认取消按钮使用了`xy-button`。组件使用了`loading`属性。|
|`xy-layout`|无|布局。|
|`xy-input`|`xy-icon`、`xy-button`、`xy-tips`|输入框。组件使用了`icon`属性，同时有`xy-button`交互，表单验证使用了`xy-tips`信息提示。|
|`xy-textarea`|同上|多行输入框。同上。|

无依赖组件直接引入单独`js`即可，有依赖组件需要引入相关`js`。

如需单独使用`xy-tips`组件，仅需引用`xy-tips.js`。

```js
// .
// └── project
//     ├── components
//     |   └── xy-tips.js
//     └── index.html
import './components/xy-tips.js';
```

如需单独使用`xy-input`组件，需引用`xy-input.js`、`xy-button.js`、`xy-icon.js`、`xy-tips.js`。

```js
// └── project
//     ├── components
//     |   ├── xy-input.js
//     |   ├── xy-button.js
//     |   ├── xy-icon.js
//     |   └── xy-tips.js
//     └── index.html
import './components/xy-input.js';
```

> 大部分情况下全部引用即可

## 引用

### html引用

```html
<script type="module">
    import './components/xy-button.js';
</script>
<xy-button>button</xy-button>
```

> 现代浏览器支持原生`import`语法，不过需要注意`script`的类型`type="module"`。

### react项目引用

```js
import './components/xy-icon.js';
ReactDOM.render(<xy-button>button</xy-button>, document.body);
```

> 关于`react`中使用`Web Components`的注意细节可参考[https://react.docschina.org/docs/web-components.html](https://react.docschina.org/docs/web-components.html)

### vue项目引用

与原生类似，暂无研究。


## 使用

使用一个组件有以下几种方式：

### html 标签

这是最常用的使用方式（推荐）。

```html
<xy-button>button</xy-button>
```

### document.createElement

也可以通过`document.createElement`创建元素

```js
const btn = document.createElement('xy-button');
document.body.appenChild(btn);
```

### new 操作符

自定义组件是通过`class`定义，可以通过`new`来实例化。

```js
import XyButton from './components/xy-button.js';
const btn = new XyButton();
document.body.appenChild(btn);
```

## 其他

大部分情况下，可以把组件当成普通的`html`标签，

比如给`<xy-button>button</xy-button>`添加事件，有以下几种方式

```html
<xy-button onclick="alert(5)">button</xy-button>
```

```js
btn.onclick = function(){
    alert(5)
}

btn.addEventListener('click',function(){
    alert(5)
})
```

> 自定义事件只能通过`addEventListener`绑定

比如元素的获取，完全符合`html`规则

```html
<xy-tab>
    <xy-tab-content label="tab1">tab1</xy-tab-content>
    <xy-tab-content label="tab2">tab2</xy-tab-content>
    <xy-tab-content label="tab3" id="tab3">tab3</xy-tab-content>
</xy-tab>
```

```js
const tab3 = document.getElementById('tab3');
tab3.parentNode;//xy-tab
```

组件的布尔类型的属性也遵从原生规范（添加和移除属性），比如

```html
<xy-dialog show></xy-dialog> <!-- 显示 -->
<xy-dialog></xy-dialog> <!-- 隐藏 -->
<xy-button loading>button</xy-button> <!-- 加载中 -->
<xy-button>button</xy-button> <!-- 正常 -->
```

总之，大部分情况下把它当成普通的`html`标签（不用关注shadow dom的结构）就好了，以前怎么做现在仍然怎么做，只是新增了方法而已。
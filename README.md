# xy-ui

[![NPM version](https://img.shields.io/npm/v/xy-ui.svg?color=red)](https://www.npmjs.com/package/xy-ui)
![npm](https://img.shields.io/npm/dw/xy-ui)
[![GitHub stars](https://img.shields.io/github/stars/XboxYan/xy-ui.svg?color=#42b983)](https://github.com/XboxYan/xy-ui/stargazers)
[![GitHub stars](https://img.shields.io/github/forks/XboxYan/xy-ui.svg)](https://github.com/XboxYan/xy-ui/network/members)

`xy-ui`是一套使用原生`Web Components`规范开发的跨框架UI组件库。[查看文档](https://xy-ui.codelabo.cn/docs)

风格参考`Ant Design`、`Metiral Design`。

[github项目地址](https://github.com/XboxYan/xy-ui)

## 更新
* ## 1.3.0
    * 新增[xy-popover](./docs/xy-popover.md)悬浮操作组件
    * [xy-tips](./docs/xy-tips.md?id=方向dir)的`dir`新增`8`个方向
    * [xy-button](./docs/xy-tips.md?id=链接href)新增`href`属性
    * [xy-input](./docs/xy-input.md?id=oninput)新增`debounce`属性
    * 优化[xy-select](./docs/xy-select.md)逻辑
* ## 1.2.0
    * 修复`xy-img`关闭画廊时的定位问题
    * 精简所有`focus`、`blur`事件
    * 新增[xy-rate](./docs/xy-rate.md)组件
* ## 1.1.0
    * 重构`xy-button`组件结构，更易于自定义
    * 新增[xy-img](./docs/xy-img.md)组件
* ## 1.0.2
    * 修复已知bug
    * `xy-slider` 新增`suffix`属性

## 特性

* 跨框架。无论是`react`、`vue`还是原生项目均可使用。
* 组件化。`shadow dom`真正意义上实现了样式和功能的组件化。
* 类原生。一个组件就像使用一个`div`标签一样。
* 无依赖。纯原生，无需任何预处理器编译。
* 无障碍。支持键盘访问。

## 兼容性

现代浏览器。

包括移动端，不支持`IE`。

> `IE`不支持原生`customElements`，[webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)可以实现对`IE`的兼容，不过很多`CSS`特性仍然无效，所以放弃

## 安装

方式一：通过`npm`

```shell
npm i xy-ui
```

方式二：直接在`github`上获取最新文件。

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

## 引用

### 设置window.iconUrl

设置图标库的相对路径。

```html
<script>
    window.iconUrl = './node_modules/xy-ui/iconfont/icon.svg';//设置icon.svg的相对路径
</script>
```

### 设置window.basePath

设置图标库的绝对路径。

当使用`npm`创建时，需设置`window.basePath`，页面加载的路径，默认为根路径`/`。

```html
<script>
    window.basePath = '/build/';
</script>
```

以上两种方式选其一。

> 设置`window.iconUrl`或者`window.basePath`是为了保证`xy-icon`的引用路径，详细可参考`xy-icon`文档。

### html引用

```html
<script type="module">
    import './node_modules/xy-ui/index.js'; //推荐
    //如需单独使用，文档中都是单独使用的情况，推荐全部引用，即第一种方式。
    import './node_modules/xy-ui/components/xy-button.js';
</script>
<xy-button>button</xy-button>
```

> 现代浏览器支持原生`import`语法，不过需要注意`script`的类型`type="module"`。

### react项目引用

```js
import 'xy-ui';//推荐
//如需单独使用
import 'xy-ui/components/xy-button.js';
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

自定义组件是通过`class`定义，内部可以通过`new`来实例化。

```js
import XyButton from './node_modules/components/xy-button.js';
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

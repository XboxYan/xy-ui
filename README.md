# xy-ui

[![NPM version](https://img.shields.io/npm/v/xy-ui.svg?color=red)](https://www.npmjs.com/package/xy-ui)
![npm](https://img.shields.io/npm/dw/xy-ui)
![npm](https://img.shields.io/npm/dt/xy-ui)
[![GitHub stars](https://img.shields.io/github/stars/XboxYan/xy-ui.svg?color=#42b983)](https://github.com/XboxYan/xy-ui/stargazers)
[![GitHub stars](https://img.shields.io/github/forks/XboxYan/xy-ui.svg)](https://github.com/XboxYan/xy-ui/network/members)

`xy-ui`是一套使用原生`Web Components`规范开发的跨框架UI组件库。[查看文档](https://xy-ui.codelabo.cn/docs)

风格参考`Ant Design`、`Metiral Design`。

[github项目地址](https://github.com/XboxYan/xy-ui)

## 更新
* ## 1.6.0
    * 新增[`xy-pagination`](./docs/xy-pagination.md)分页组件

    ![xy-pagination](./screenshot/xy-pagination.png)

    * 修复`xy-form`下`xy-select`回车键触发`submit`问题
    * 更改组件尺寸为`em`相对尺寸，部分组件除外
    * `xy-color-pane`现在在鼠标抬起时才触发`change`回调
    * 其他`bug`修复
* ## 1.5.2
    * 修改属性`lable`为`legend`，`lablewidth`为`legendwidth`
    * `xy-radio-group`、`xy-checkbox-group`新增`disabled`属性
    * 优化`xy-form`和`xy-form-item`的`lablewidth`属性
    * `xy-popover`优化关闭按钮样式
    * `xy-color-picker`新增内置颜色
    * `xy-form`表单校验不会对`disabled`属性表单元素进行校验
* ## 1.5.1
    * 优化`xy-radio-group`和`xy-checkbox-group`的`hover`层级问题
    * `xy-form`新增演示动画

    ![xy-form](./screenshot/xy-form.png)

* ## 1.5.0
    * 新增[`xy-form`](./docs/xy-form.md)表单组件，集成表单验证功能
    * 新增`xy-radio-group`和`xy-checkbox-group`组件
    * `xy-img`新增加载动画
    * 主题颜色管理，`fontColor`、`errorColor`、`successColor`、`warningColor`、`borderColor`等
    * 其他`bug`修复

[update](./docs/update.md)

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

* npm

```shell
npm i xy-ui
```

* cdn

```html
<script type="module">
    import 'https://unpkg.com/xy-ui';

    import 'https://unpkg.com/xy-ui@1.4.1';//指定版本号
</script>

<!--or-->

<script type="module" src="https://unpkg.com/xy-ui"></script>
```

* 直接在`github`上获取最新文件。

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
     

将整个文件夹放入项目当中。

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

[demo](https://codepen.io/xboxyan/pen/mNKWaN)

> 关于`react`中使用`Web Components`的注意细节可参考[https://react.docschina.org/docs/web-components.html](https://react.docschina.org/docs/web-components.html)

### vue项目引用

与原生类似，暂无研究。

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

## License

[MIT](LICENSE)

# xy-message

全局展示操作反馈信息。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import XyMessage from './node_modules/xy-ui/components/xy-message.js';
    window.XyMessage = XyMessage;
    //使用
    XyMessage.info('info);
</script>
```
!> `<script type="module"></script>`中的变量是局部变量，如果需要`XyMessage`在全局范围内使用，可以执行`window.XyMessage = XyMessage;`。

> 如果是全部引用则没有这个问题，已经默认挂载在`window`对象上了

## XyMessage[level]

和一般组件不太一样的一个地方是，该组件更类似于一个`API`，这里提供了`XyMessage`的几个静态方法。

* `XyMessage.info(text, duration, onclose)`

* `XyMessage.success(text, duration, onclose)`

* `XyMessage.error(text, duration, onclose)`

* `XyMessage.warning(text, duration, onclose)`

* `XyMessage.loading(text, duration, onclose)`

所有方法返回均为`<xy-message></xy-message>`对象。

<xy-button type="primary" onclick="XyMessage.info('This a info message')">info</xy-button>
<xy-button type="primary" onclick="XyMessage.success('This a success message')">success</xy-button>
<xy-button type="primary" onclick="XyMessage.error('This a error message')">error</xy-button>
<xy-button type="primary" onclick="XyMessage.warning('This a warning message')">warning</xy-button>
<xy-button type="primary" onclick="XyMessage.loading('This a loading message')">loading</xy-button>

|参数|说明|类型|默认值|
|---|---|---|---|
|`text`|提示内容|`string`|`''`|
|`duration`|自动关闭的延时，单位毫秒。设为 0 时不自动关闭。|`number`|`3`|
|`onclose`|关闭时触发的回调函数|`Function`|-|

其中，`XyMessage.loading`默认`duration`为`0`，表示不自动关闭，如果需要手动关闭，可以设置属性`show=false`。

<xy-button type="primary" onclick="this.loader = XyMessage.loading('This a loading message')">show loading</xy-button>
<xy-button type="primary" onclick="this.previousElementSibling.loader.show = false">hide loading</xy-button>

```js
const loader = XyMessage.loading('This a loading message');
btn.onclick = function(){
    loader.show = false;
}
```

`onclose`还可以在外部指定，作用同上。

```js
const loader = XyMessage.loading('This a loading message');
loader.onclose = function(){
    //
}
```

## XyMessage.show

`XyMessage.show`是一个更为通用的方法，可以自定义`icon`。

<xy-button type="primary" onclick="XyMessage.show({icon:'like',text:'I like it!'})">I like it!</xy-button>

```js
XyMessage.show({
    icon,//图标
    text,//提示内容
    duration,//延时，默认为3000
    onclose//回调函数
})
```
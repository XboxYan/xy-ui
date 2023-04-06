<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/button/')
    import('../../components/message/').then((res)=> {
        window.message = res.default
    })
  })
</script>

# message

全局展示操作反馈信息。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import message from '../components/message/index.js';
    //使用
    message.info('info');
</script>
```
:::tip
`<script type="module"></script>`中的变量是局部变量，如果需要`message`在全局范围内使用，可以执行`window.message = message;`。

如果是在 `vue`、`react`中，可以无需赋值到全局对象
:::

## message[method]

和一般组件不太一样的一个地方是，该组件更类似于一个`API`，这里提供了`message`的几个静态（`static`）方法。

* `message.info(text, duration, onclose)`

* `message.success(text, duration, onclose)`

* `message.error(text, duration, onclose)`

* `message.warning(text, duration, onclose)`

* `message.loading(text, onclose)`

所有方法返回均为`<xy-message></xy-message>`dom 实例对象。

<div class="wrap">
<xy-button type="primary" onclick="message.info('This a info message')">info</xy-button>
<xy-button type="primary" onclick="message.success('This a success message')">success</xy-button>
<xy-button type="primary" onclick="message.error('This a error message')">error</xy-button>
<xy-button type="primary" onclick="message.warning('This a warning message')">warning</xy-button>
</div>

|参数|说明|类型|默认值|
|---|---|---|---|
|`text`|提示内容|`string`|`''`|
|`duration`|自动关闭的延时，单位毫秒。设为 0 时不自动关闭。|`number`|`3`|
|`onclose`|关闭时触发的回调函数|`Function`|-|

其中，`message.loading`不会自动关闭，如果需要手动关闭，可以设置属性`open=false`。

<div class="wrap">
<xy-button type="primary" onclick="if(this.loader?.open) return;this.loader = message.loading('This a loading message')">show loading</xy-button>
<xy-button type="primary" onclick="this.previousElementSibling.loader.open = false">hide loading</xy-button>
</div>

```js
const loader = message.loading('This a loading message');
btn.onclick = function(){
    loader.open = false;
}
```

## message.show

`message.show`是一个更为通用的方法，可以自定义`icon`。

<div class="wrap">
<xy-button type="primary" onclick="message.show({type:'error',icon:'solid/bomb',text:'bomb bomb bomb'})">bomb</xy-button>
</div>

```js
message.show({
    type:'error',//类型，颜色区别
    icon:'solid/bomb',//图标
    text:'bomb bomb bomb',//提示内容
    duration,//延时，默认为3000
    onclose//回调函数
})
```

## 自定义样式

所有方法都返回`xy-message`dom对象，因此只需要给`xy-message`自定义样式就行了

```css
xy-message{
    background: #333;
    color: #fff;
}
```

<style>
.custom-message{
    background: #333;
    color: #fff;
    border-radius: 100px
}
</style>

当然这样会给所有的 `message`都自定义样式，如果需要指定具体某一个`message`，可以添加额外的 `className`

<div class="wrap">
<xy-button type="primary" onclick="const msg = message.success('我是自定义样式的message');msg.classList.add('custom-message')">自定义样式</xy-button>
</div>

```js
const msg = message.success('我是自定义样式的message')
msg.classList.add('custom-message')
```

```css
.custom-message{
    background: #333;
    color: #fff;
    border-radius: 100px;
}
```


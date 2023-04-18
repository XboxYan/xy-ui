<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/switch/')
    import('../../components/button/')
    import('../../components/checkbox/')
    import('../../components/popconfirm/')
    // popover_event.addEventListener('show',function(ev){
    //     console.log('悬浮层出现了');
    // })
    // popover_event.addEventListener('hide',function(ev){
    //     console.log('悬浮层消失了');
    // })
  })
  const submit = function(ev) {
    const pop = ev.target;
    pop.loading = true
    setTimeout(()=>{
      pop.loading = false
      pop.open = false
    }, 2000)
  }
</script>

# popconfirm

确认悬浮框。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/popconfirm/index.js';
</script>
<!-- 使用 -->
<xy-button>confirm</xy-button>
<xy-popconfirm>
</xy-popconfirm>
```

基于[popover](./popover)实现，继承所有属性和方法。

## 标题`title`、内容`content`

可以自定义确认浮层的标题和内容

<div class="wrap">
  <xy-button type="primary" danger>删除</xy-button>
  <xy-popconfirm title="确认要删除吗？" content="删除之后无法恢复">
  </xy-popconfirm>
</div>

```html
<xy-button type="primary" danger>删除</xy-button>
<xy-popconfirm title="确认要删除吗？" content="删除之后无法恢复">
</xy-popconfirm>
```

JavaScript操作`get`、`set`

```js
popconfirm.title;
popconfirm.title = '确认要删除吗？';
//原生属性操作
popconfirm.getAttribute('title');
popconfirm.setAttribute('title','确认要删除吗？');
```

如果内容比较复杂，而不仅仅只是字符串，可以直接通过嵌套方式自定义内容（优先级高于属性）

<div class="wrap">
  <xy-button type="primary" danger>删除</xy-button>
  <xy-popconfirm title="确认要删除吗？" content="删除之后无法恢复">
    <xy-checkbox>删除历史记录</xy-checkbox>
  </xy-popconfirm>
</div>


```html
<xy-button type="primary" danger>删除</xy-button>
<xy-popconfirm title="确认要删除吗？">
  <xy-checkbox>删除历史记录</xy-checkbox>
</xy-popconfirm>
```

## 确认按钮文本`submittext`、取消按钮文本`canceltext`

可以通过`submittext`和`canceltext`自定义确认浮层的按钮文本

<div class="wrap">
  <xy-button type="primary" danger>自定义按钮</xy-button>
  <xy-popconfirm title="确认要删除吗？" content="删除之后无法恢复" submittext="删除" canceltext="算了">
  </xy-popconfirm>
</div>

```html
<xy-button type="primary" danger>自定义按钮</xy-button>
<xy-popconfirm title="确认要删除吗？" content="删除之后无法恢复" submittext="删除" canceltext="算了">
</xy-popconfirm>
```

## 图标 `slot=icon`

默认图标是一个圆圈实心问号`solid/circle-question`，可以通过插槽`slot=icon`实现自定义

为啥这里需要用`slot`来自定义而不是属性呢？好处是还可以自定义图标颜色

<div class="wrap">
  <xy-button type="primary" danger>自定义图标</xy-button>
  <xy-popconfirm title="确认要删除吗？" content="删除之后无法恢复">
    <xy-icon name="solid/circle-exclamation" color="#ff7875" slot="icon"></xy-icon>
  </xy-popconfirm>
</div>

```html
<xy-button type="primary" danger>自定义图标</xy-button>
<xy-popconfirm title="确认要删除吗？" content="删除之后无法恢复">
  <xy-icon name="solid/circle-exclamation" color="#ff7875" slot="icon"></xy-icon>
</xy-popconfirm>
```

## 自定义样式`::part(title)`，`::part(footer)`

由于内部结构比较多，这里仅暴露了标题和页脚用来自定义样式

内部结构如下（可查看控制台）：

```html
<xy-popconfirm>
  # shadow-root
    <slot name="icon"><xy-icon name="solid/circle-question"></xy-icon></slot>
    <div class="pane">
      <h4 class="title" id="title" part="title"></h4>
      <slot class="content" id="content"></slot>
      <div class="footer" part="footer">
        <xy-button type="flat" size="small" id="cancel">取消</xy-button>
        <xy-button type="primary" size="small" id="submit">确认</xy-button>
```

比如将按钮顺序调换，可以这样

<style scoped>
  .custom::part(footer){
    justify-content: flex-start;
    flex-direction: row-reverse;
  }
</style>

<div class="wrap">
  <xy-button type="primary" danger>删除</xy-button>
  <xy-popconfirm class="custom" @submit="submit" title="确认要删除吗？" content="删除之后无法恢复">
  </xy-popconfirm>
</div>

```css
xy-popconfirm::part(footer){
  justify-content: flex-start;
  flex-direction: row-reverse;
}
```


## 加载中`loading`

有时候点击确认按钮后是一个异步过程，设置`loading`可以让确认按钮处于加载状态

<div class="wrap">
  <xy-button type="primary" danger>删除</xy-button>
  <xy-popconfirm @submit="submit" title="确认要删除吗？" content="删除之后无法恢复">
  </xy-popconfirm>
</div>

```js
popconfirm.addEventListener('submit', function() {
  this.loading = true
  setTimeout(()=>{
    this.loading = false
    this.open = false
  }, 2000)
})
```

## 事件`event`

### 确认`submit`、取消`cancel`

点击确认/取消按钮后触发。

<div class="wrap">
  <xy-button type="primary" danger>删除</xy-button>
  <xy-popconfirm onsubmit="console.log('点击了确认按钮')" oncancel="console.log('点击了取消按钮')" title="确认要删除吗？" content="删除之后无法恢复">
  </xy-popconfirm>
</div>


```html
<xy-popconfirm 
  onsubmit="console.log('点击了确认按钮')"
  oncancel="console.log('点击了取消按钮')"
>
  ...
</xy-popconfirm>
```

其他原生监听方式

```js
popconfirm.onsubmit = function(ev){
    console.log('点击了确认按钮');
}
popconfirm.oncancel = function(ev){
    console.log('点击了取消按钮');
}

popconfirm.addEventListener('submit',function(ev){
    console.log('点击了确认按钮');
})
popconfirm.addEventListener('cancel',function(ev){
    console.log('点击了取消按钮');
})
```
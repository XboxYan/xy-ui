# xy-view

通用容器，集成了常见功能，持续补充。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-view.js';
</script>
<!-- 使用 -->
<xy-view draggable>...</xy-view>
```

大部分功能基于原生，不影响原生`api`使用。

## 可拖拽`draggable`、`allowdrop`

设置`draggable`属性可以使该组件拖拽，采用原生`drag`实现，美化了拖拽预览样式（原生默认为半透明预览图）。

设置`allowdrop`可以允许被拖拽元素放入该容器，支持嵌套。

<style>
.dragbox{
    width: 50px;
    height: 50px;
    background: #42b983;
    position:relative;
    transform: translateX(20px);
    left:20px;
}
.dragbox[dragging]{
    box-shadow:0 3px 10px rgba(0,0,0,.2);
    transform: rotate(10deg)!important;
    transform-origin: left top;
}
.dropbox{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 200px;
    height: 200px;
    background: #fff;
    border: 10px solid #f1f1f1;
}
.dropbox-parent{
    width: 500px;
    height: 500px;
}
.dropbox[over]{
    border-color: #2c9666;
}
</style>

<xy-view class="dragbox" draggable></xy-view>

<xy-view allowdrop class="dropbox dropbox-parent" ondrop="console.log(this)">
    <xy-view allowdrop class="dropbox" ondrop="console.log(this)"><span>drop in here</span></xy-view>
    <span class="dropbox">no drop</span>
</xy-view>

```html
<xy-view class="dragbox" draggable></xy-view>

<xy-view allowdrop class="dropbox dropbox-parent" ondrop="console.log(this)">
    <xy-view allowdrop class="dropbox" ondrop="console.log(this)"></xy-view>
    <xy-view class="dropbox"></xy-view>
</xy-view>
```

当被拖拽元素经过放置容器`allowdrop`时，被拖拽元素会添加`dragging`属性，放置容器会添加`over`属性，移开或者放下会移除该属性

```css
.dragbox[dragging]{
    box-shadow:0 3px 10px rgba(0,0,0,.2);
    transform: rotate(10deg)!important; /**需要覆盖初始transform**/
    transform-origin: left top;
}
.dropbox[over]{
    border-color: #2c9666;
}
```

拖拽其他原生可拖拽元素也会触发以上`over`效果，比如拖拽一段文本，或一张图片。

<xy-text draggable>this is a draggable text</xy-text>

<xy-view allowdrop class="dropbox" ondrop="XyMessage.info(event.dataTransfer.getData('text'))"></xy-view>

以上仅仅是对原生的美化，具体功能实现仍需借助原生事件

```js
//拖拽元素draggable
draggable.addEventListener('dragstart',()=>{})
draggable.addEventListener('drag',()=>{})
draggable.addEventListener('dragend',()=>{})
//目标元素allowdrop
allowdrop.addEventListener('dragover',()=>{})
allowdrop.addEventListener('dragenter',()=>{})
allowdrop.addEventListener('dragleave',()=>{})
allowdrop.addEventListener('drop',()=>{})
```

## 可改变（尺寸）`resizable`

设置`resizable`属性可以使元素改变尺寸

<style>
.resizebox{
    display:flex;
    justify-content:center;
    align-items:center;
    width:200px;
    height:200px;
    outline:10px solid #f1f1f1;
    outline-offset:-10px;
}
</style>

<xy-view resizable class="resizebox"></xy-view>

```html
<xy-view resizable class="resizebox"></xy-view>
```

改变尺寸会触发一下三个回调事件`resizestart`、`resize`、`resizend`

<xy-view resizable class="resizebox" onresize="this.textContent=event.detail.width+','+event.detail.height"></xy-view>

```js
resizebox.addEventListener('resizestart',()=>{})
resizebox.addEventListener('resize',(ev)=>{
    console.log(ev.detail)
    /*
    detail：{
        offsetX,//x偏移
        offsetY,//y偏移
        width,//当前宽度
        height,//当前高度
    }
    */
})
resizebox.addEventListener('resizend',()=>{})
```
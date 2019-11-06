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
    width: 100px;
    height: 100px;
    background: #42b983;
    color:#fff;
    display:flex;
    justify-content: center;
    align-items: center;
    transform: translateX(20px);
}
.dragbox:empty::after{
    content:'drag me'
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

## 拖拽轴`dragaxis`

设置`dragaxis`可以用来限制拖拽的方向，取值为`X|Y`。

不设置可以按住`Shift`键来限制水平拖拽或竖直拖拽。

<xy-view class="dragbox" draggable dragaxis="X">dragaxis="X"</xy-view>

<xy-view class="dragbox" draggable dragaxis="Y">dragaxis="Y"</xy-view>

<xy-view class="dragbox" draggable>press shift</xy-view>

```html
<xy-view class="dragbox" draggable dragaxis="X">dragaxis="X"</xy-view>
<xy-view class="dragbox" draggable dragaxis="Y">dragaxis="Y"</xy-view>
<xy-view class="dragbox" draggable>press shift</xy-view>
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
    transform:translate(100px,50px);
}
</style>

<div style="height:500px">
<xy-view resizable class="resizebox"></xy-view>
</div>

```html
<xy-view resizable class="resizebox"></xy-view>
```

改变尺寸会触发一下三个回调事件`resizestart`、`resize`、`resizend`

<div style="height:500px">
<xy-view resizable draggable class="resizebox" onresize="this.textContent=event.detail.width+','+event.detail.height"></xy-view>
</div>

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

> 当拖拽左上部分时，除了改变宽高以外，为了保证拖拽自然性，此时会给`transform`添加`offsetX`和`offsetY`偏移

## 坐标`coord`

`CSS`获取不到鼠标位置信息，可以设置`coord`属性，将坐标信息在内部通过自定义属性`--x`、`--y`传递下来，取值范围为`0~1`（坐标相对于宽高的比值）。

很多鼠标跟随的效果就可以借助`CSS`实现了。

<style>
.coord-con{
    position:relative;
    height:500px;
    border:10px solid #f1f1f1;
    display:flex;
    perspective: 550px;
    transform-style: preserve-3d;
}
.coord-box{
    display:flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    width:200px;
    height:200px;
    background: #42b983;
    margin:auto;
    transition:.2s;
}
.coord-con:hover .coord-box{
    transition: 0s;
    transform: rotateX(calc((var(--y) - .5) * 45deg)) rotateY(calc((var(--x) - .5) * 45deg));
}
</style>

<xy-view coord class="coord-con">
    <div class="coord-box">look me</div>
</xy-view>

```css
.coord-con{
    perspective: 550px;
    transform-style: preserve-3d;
}
.coord-con:hover .coord-box{
    transform: rotateX(calc( (var(--y) - .5) * 45deg)) rotateY(calc( (var(--x) - .5) * 45deg));
    /**通过calc计算旋转角度**/
}
```

```html
<xy-view coord class="coord-con">
    <div class="coord-box">look me</div>
</xy-view>
```

更多实用场景...
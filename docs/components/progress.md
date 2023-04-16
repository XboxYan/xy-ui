<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/progress/')
  })
</script>

# progress

进度条，用于展示当前操作进度。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/progress/index.js';
</script>
<!-- 使用 -->
<xy-progress value=".3"></xy-progress>
```

## 值`value`

通过`value`可以设置进度条进度，范围是`0~1`。

<div class="wrap" vertical>
<xy-progress value=".3"></xy-progress>
<xy-progress value=".5"></xy-progress>
<xy-progress value=".8"></xy-progress>
</div>

```html
<xy-progress value=".3"></xy-progress>
<xy-progress value=".5"></xy-progress>
<xy-progress value=".8"></xy-progress>
```

当进度完成时，也就是`value`为`1`时，会出现成功状态

<div class="wrap" vertical>
<xy-progress value="1"></xy-progress>
</div>

```html
<xy-progress value="1"></xy-progress>
```

JavaScript操作`get`、`set`

```js
progress.value;
progress.value = .5;
//原生属性操作
progress.getAttribute('value');
progress.setAttribute('value',.5);
```

## 错误状态`error`

有时候进度条会出错而中断，可以添加`error`属性

<div class="wrap" vertical>
<xy-progress value=".3" error></xy-progress>
<xy-progress value=".5" error></xy-progress>
<xy-progress value=".8" error></xy-progress>
</div>

```html
<xy-progress value=".3" error></xy-progress>
<xy-progress value=".5" error></xy-progress>
<xy-progress value=".8" error></xy-progress>
```

JavaScript操作`get`、`set`

```js
progress.error;
progress.error = true;
//原生属性操作
progress.getAttribute('error');
progress.setAttribute('error', '');
progress.toggleAttribute('error', [force]);
```

## 自定义样式`::part(progress)`、`::part(info)`

默认情况下，进度条的宽度是`150px`，你可以指定任意宽度，比如

<style scope>
.custom-progress xy-progress{
  width: 100%
}
.custom-progress-2 xy-progress::part(progress){
  border-radius: 0
}
.custom-progress-3 xy-progress::part(info){
  display: none
}
</style>

<div class="wrap custom-progress" vertical>
<xy-progress value=".3"></xy-progress>
<xy-progress value=".5"></xy-progress>
<xy-progress value=".8"></xy-progress>
<xy-progress value=".8" error></xy-progress>
<xy-progress value="1"></xy-progress>
</div>

```css
xy-progress{
  width: 100%
}
```

如果需要自定义进度条样式，比如圆角，需要深入到`shadow dom`中，这里暴露了内置伪元素`::part(progress)`用来自定义样式

 内部结构如下（可查看控制台）：

```html
<xy-progress>
  # shadow-root
    <div part="progress" role="progressbar"></div>
    <span part="info"></span>
```

下面是一个直角进度条

<div class="wrap custom-progress-2" vertical>
<xy-progress value=".3"></xy-progress>
<xy-progress value=".5"></xy-progress>
<xy-progress value=".8"></xy-progress>
<xy-progress value=".8" error></xy-progress>
<xy-progress value="1"></xy-progress>
</div>

```css
xy-progress::part(progress){
  border-radius: 0
}
```

还可以隐藏进度条后面的信息提示

<div class="wrap custom-progress-3" vertical>
<xy-progress value=".3"></xy-progress>
<xy-progress value=".5"></xy-progress>
<xy-progress value=".8"></xy-progress>
<xy-progress value=".8" error></xy-progress>
<xy-progress value="1"></xy-progress>
</div>

```css
xy-progress::part(info){
  display: none
}
```
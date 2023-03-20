<script setup>
import { onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/button/')
    import('../../components/switch/')
    import('../../components/checkbox/')
    import('../../components/checkbox-group/')
  })
  const checkgroup = () => {
    document.getElementById('checkbox-group').value = ['Vue', 'Flutter']
  }
</script>
# checkbox

多项选择器。用于替代原生`input[type=checkbox]`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../../components/checkbox/index.js'
</script>
<!-- 使用 -->
<xy-checkbox>checkbox</xy-checkbox>
```

## 禁用`disabled`

通过`disabled`可以禁用开关。

<div class="wrap">
<xy-checkbox disabled>checkbox</xy-checkbox>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>
</div>

```html
<xy-checkbox disabled>checkbox</xy-checkbox>
```

JavaScript操作

```js
checkbox.disabled;//获取
checkbox.disabled = false;
checkbox.disabled = true;
//原生属性操作
checkbox.setAttribute('disabled','');
checkbox.removeAttribute('disabled');
```

## 选中`checked`

`checked`属性表示选中。

<div class="wrap">
<xy-checkbox checked>checkbox</xy-checkbox>
<xy-switch checked onchange="this.previousElementSibling.checked = this.checked;"></xy-switch>
</div>

```html
<xy-checkbox checked>checkbox</xy-checkbox>
```

通常多个出现，有一个相同的`name`，表示同一组，可以通过`name`来获取当前组的选中（通过`dom`获取即可）。

<div class="wrap">
<xy-checkbox name="lang" checked>Html</xy-checkbox>
<xy-checkbox name="lang">Css</xy-checkbox>
<xy-checkbox name="lang">Javascript</xy-checkbox>
<xy-checkbox name="lang">Python</xy-checkbox>
<xy-checkbox name="lang">Php</xy-checkbox>
<xy-checkbox name="lang">Dart</xy-checkbox>
<xy-checkbox name="lang">Swift</xy-checkbox>
<xy-button type="primary" onclick="XyMessage.info(Array.from(document.querySelectorAll('xy-checkbox[name=lang][checked]')).map(el=>el.textContent))">获取选中状态</xy-button>
</div>

```html
<xy-checkbox name="lang" checked>Html</xy-checkbox>
<xy-checkbox name="lang">Css</xy-checkbox>
<xy-checkbox name="lang">Javascript</xy-checkbox>
<xy-checkbox name="lang">Python</xy-checkbox>
<xy-checkbox name="lang">Php</xy-checkbox>
<xy-checkbox name="lang">Dart</xy-checkbox>
<xy-checkbox name="lang">Swift</xy-checkbox>
```


JavaScript操作

```js
checkbox.checked;//获取
checkbox.checked = false;
checkbox.checked = true;
//原生属性操作
checkbox.setAttribute('checked','');
checkbox.removeAttribute('checked');
```

## 不确定状态`indeterminate`

可以通过`JavaScript`设置`xy-checkbox`的不确定状态

<div class="wrap">
<xy-checkbox>indeterminate</xy-checkbox>
<xy-button type="primary" onclick="this.previousElementSibling.indeterminate='true'">设置indeterminate</xy-button>
</div>

JavaScript操作`get`、`set`

```js
checkbox.indeterminate;//获取
checkbox.indeterminate = false;
checkbox.indeterminate = true;
```

## 自定义样式`::part(checkbox)`
 需要注意的是，`xy-checkcbox`本身不包含任意样式，如果需要自定义多选框本身样式，需要深入到`shadow dom`中，这里暴露了内置伪元素`::part(checkcbox)`用来自定义样式

 内部结构如下（可查看控制台）：

```html
<xy-checkbox>
  # shadow-root
    <input type="checkbox" part="checkbox">
    <label>
      <slot></slot>
    </label>
```

比如，可以将多选框变成一个圆形

<style scoped>
xy-checkbox.custom1::part(checkbox){
  border-radius: 50%
}
xy-checkbox.custom2::part(checkbox){
  order: 2
}
</style>

<div class="wrap">
<xy-checkbox class="custom1" checked>checkbox</xy-checkbox>
</div>

```css
xy-checkbox::part(checkbox){
  border-radius: 50%
}
```

或者将多选框放在文本的后面(通过flex排序即可实现)

<div class="wrap">
<xy-checkbox class="custom2" checked>checkbox</xy-checkbox>
</div>

```css
xy-checkbox::part(checkbox){
  order: 2
}
```

## 多选框组 `xy-checkbox-group`

表示同一组，支持以下特性

* 设置和获取`disabled`
* 设置和获取`value`（数组格式）
* 支持`change`事件

<div  class="wrap" noborder>
<xy-checkbox checked onchange="document.getElementById('checkbox-group').disabled = this.checked;">禁用</xy-checkbox>
<xy-button type="primary" @click="checkgroup">选中Vue、Flutter</xy-button>
</div>
<div class="wrap">
<xy-checkbox-group disabled id="checkbox-group" name="books" value="React,Angular" onchange="console.log(this.value)">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
</div>


```html
<xy-checkbox-group name="lang" disabled value="React,Angular">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
```

JavaScript操作`get`、`set`

```js
checkboxgroup.value;//获取
checkboxgroup.value = ['React','Vue'];
//原生属性操作（字符串形式）
checkboxgroup.getAttribute('value');
checkboxgroup.setAttribute('value',`'React','Vue'`);
```

默认是横向排列，如果需要纵向排列，可以设置`flex-direction`

<div class="wrap">
<xy-checkbox-group style="flex-direction: column" id="checkbox-group" name="books" value="React,Angular">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
</div>

```css
xy-checkbox-group{
  flex-direction: column
}
```

## 事件`event`

### onchange

在切换完成时触发。

<div class="wrap">
<xy-checkbox onchange="console.log('当前状态checked:'+this.checked)">checkbox</xy-checkbox>
</div>

```html
<xy-checkbox onchange="console.log('当前状态checked:'+this.checked)">checkbox</xy-checkbox>
```

```js
checkbox.onchange = function(ev){
    //获取checked的几种方式
    console.log(this.checked);
    console.log(ev.target.checked);
}

checkbox.addEventListener('change',function(ev){
    console.log(this.checked);
    console.log(ev.target.checked);
})
```

`xy-checkbox-group`支持`change`事件

<div class="wrap">
<xy-checkbox-group name="books" value="React,Angular" onchange="console.log(this.value)">
    <xy-checkbox>React</xy-checkbox>
    <xy-checkbox>Vue</xy-checkbox>
    <xy-checkbox>Angular</xy-checkbox>
    <xy-checkbox>Flutter</xy-checkbox>
    <xy-checkbox>Swift</xy-checkbox>
</xy-checkbox-group>
</div>

```js
checkboxgroup.onchange = function(ev){
    //获取value的几种方式
    console.log(this.value);//["React","Angular"]
    console.log(ev.target.value);
}

checkboxgroup.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
})
```
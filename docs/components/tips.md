<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  let tips = null
  onMounted(() => {
    import('../../components/switch/')
    import('../../components/button/')
    import('../../components/tips/').then((res) => {
      tips = res.default
    })
  })
  const state = reactive({
    value: true
  })
  let _tips = null
  const click = (ev) => {
    if (!_tips) {
      _tips = tips.init(newTips, {
        tips : '这是通过new Tip生成的提示',
        type: 'error',
        open: true
      })
    } else {
      _tips.open = !_tips.open
    }
    ev.target.textContent = !_tips.open?'点击我出现 tips~':'再次点击我隐藏 tips~'
  }
</script>

# tips

文字提示气泡框。类似于元素属性`title`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/tips/index.js';
</script>
<!-- 使用 -->
<xy-tips tips="this is a tip">
    <xy-button>button</xy-button>
</xy-tips>
```
::: tip
`xy-tips`标签不包含任何样式，也不会影响页面布局，你可以当做这层标签不存在
:::

## 提示`tips`

提示文字。如果不设置则不显示提示。

<div class="wrap">
<xy-tips tips="this is a tip">
    <span>鼠标放上来试试~</span>
</xy-tips>
<xy-button type="primary" onclick="this.previousElementSibling.tips='this is a new tip!'">改变tips</xy-button>
</div>

```html
<xy-tips tips="this is a tip">
    <p>鼠标放上来试试~</p>
</xy-tips>
```

JavaScript操作`get`、`set`

```js
tips.tips;
tips.tips = 'some tips';
//原生属性操作
tips.getAttribute('tips');
tips.setAttribute('tips','some tips');
```

## 方向`dir`

通过`dir`可以设置气泡框方向，默认为`top`，可以取值`top`、`right`、`bottom`、`left`、`TL`、`TR`、`RT`、`RB`、`BL`、`BR`、`LT`、`LB`。

<div class="dir-wrap">
<div class="a"></div>
<div class="b"></div>
<div class="c"></div>
<div class="d"></div>
<div class="x"></div>
<xy-tips dir="TL" tips="some tips"><xy-button>TL</xy-button></xy-tips>
<xy-tips dir="top" tips="some tips"><xy-button>top</xy-button></xy-tips>
<xy-tips dir="TR" tips="some tips"><xy-button>TR</xy-button></xy-tips>
<xy-tips dir="LT" tips="some tips"><xy-button>LT</xy-button></xy-tips>
<xy-tips dir="RT" tips="some tips"><xy-button>RT</xy-button></xy-tips>
<xy-tips dir="left" tips="some tips"><xy-button>left</xy-button></xy-tips>
<xy-tips dir="right" tips="some tips"><xy-button>right</xy-button></xy-tips>
<xy-tips dir="LB" tips="some tips"><xy-button>LB</xy-button></xy-tips>
<xy-tips dir="RB" tips="some tips"><xy-button>RB</xy-button></xy-tips>
<xy-tips dir="BL" tips="some tips"><xy-button>BL</xy-button></xy-tips>
<xy-tips dir="bottom" tips="some tips"><xy-button>bottom</xy-button></xy-tips>
<xy-tips dir="BR" tips="some tips"><xy-button>BR</xy-button></xy-tips>
</div>

```html
<xy-tips dir="top" tips="some tips">
  <xy-button>top</xy-button>
</xy-tips>
```


JavaScript操作`get`、`set`

```js
tips.dir;
tips.dir = 'right';
//原生属性操作
tips.getAttribute('dir');
tips.setAttribute('dir','right');
```

除了上述 12 个方位外，还可以设置两个值，以逗号分隔，比如`top,bottom`，可以自动根据位置来选择一个合适的方向。

<xy-tips tips="some tips" dir="top,bottom">
  <xy-button>top,bottom</xy-button>
</xy-tips>

```html
<xy-tips tips="some tips" dir="top,bottom">
  <xy-button>top,bottom</xy-button>
</xy-tips>
```

## 类型`type`

可以通过`type`设置提示框的颜色，有三种类型`success`、`error`、`warning`

<div class="wrap">
<xy-tips tips="success tips" type="success"><xy-button>success</xy-button></xy-tips>
<xy-tips tips="warning tips" type="warning"><xy-button>warning</xy-button></xy-tips>
<xy-tips tips="error tips" type="error"><xy-button>error</xy-button></xy-tips>
</div>

```html
<xy-tips tips="success tips" type="success">
  <xy-button>success</xy-button>
</xy-tips>
<xy-tips tips="warning tips" type="warning">
  <xy-button>warning</xy-button>
</xy-tips>
<xy-tips tips="error tips" type="error">
  <xy-button>error</xy-button>
</xy-tips>
```

JavaScript操作`get`、`set`

```js
tips.type;
tips.type = 'success';
//原生属性操作
tips.getAttribute('type');
tips.setAttribute('type','success');
```

## 颜色`color`

通过`color`可以设置提示框为任意颜色，优先级高于`type`。

<xy-tips tips="some tips" color="royalblue"><xy-button>custom color</xy-button></xy-tips>

```html
<xy-tips tips="some tips" color="royalblue">
  <xy-button>custom color</xy-button>
</xy-tips>
```

JavaScript操作`get`、`set`

```js
tips.color;
tips.color = 'red';
//原生属性操作
tips.getAttribute('color');
tips.setAttribute('color','red');
```

## 触发方式`trigger`

还可以通过`trigger`属性定义触发方式，默认为`hover,focus`，还可以设置为`click`，也可任意组合

::: tip
仅用于初始化，后续修改无效。
:::

<div class="wrap">
<xy-tips tips="some tips" trigger="hover"><xy-button>hover</xy-button></xy-tips>
<xy-tips tips="some tips" trigger="focus"><xy-button>focus</xy-button></xy-tips>
<xy-tips tips="some tips" trigger="click"><xy-button>click</xy-button></xy-tips>
</div>

```html
<xy-tips tips="some tips" trigger="hover">
  <xy-button>hover</xy-button>
</xy-tips>
<xy-tips tips="some tips" trigger="focus">
  <xy-button>focus</xy-button>
</xy-tips>
<xy-tips tips="some tips" trigger="click">
  <xy-button>click</xy-button>
</xy-tips>
```

## 显示`open`

可以设置触发方式`trigger`为`none`，或者`open`默认存在，可以通过`open`属性可以主动控制提示框的出现时机，不再跟随`hover,focus`

适用于表单错误信息描述。

<div class="wrap">
<xy-tips tips="some tips" trigger="none" open><xy-button>tips is show</xy-button></xy-tips>
<xy-switch checked onchange="this.previousElementSibling.open = this.checked;"></xy-switch>
</div>

```html
<xy-tips tips="some tips" trigger="none" open>
  <xy-button>tips is open</xy-button>
</xy-tips>
```

JavaScript操作`set`

```js
tips.open = true;
tips.open = false;
//原生属性操作
tips.setAttribute('open',true);
```

## 命令式静态方法`tips.init()`

除了使用`<xy-tips></xy-tips>`标签外，还可以通过命令式方式进行初始化，参数和前面保持一致

```js
import tips from '../components/tips/index.js'

const tip = tips.init(el, {
  tips : '提示', // 提示文字
  dir : 'top,bottom', // 方向
  trigger : ['hover'], // 触发方式
  ...
})
```

适用于更加灵活的业务场景（原生环境）。例如，点击一个按钮，让其他元素出现`tips`

<div class="wrap">
  <span id="newTips">这是一段文本</span>
  <xy-button type="primary" @click="click">点击我出现 tips~</xy-button>
</div>

使用`tips.init`创建，然后通过`open`属性控制显示

```js
const tip = tips.init(el, {
  tips : '这是通过new Tip生成的提示',
  trigger: 'none',
  open: false,
  type: 'error'
})
button.onclick = () => {
  tip.open = !tip.open
}
```




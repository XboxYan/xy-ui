<script setup>
  import './index.css'
  import '../../components/tips/'
  import '../../components/button/'
  import '../../components/switch/'
</script>

# xy-tips

文字提示气泡框。类似于元素属性`title`。

通过`hover`和`focus`触发。

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

## 提示`tips`

提示文字。如果不设置则不显示提示。

<div class="container">
<xy-tips tips="this is a tip">
    <xy-button>button</xy-button>
</xy-tips>
<xy-button type="primary" onclick="this.previousElementSibling.tips='this is a new tip!'">改变tips</xy-button>
</div>

```html
<xy-tips tips="this is a tip">
    <xy-button>button</xy-button>
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

<div class="dir-container">
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

除了上述四个方位外，还可以设置`auto`，可以自动根据位置来选择一个合适的方向（还不完善）。

```html
<xy-tips tips="some tips" dir="auto">
  <xy-button>auto</xy-button>
</xy-tips>
```

## 类型`type`

可以通过`type`设置提示框的颜色，有三种类型`success`、`error`、`warning`

<xy-tips tips="success tips" type="success"><xy-button>success</xy-button></xy-tips>
<xy-tips tips="warning tips" type="warning"><xy-button>warning</xy-button></xy-tips>
<xy-tips tips="error tips" type="error"><xy-button>error</xy-button></xy-tips>

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

## 显示`open`

添加`open`属性可以主动控制提示框的出现时机，不再与`hover`和`focus`关联。

适用于表单错误信息描述。

<div class="container">
<xy-tips tips="some tips" open><xy-button>tips is show</xy-button></xy-tips>
<xy-switch checked onchange="this.previousElementSibling.open = this.checked;"></xy-switch>
</div>

```html
<xy-tips tips="some tips" open>
  <xy-button>tips is open</xy-button>
</xy-tips>
```

JavaScript操作`set`

```js
tips.show = true;
tips.show = false;
//原生属性操作
tips.setAttribute('show',true);
```

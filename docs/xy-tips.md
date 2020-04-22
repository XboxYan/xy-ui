# xy-tips

文字提示气泡框。类似于元素属性`title`。

通过`hover`和`focus`触发。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-tips.js';
</script>
<!-- 使用 -->
<xy-tips tips="this is a tip">
    <xy-button>button</xy-button>
</xy-tips>
```

## 提示`tips`

提示文字。如果不设置则不显示提示。

<xy-tips tips="this is a tip">
    <xy-button>button</xy-button>
</xy-tips>
<xy-button type="primary" onclick="this.previousElementSibling.tips='this is a new tip!'">改变tips</xy-button>

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

通过`dir`可以设置气泡框方向，默认为`top`，可以取值`top`、`right`、`bottom`、`left`、`topleft`、`topright`、`righttop`、`rightbottom`、`bottomleft`、`bottomright`、`lefttop`、`leftbottom`。

<style>
xy-row{
    position:relative;
    z-index:100;
}
xy-col{
    background-color:transparent!important;
    padding:0;
}
xy-col xy-button,xy-col xy-tips{
    width:100%;
}
</style>
<xy-row gutter="10" style="max-width:600px; margin:0 auto">
    <xy-col span="4"></xy-col>
    <xy-col span="4"><xy-tips tips="topleft topleft topleft topleft some tips" dir="topleft"><xy-button>topleft</xy-button></xy-tips></xy-col>
    <xy-col span="4"><xy-tips tips="some tips" dir="top"><xy-button>top</xy-button></xy-tips></xy-col>
    <xy-col span="4"><xy-tips tips="some tips" dir="topright"><xy-button>topright</xy-button></xy-tips></xy-col>
    <xy-col span="8"></xy-col>
    <xy-col span="4"><xy-tips dir="lefttop" tips="a a a a a a a a a lefttop lefttop lefttop lefttop lefttop some tips"><xy-button>lefttop</xy-button></xy-tips></xy-col>
    <xy-col span="12"></xy-col>
    <xy-col span="4"><xy-tips dir="righttop" tips="a a a a a a a a a lefttop lefttop lefttop lefttop lefttop lefttop some tips"><xy-button>righttop</xy-button></xy-tips></xy-col>
    <xy-col span="4"></xy-col>
    <xy-col span="4"><xy-tips dir="left" tips="some tips some tips some tips some tips some tips some tips some tips"><xy-button>left</xy-button></xy-tips></xy-col>
    <xy-col span="12"></xy-col>
    <xy-col span="4"><xy-tips dir="right" tips="some tips"><xy-button>right</xy-button></xy-tips></xy-col>
    <xy-col span="4"></xy-col>
    <xy-col span="4"><xy-tips dir="leftbottom" tips="a a a a a a a a a leftbottom leftbottom leftbottom leftbottom leftbottom leftbottom leftbottom leftbottom some tips"><xy-button>leftbottom</xy-button></xy-tips></xy-col>
    <xy-col span="12"></xy-col>
    <xy-col span="4"><xy-tips dir="rightbottom" tips="a a a rightbottom rightbottom rightbottom rightbottom rightbottom some tips"><xy-button>rightbottom</xy-button></xy-tips></xy-col>
    <xy-col span="4"></xy-col>
    <xy-col span="4"></xy-col>
    <xy-col span="4"><xy-tips dir="bottomleft" tips="some tips"><xy-button>bottomleft</xy-button></xy-tips></xy-col>
    <xy-col span="4"><xy-tips dir="bottom" tips="some tips"><xy-button>bottom</xy-button></xy-tips></xy-col>
    <xy-col span="4"><xy-tips dir="bottomright" tips="some tips"><xy-button>bottomright</xy-button></x</xy-col>
</xy-row>

```html
<xy-tips dir="top" tips="some tips"><xy-button>top</xy-button></xy-tips>
<xy-tips dir="right" tips="some tips"><xy-button>right</xy-button></xy-tips>
<xy-tips dir="bottom" tips="some tips"><xy-button>bottom</xy-button></xy-tips>
<xy-tips dir="left" tips="some tips"><xy-button>left</xy-button></xy-tips>
<xy-tips dir="topleft" tips="some tips"><xy-button>topleft</xy-button></xy-tips>
<xy-tips dir="topright" tips="some tips"><xy-button>topright</xy-button></xy-tips>
<xy-tips dir="righttop" tips="some tips"><xy-button>righttop</xy-button></xy-tips>
<xy-tips dir="rightbottom" tips="some tips"><xy-button>rightbottom</xy-button></xy-tips>
<xy-tips dir="bottomleft" tips="some tips"><xy-button>bottomleft</xy-button></xy-tips>
<xy-tips dir="bottomright" tips="some tips"><xy-button>bottomright</xy-button></xy-tips>
<xy-tips dir="lefttop" tips="some tips"><xy-button>lefttop</xy-button></xy-tips>
<xy-tips dir="leftbottom" tips="some tips"><xy-button>leftbottom</xy-button></xy-tips>
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
<xy-tips tips="some tips" dir="auto"><xy-button>auto</xy-button></xy-tips>
```

## 类型`type`

可以通过`type`设置提示框的颜色，有三种类型`success`、`error`、`warning`

<xy-tips tips="success tips" type="success"><xy-button>success</xy-button></xy-tips>
<xy-tips tips="warning tips" type="warning"><xy-button>warning</xy-button></xy-tips>
<xy-tips tips="error tips" type="error"><xy-button>error</xy-button></xy-tips>

```html
<xy-tips tips="success tips" type="success"><xy-button>success</xy-button></xy-tips>
<xy-tips tips="warning tips" type="warning"><xy-button>warning</xy-button></xy-tips>
<xy-tips tips="error tips" type="error"><xy-button>error</xy-button></xy-tips>
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

<xy-tips tips="some tips" color="skyblue"><xy-button>custom color</xy-button></xy-tips>

```html
<xy-tips tips="some tips" color="skyblue"><xy-button>custom color</xy-button></xy-tips>
```

JavaScript操作`get`、`set`

```js
tips.color;
tips.color = 'red';
//原生属性操作
tips.getAttribute('color');
tips.setAttribute('color','red');
```

## 显示`show`

添加`show`属性可以主动控制提示框的出现时机，不再与`hover`和`focus`关联，可以取值`true`和`false`。

适用于表单错误信息描述。

<xy-tips tips="some tips" show="true"><xy-button>tips is show</xy-button></xy-tips>
<xy-switch checked onchange="this.previousElementSibling.show = this.checked;"></xy-switch>

```html
<xy-tips tips="some tips" show="true"><xy-button>tips is show</xy-button></xy-tips>
```

JavaScript操作`set`

```js
tips.show = true;
tips.show = false;
//原生属性操作
tips.setAttribute('show',true);
```

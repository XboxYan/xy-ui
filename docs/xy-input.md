# xy-input

输入框。用于替代原生`input`。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-input.js';
</script>
<!-- 使用 -->
<xy-input></xy-input>
```

## 初始值`defaultvalue`

设置或返回输入框的默认值。

<xy-input defaultvalue="XboxYan"></xy-input>

```html
<xy-input defaultvalue="XboxYan"></xy-input>
```

## 标签`label`

用来指定输入框的标记。

`label`属性提供了类似于`Metiral Design`的输入体验。

<xy-input label="user"></xy-input>


```html
<xy-input label="user"></xy-input>
```

## 占位`placeholder`

与原生`placeholder`一致。当有`label`属性时无效。

<xy-input placeholder="user"></xy-input>

```html
<xy-input placeholder="user"></xy-input>
```

## 图标`icon`

可以设置一个`icon`来表示标签标识，设置后`label`失效。

<xy-input icon="user"></xy-input>

```html
<xy-input icon="user"></xy-input>
```

## 禁用`disabled`

通过`disabled`可以禁用输入框，禁用后该按钮上的事件失效。

<xy-input label="user" disabled></xy-input>
<xy-switch checked onchange="this.previousElementSibling.disabled = this.checked;"></xy-switch>

```html
<xy-input label="user" disabled></xy-input>
```

JavaScript操作`get`、`set`

```js
input.disabled;//获取
input.disabled = false;
input.disabled = true;
//原生属性操作
input.getAttribute('disabled');
input.setAttribute('disabled','');
input.removeAttribute('disabled');
```

## 只读`readonly`

通过`readonly`让输入框只读。

<xy-input label="user" readonly defaultvalue="XboxYan"></xy-input>
<xy-switch checked onchange="this.previousElementSibling.readonly = this.checked;"></xy-switch>

```html
<xy-input label="user" readonly defaultvalue="XboxYan"></xy-input>
```

JavaScript操作`get`、`set`

```js
input.readonly;//获取
input.readonly = false;
input.readonly = true;
//原生属性操作
input.getAttribute('readonly');
input.setAttribute('readonly','');
input.removeAttribute('readonly');
```

## 块状`block`

`block`属性将使按钮适合其父宽度。

<xy-input label="user" block></xy-input>

```html
<xy-input label="user" block></xy-input>
```

## 值`value`

设置或返回输入框的`value`属性值。
该属性值在`xy-input`标签上不可见。

<xy-input></xy-input>
<xy-button type="primary" onclick="this.previousElementSibling.value='XboxYan'">设置value为XboxYan</xy-button>
<xy-button type="primary" onclick="XyMessage.info('当前value: '+this.previousElementSibling.previousElementSibling.value)">显示当前value</xy-button>

JavaScript操作`get`、`set`

```js
input.value; //获取
input.value = 'name';
//原生属性操作
input.getAttribute('value');
input.setAttribute('value','name');
```

## 类型`type`

目前支持`password`、`search`、`number`这几种类型，设置后会出现额外的`ui`控件。

### type=password

支持密码明文和密文切换。

<xy-input icon="lock" type="password"></xy-input>

```html
<xy-input icon="lock" type="password"></xy-input>
```

### type=search

右侧出现`search`图标，点击会执行`onsubmit`事件

<xy-input type="search" onsubmit="XyMessage.info(this.value)"></xy-input>

```html
<xy-input type="search" onsubmit="XyMessage.info(this.value)"></xy-input>
```

### type=number

数字输入框，类似于原生`input[type=number]`，支持`min`、`max`、`step`属性，支持键盘上下键切换数字。

<xy-input icon="creditcard" type="number" min="-10" max="10" step="0.5" ></xy-input>

```html
<xy-input icon="creditcard" type="number" min="-10" max="10" step="0.5" ></xy-input>
```

## 组合`xy-input-group`

`<xy-input-group>`可以将表单元素组合起来，包括`xy-button`、`xy-input`、`xy-select`。

<xy-input-group>
    <xy-select defaultvalue="https://">
        <xy-option value="http://">http://</xy-option>
        <xy-option value="https://">https://</xy-option>
    </xy-select>
    <xy-input></xy-input>
    <xy-button type="primary">go</xy-button>
</xy-input-group>

```html
<xy-input-group>
    <xy-select defaultvalue="https://">
        <xy-option value="http://">http://</xy-option>
        <xy-option value="https://">https://</xy-option>
    </xy-select>
    <xy-input></xy-input>
    <xy-button type="primary">go</xy-button>
</xy-input-group>
```

<xy-input-group>
    <xy-select defaultvalue="wuhan">
        <xy-option value="wuhan">武汉</xy-option>
        <xy-option value="shanghai">上海</xy-option>
    </xy-select>
    <xy-select defaultvalue="hongsan">
        <xy-option value="hongsan">洪山区</xy-option>
        <xy-option value="jiangxia">江夏区</xy-option>
    </xy-select>
    <xy-select defaultvalue="AAA">
        <xy-option value="AAA">AAA</xy-option>
        <xy-option value="BBB">BBB</xy-option>
    </xy-select>
</xy-input-group>

```html
<xy-input-group>
    <xy-select defaultvalue="wuhan">
        <xy-option value="wuhan">武汉</xy-option>
        <xy-option value="shanghai">上海</xy-option>
    </xy-select>
    <xy-select defaultvalue="hongsan">
        <xy-option value="hongsan">洪山区</xy-option>
        <xy-option value="jiangxia">江夏区</xy-option>
    </xy-select>
    <xy-select defaultvalue="AAA">
        <xy-option value="AAA">AAA</xy-option>
        <xy-option value="BBB">BBB</xy-option>
    </xy-select>
</xy-input-group>
```

纯`CSS`布局实现。

## 验证`checkValidity`

支持正则校验，如果不满足要求，则会出现错误提示。

### 1.内置的表单验证

#### 必填项`required`

<xy-input icon="user" required placeholder="required"></xy-input>

```html
<xy-input icon="user" required placeholder="required"></xy-input>
```

#### 最小长度`minlength`、最大长度`minlength`

<xy-input icon="user" placeholder="user" minlength="6" maxlength="10"></xy-input>

```html
<xy-input icon="user" placeholder="user" minlength="6" maxlength="10"></xy-input>
```

#### 邮箱email

设置`type='email'`可以对邮箱格式进行校验。

<xy-input icon="mail" type="email" placeholder="email"></xy-input>

```html
<xy-input icon="mail" type="email" placeholder="email"></xy-input>
```

这是原生支持的类型，如果不满足可以采用下面更为通用的正则校验。

### 2.正则pattern

设置`pattern`属性，这是一个正则。

<xy-input icon="phone" pattern="^1(3|4|5|6|7|8|9)\d{9}$" placeholder="请输入手机号"></xy-input>

```html
<xy-input icon="phone" pattern="^1(3|4|5|6|7|8|9)\d{9}$" placeholder="请输入手机号"></xy-input>
```

默认提示信息可能不人性化，可以自定义提示信息`errortips`

<xy-input icon="phone" pattern="^1(3|4|5|6|7|8|9)\d{9}$" placeholder="请输入手机号" errortips="手机号格式有误"></xy-input>

```html
<xy-input icon="phone" pattern="^1(3|4|5|6|7|8|9)\d{9}$" placeholder="请输入手机号" errortips="手机号格式有误"></xy-input>
```

可以设置提示信息的位置，默认为`top`，参考[`xy-tips`](xy-tips.md)。

<xy-input icon="mail" type="email" placeholder="email" errordir="right"></xy-input>

```html
<xy-input icon="mail" type="email" placeholder="email" errordir="right"></xy-input>
```

### 3.自定义验证

上面的校验均针对输入格式，如果需要对值进行校验，可使用`customValidity`，比如校验重复密码

<xy-form>
    <xy-form-item legend="password">
        <xy-input name="password" id="pwd" required type="password" placeholder="password" minlength="6"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password again">
        <xy-input name="password_confirm" id="pwdAgain" required type="password" placeholder="password confirm"></xy-input>
    </xy-form-item>
<xy-form>

```html
<xy-form>
    <xy-form-item legend="password">
        <xy-input name="password" id="pwd" required type="password" placeholder="password" minlength="6"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password again">
        <xy-input name="password_confirm" id="pwdAgain" required type="password" placeholder="password confirm"></xy-input>
    </xy-form-item>
<xy-form>
```

自定义格式如下

```js
pwdAgain.customValidity = {
    method:(el)=>{
        return el.value == pwd.value;//校验规则
    },
    tips:'前后密码不一致'//错误提示
}
```

### 4.忽略验证`novalidate`

如果使用该属性，则输入时不进行验证。

<xy-input icon="user" novalidate placeholder="user" minlength="6" maxlength="10"></xy-input>

```html
<xy-input icon="user" novalidate placeholder="user" minlength="6" maxlength="10"></xy-input>
```

## 合法性`validity`

可以通过属性`validity`来获取输入框内容的合法性。

<xy-input required placeholder="required"></xy-input>
<xy-button type="primary" onclick="XyMessage.info('合法性:'+this.previousElementSibling.validity)">合法性</xy-button>

JavaScript操作`get`

```js
input.validity;//获取
```

## 事件`event`

该组件暴露了常见的回调事件。

### onchange

当输入框文本改变的时候触发（失焦后）。

<xy-input onchange="XyMessage.info(this.value)"></xy-input>

```html
<xy-input onchange="fn(event)"></xy-input>
```

```js
input.onchange = function(ev){
    //获取value的几种方式
    /*
    event:{
        detail:{
            value,
        }
    }
    */
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
}

input.addEventListener('change',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
})
```

### oninput

当输入框在输入时触发。

<xy-input oninput="XyMessage.info(this.value)"></xy-input>

```html
<xy-input oninput="fn(event)"></xy-input>
```

```js
input.oninput = function(ev){
    //获取value的几种方式
    /*
    event:{
        detail:{
            value,
        }
    }
    */
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
}

input.addEventListener('input',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
})
```

通常，配合`debounce`可以设置防抖，比如`debounce="300"`表示在`300ms`内无操作才会触发。

<xy-input debounce="300" oninput="XyMessage.info(this.value)"></xy-input>

```html
<xy-input debounce="300" oninput="fn(event)"></xy-input>
```

### onsubmit

当聚焦时，按回车键`Enter`触发。

<xy-input onsubmit="XyMessage.info(this.value)" placeholder="Press Enter"></xy-input>

```html
<xy-input onsubmit="fn(event)"></xy-input>
```

```js
input.onsubmit = function(ev){
    //获取value的几种方式
    /*
    event:{
        detail:{
            value,
        }
    }
    */
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
}

input.addEventListener('submit',function(ev){
    console.log(this.value);
    console.log(ev.target.value);
    console.log(ev.detail.value);
})
```

### onfocus、onblur

`focus`、`blur`后的回调事件。

与[`xy-button`](xy-button.md?id=onfocus、onblur)使用方式一致。

## 方法`function`

### focus

用于主动聚焦`focus`。

<xy-input onfocus="XyMessage.info('focus')"></xy-input>
<xy-button type="primary" onclick="this.previousElementSibling.focus()">主动聚焦</xy-button>

```js
input.focus();
```

> 其他事件均与原生相同，比如`ondrop`、`onpaste`

### checkValidity

用于主动校验，弹出提示信息。

<xy-input required placeholder="required"></xy-input>
<xy-button type="primary" onclick="this.previousElementSibling.checkValidity()">主动校验</xy-button>

```js
input.checkValidity();
```
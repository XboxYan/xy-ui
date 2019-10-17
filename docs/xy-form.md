# xy-form

表单。基于HTML5规范的表单验证交互组件。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import './node_modules/xy-ui/components/xy-form.js';
</script>
<!-- 使用 -->
<xy-form action="/login" method="post">
    <xy-form-item legend="user">
        <xy-input name="user" required placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item>
        <xy-button type="primary" htmltype="submit">submit</xy-button>
        <xy-button htmltype="reset">reset</xy-button>
    </xy-form-item>
</xy-form>
```

需配合表单组件，比如`xy-input`、`xy-checkbox`等等。

> 表单元素通过`name`属性作为标识，存在`name`属性则被认定为表单元素，所有的校验均依赖于此。

## 表单域`xy-form-item`

`xy-form-item`可以实现表单两栏布局，`legend`属性规定了左侧文本域。

如果内部有表单元素有`required`属性，那么文本域会出现`*`符号。

<xy-form>
    <xy-form-item legend="user">
        <xy-input name="user" placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password"></xy-input>
    </xy-form-item>
</xy-form>

```html
<xy-form>
    <xy-form-item legend="user">
        <xy-input name="user" placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password"></xy-input>
    </xy-form-item>
</xy-form>
```

该组件仅仅是对常用表单布局的简单封装，如果不满足布局要求，可以采用普通的布局，比如`Flex`、`Grid`，更加灵活。

## 表单风格`type`

可以设置表单的风格样式，可选`normal`（默认）、`full`、`none`

* `normal` 默认风格，配合`xy-form-item`可实现两栏布局
* `full` 通栏风格，配合`xy-form-item`可实现通栏布局
* `none` 无风格，需自定义布局

<xy-radio-group onchange="this.nextElementSibling.type=this.value" defaultvalue="normal">
    <xy-radio value="normal">normal</xy-radio>
    <xy-radio value="full">full</xy-radio>
    <xy-radio value="none">none</xy-radio>
</xy-radio-group>
<xy-form>
    <xy-form-item legend="user">
        <xy-input name="user" placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password"></xy-input>
    </xy-form-item>
    <xy-form-item>
        <xy-button type="primary" htmltype="submit">login</xy-button>
        <xy-button htmltype="reset">reset</xy-button>
    </xy-form-item>
</xy-form>


```html
<xy-form type="full">
    ...
</xy-form>
```

> 纯`CSS`修改(属性选择器)

## 表单默认行为

`xy-form`内置了以下属性，基于`html5`规范。

这里的默认行为指的是，点击`submit`按钮或者回车，表单首先对表单元素进行格式校验，如果有误则会将有误的地方标识出来，全部正确后才能进行提交。

### 属性

* 表单地址`action`

值为`URL`，规定向何处发送表单数据。

回车键会触发表单。

* 请求方式`method`

规定请求方式，默认为`get`,可选`post`。

* 验证`novalidate`

如果使用该属性，则提交表单时不进行验证。

<xy-form action="/login" method="post" novalidate>
    <xy-form-item legend="user">
        <xy-input name="user" placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password"></xy-input>
    </xy-form-item>
</xy-form>

```html
<xy-form action="/login" method="post" novalidate>
    <xy-form-item legend="user">
        <xy-input name="user" placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password"></xy-input>
    </xy-form-item>
</xy-form>
```
> 该状态下即使格式有误仍然可以提交，可用`form.validity`获取验证合法性。

### 方法

* 提交`submit`

当表单内包含`htmltype="submit"`的按钮时，点击该按钮可以触发表单提交。

可通过`form.submit()`主动触发。

* 清空`reset`

当表单内包含`htmltype="reset"`的按钮时，点击该按钮可以清空表单。

可通过`form.reset()`主动触发。

<xy-form action="/login" method="post">
    <xy-form-item legend="user">
        <xy-input name="user" required placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password" minlength="6"></xy-input>
    </xy-form-item>
    <xy-form-item>
        <xy-button type="primary" htmltype="submit">submit</xy-button>
        <xy-button htmltype="reset">reset</xy-button>
    </xy-form-item>
</xy-form>

```html
<xy-form action="/login" method="post">
    <xy-form-item legend="user">
        <xy-input name="user" required placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password" minlength="6"></xy-input>
    </xy-form-item>
    <xy-form-item>
        <xy-button type="primary" htmltype="submit">login</xy-button>
        <xy-button htmltype="reset">reset</xy-button>
    </xy-form-item>
</xy-form>
```

可在控制台查看提交的表单数据，格式为`formData`，可转换`json`。

当表单提交完成，如果返回数据格式为`application/json`，可触发`submit`回调

```js
form.onsubmit = function(data){
    console.log(data)
    //后端返回的数据
}
form.addEventListener('submit',function(data){
    console.log(data)
    //后端返回的数据
})
```

## 自定义表单

### 自定义表单提交

当表单带有`action`属性时，回车键可以触发表单提交，如果包含`htmltype="submit"`的按钮时，点击该按钮可以触发表单提交。

如果想手动通过`ajax`提交，可以去除`action`属性，这样就不会触发默认表单提交效果了。

可通过`form.formdata`获取表单的值。

```html
<xy-form>
    ...
</xy-form>
```

```js
sumbitBtn.onclick = function(){
    //form.formdata（默认为formdata格式数据）
    //form.formdata.json（json格式数据）
    fetch('/login', {
        method: 'POST',
        body: form.formdata,
        
    })
    .then(function(data){
        //
    })
}
```

### 自定义表单验证

默认情况下，如果验证失败，表单则不会提交。

可以通过表单的`form.checkValidity()`方法手动校验所有表单元素，也可通过`form.validity`获取验证合法性。

<xy-form id="form-check">
    <xy-form-item legend="user">
        <xy-input name="user" required placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" required type="password" placeholder="password" minlength="6"></xy-input>
    </xy-form-item>
    <xy-form-item>
        <xy-button type="primary" onclick="checkform()">login</xy-button>
    </xy-form-item>
</xy-form>

```js
sumbitBtn.onclick = function(){
    if(form.checkValidity()){
        //全部验证通过
        XyDialog.success({
            title:"全部验证通过",
            content:JSON.stringify(form.formdata.json)
        })
    }
}
```

## 交互实例

下面表单采用组件默认验证交互，即点击`submit`按钮后开启即时验证，所有有误内容标红，但是提示`tips`只会出现在第1个表单上。

<xy-form action="/login" method="post" id="form-submit">
    <xy-form-item legend="user">
        <xy-input name="user" required placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" id="pwd" required type="password" placeholder="password" minlength="6"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password again">
        <xy-input name="password_confirm" id="pwdAgain" required type="password" placeholder="password confirm"></xy-input>
    </xy-form-item>
    <xy-form-item legend="city">
        <xy-select name="city" required>
            <xy-option value="wuhan">wuhan</xy-option>
            <xy-option value="beijin">beijin</xy-option>
            <xy-option value="shanghai">shanghai</xy-option>
        </xy-select>
    </xy-form-item>
    <xy-form-item legend="books">
        <xy-checkbox-group name="books" required min="2" max="3" defaultvalue="React,Angular">
            <xy-checkbox>React</xy-checkbox>
            <xy-checkbox>Vue</xy-checkbox>
            <xy-checkbox>Angular</xy-checkbox>
            <xy-checkbox>Flutter</xy-checkbox>
            <xy-checkbox>Swift</xy-checkbox>
        </xy-checkbox-group>
    </xy-form-item>
    <xy-form-item legend="lang">
        <xy-radio-group name="lan" required>
            <xy-radio>Html</xy-radio>
            <xy-radio>Css</xy-radio>
            <xy-radio>Javascript</xy-radio>
            <xy-radio>Php</xy-radio>
            <xy-radio>Dart</xy-radio>
        </xy-radio-group>
    </xy-form-item>
    <xy-form-item>
        <xy-checkbox name="read" required value="read">I have read this book</xy-checkbox>
    </xy-form-item>
    <xy-form-item>
        <xy-button type="primary" htmltype="submit" onclick="formSubmit()">submit</xy-button>
        <xy-button htmltype="reset">reset</xy-button>
    </xy-form-item>
</xy-form>

```html
<xy-form action="/login" method="post" id="form-submit">
    <xy-form-item legend="user">
        <xy-input name="user" required placeholder="user"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password">
        <xy-input name="password" id="pwd" required type="password" placeholder="password" minlength="6"></xy-input>
    </xy-form-item>
    <xy-form-item legend="password again">
        <xy-input name="password_confirm" id="pwdAgain" required type="password" placeholder="password confirm"></xy-input>
    </xy-form-item>
    <xy-form-item legend="city">
        <xy-select name="city" required>
            <xy-option value="wuhan">wuhan</xy-option>
            <xy-option value="beijin">beijin</xy-option>
            <xy-option value="shanghai">shanghai</xy-option>
        </xy-select>
    </xy-form-item>
    <xy-form-item legend="books">
        <xy-checkbox-group name="books" required min="2" max="3" defaultvalue="React,Angular">
            <xy-checkbox>React</xy-checkbox>
            <xy-checkbox>Vue</xy-checkbox>
            <xy-checkbox>Angular</xy-checkbox>
            <xy-checkbox>Flutter</xy-checkbox>
            <xy-checkbox>Swift</xy-checkbox>
        </xy-checkbox-group>
    </xy-form-item>
    <xy-form-item legend="lang">
        <xy-radio-group name="lan" required>
            <xy-radio>Html</xy-radio>
            <xy-radio>Css</xy-radio>
            <xy-radio>Javascript</xy-radio>
            <xy-radio>Php</xy-radio>
            <xy-radio>Dart</xy-radio>
        </xy-radio-group>
    </xy-form-item>
    <xy-form-item>
        <xy-checkbox name="read" required value="read">I have read this book</xy-checkbox>
    </xy-form-item>
    <xy-form-item>
        <xy-button type="primary" htmltype="submit" onclick="formSubmit()">submit</xy-button>
        <xy-button htmltype="reset">reset</xy-button>
    </xy-form-item>
</xy-form>
```

针对确认密码的校验

```js
document.getElementById('pwdAgain').customValidity = {
    method:(el)=>{
        return el.value == document.getElementById('pwd').value;
    },
    tips:'前后密码不一致'
}
```
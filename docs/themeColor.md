# themeColor

`xy-ui`的所有组件均可设置`themeColor`，不同于一些框架采用`less`、`sass`等预处理器， 这里采用`CSS`[自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)（`--themeColor`）实现。

每个组件可以单独设置（并不推荐，影响统一风格），也可以全局设置（推荐）。

```css
xy-button{
    --themeColor: #42b983;/**单独设置**/
}
:root {
    --themeColor: #42b983;/**全局设置**/
}
```

也可以通过`JavaScript`实时修改。

```js
document.body.style.setProperty('--themeColor','#F44336');
```

点击下方切换主题颜色

<xy-button type="primary" class="theme-button" style="--themeColor:#42b983" onclick="changeColor('#42b983')">#42b983</xy-button>
<xy-button type="primary" class="theme-button" style="--themeColor:#1E90FF" onclick="changeColor('#1E90FF')">#1E90FF</xy-button>
<xy-button type="primary" class="theme-button" style="--themeColor:#F44336" onclick="changeColor('#F44336')">#F44336</xy-button>
<xy-button type="primary" class="theme-button" style="--themeColor:#9c27b0" onclick="changeColor('#9c27b0')">#9c27b0</xy-button>
<xy-button type="primary" class="theme-button" style="--themeColor:#3F51B5" onclick="changeColor('#3F51B5')">#3F51B5</xy-button>

实时预览（其他页面均生效）

<xy-button type="primary">primary</xy-button>
<xy-button type="dashed">dashed</xy-button>
<xy-button type="flat">flat</xy-button>
<xy-button>default</xy-button>
<xy-button type="primary" loading>loading</xy-button>
<xy-slider defaultvalue="30" min="-100" max="100" step="1"></xy-slider>
<p></p>
<xy-select>
    <xy-option value="1">Option1</xy-option>
    <xy-option value="2">Option2</xy-option>
    <xy-option value="3">Option3</xy-option>
</xy-select>
<p></p>
<xy-switch checked></xy-switch>
<p></p>
<xy-radio name="library" checked>React</xy-radio>
<xy-radio name="library">Vue</xy-radio>
<xy-radio name="library">Angular</xy-radio>
<xy-radio name="library">Other</xy-radio>
<p></p>
<xy-checkbox name="lang" checked>Html</xy-checkbox>
<xy-checkbox name="lang">Css</xy-checkbox>
<xy-checkbox name="lang">Javascript</xy-checkbox>
<xy-checkbox name="lang">Python</xy-checkbox>
<xy-checkbox name="lang">Php</xy-checkbox>
<xy-checkbox name="lang">Dart</xy-checkbox>
<xy-checkbox name="lang">Swift</xy-checkbox>
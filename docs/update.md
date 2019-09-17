# update
* ## 1.8.4
    * `xy-slider`在`vertical`属性下支持动态样式修改
* ## 1.8.3
    * `xy-slider`新增`vertical`、`prefix`属性
* ## 1.8.2
    * [`xy-layout`](xy-layout.md?id=栅格row、col)新增`grid`栅格布局
    * `xy-button`新增`danger`类型
    * 修复`xy-slider`在火狐上的`input`触发问题
    * 其他`bug`修复
* ## 1.8.1
    * 新增[`xy-text`](xy-text.md)组件
* ## 1.8.0
    * 新增[`xy-table`](xy-table.md)组件
    * `xy-checkbox`新增`indeterminate`状态
    * 修复`xy-date-picker`在`1`月份选取去年`12`月份的`bug`
    * 修复`xy-color-pane`在空白处触发`change`的`bug`
* ## 1.7.1
    * [`xy-date-picker`](xy-date-picke.md)新增[`range`](xy-date-picke.md?id=范围选择range)属性

    ![xy-date-range-picker](../screenshot/xy-date-range-picker.png)

    * 优化`xy-color-picker`和`xy-date-picker`初始化逻辑
    * 其他`bug`修复
* ## 1.7.0
    * 新增[`xy-date-picker`](xy-date-picke.md)组件

    ![xy-date-picker](../screenshot/xy-date-picker.png)

    * 优化`xy-icon`的图标加载方式，不会再阻塞页面渲染了~
    * 主题配置新增`--themeBackground`
    * 其他`bug`修复
* ## 1.6.1
    * 优化`xy-button`的`Enter`键逻辑
    * 优化`xy-icon`的图标加载方式
    * 替换部分组件内置图标为`svg`方式，减少`xy-icon`依赖
* ## 1.6.0
    * 新增[`xy-pagination`](xy-pagination.md)分页组件

    ![xy-pagination](../screenshot/xy-pagination.png)

    * 修复`xy-form`下`xy-select`回车键触发`submit`问题
    * 更改组件尺寸为`em`相对尺寸，部分组件除外
    * `xy-color-pane`现在在鼠标抬起时才触发`change`回调
    * 其他`bug`修复
* ## 1.5.2
    * 修改属性`lable`为`legend`，`lablewidth`为`legendwidth`
    * `xy-radio-group`、`xy-checkbox-group`新增`disabled`属性
    * 优化`xy-form`和`xy-form-item`的`lablewidth`属性
    * `xy-popover`优化关闭按钮样式
    * `xy-color-picker`新增内置颜色
    * `xy-form`表单校验不会对`disabled`属性表单元素进行校验
* ## 1.5.1
    * 优化`xy-radio-group`和`xy-checkbox-group`的`hover`层级问题
    * `xy-form`新增演示动画

    ![xy-form](../screenshot/xy-form.png)
    
* ## 1.5.0
    * 新增[`xy-form`](xy-form.md)表单组件，集成表单验证功能
    * 新增`xy-radio-group`和`xy-checkbox-group`组件
    * `xy-img`新增加载动画
    * 主题颜色管理，`fontColor`、`errorColor`、`successColor`、`warningColor`、`borderColor`等
    * 其他`bug`修复
* ## 1.4.2
    * 重构[`xy-icon`](xy-icon.md)的引用方式，不用再设置`iconUrl`和`basePath`了~
    * 支持`cdn`引入，采用[unpkg](https://unpkg.com/)
    * 新增`react`项目使用方式[demo](https://codepen.io/xboxyan/pen/mNKWaN)
* ## 1.4.0
    * 新增`xy-color-picker`颜色选择器、`xy-color-pane`颜色面板

    ![xy-color-picker](../screenshot/color-picker.png)

    * 优化[xy-popover](xy-popover.md)空白处点击处关闭逻辑
    * 修复[xy-select](xy-select.md)`hover`层级问题
* ## 1.3.4
    * [xy-button](xy-button.md?id=状态切换toggle)新增`toggle`属性
    * 修复[xy-select](xy-select.md)样式问题
    * 修复[xy-switch](xy-switch.md)、[xy-checkbox](xy-checkbox.md)点击重复触发`focus`的问题
    * 修复[xy-radio](xy-radio.md)在自定义组件内单选问题
* ## 1.3.3
    * 重构[xy-select](xy-select.md)，基于`xy-popover`，逻辑更清晰
    * 修复[xy-popover](xy-popover.md)、[xy-select](xy-select.md)空白处点击处关闭的问题
* ## 1.3.2
    * 修复[xy-popover](xy-popover.md?id=触发trigger)在火狐上的触发（`hover`、`focus`）问题
    * 新增[xy-popover](xy-popover.md?id=示例)示例
* ## 1.3.1
    * [xy-popover](xy-popover.md?id=触发trigger)新增`trigger`属性
* ## 1.3.0
    * 新增[xy-popover](xy-popover.md)悬浮操作组件
    * [xy-tips](xy-tips.md?id=方向dir)的`dir`新增`8`个方向
    * [xy-button](xy-button.md?id=链接href)新增`href`属性
    * [xy-input](xy-input.md?id=oninput)新增`debounce`属性
    * 优化[xy-select](xy-select.md)逻辑
* ## 1.2.0
    * 修复`xy-img`关闭画廊时的定位问题
    * 精简所有`focus`、`blur`事件
    * 新增[xy-rate](xy-rate.md)组件
* ## 1.1.0
    * 重构`xy-button`组件结构，更易于自定义
    * 新增[xy-img](xy-img.md)组件
* ## 1.0.2
    * 修复已知bug
    * `xy-slider` 新增`suffix`属性
* ## 1.0.0
    * 完成基本组件
    - [x] [xy-button](xy-button.md)
    - [x] [xy-icon](xy-icon.md)
    - [x] [xy-slider](xy-slider.md)
    - [x] [xy-select](xy-select.md)
    - [x] [xy-loading](xy-loading.md)
    - [x] [xy-tab](xy-tab.md)
    - [x] [xy-switch](xy-switch.md)
    - [x] [xy-checkbox](xy-checkbox.md)
    - [x] [xy-radio](xy-radio.md)
    - [x] [xy-tips](xy-tips.md)
    - [x] [xy-layout](xy-layout.md)
    - [x] [xy-dialog](xy-dialog.md)
    - [x] [xy-input](xy-input.md)
    - [x] [xy-textarea](xy-textarea.md)
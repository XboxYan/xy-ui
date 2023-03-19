<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/switch/')
    import('../../components/button/')
    import('../../components/popover/')
  })
</script>

# popover

悬浮提示（操作）框。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/popover/index.js';
</script>
<!-- 使用 -->
<xy-popover>
    <xy-button>pop confirm</xy-button>
    <!-- dom -->
    <xy-popup>
        <div>自定义内容</div>
    </xy-popup>
</xy-popover>
```

需要将悬浮内容放入`<xy-popup></xy-popup>`内

## 自定义

当内容需要自定义时，`content`可能无法满足需求，可以将`dom`节点设置`slot=content`属性。

<xy-popover>
    <xy-button>pop confirm</xy-button>
    <!-- dom -->
    <xy-popup type="pane">
        <div>我是悬浮框</div>
    </xy-popup>
</xy-popover>
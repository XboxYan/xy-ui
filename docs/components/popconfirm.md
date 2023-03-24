<script setup>
import { reactive, onMounted } from 'vue'
import './index.css'
  onMounted(() => {
    import('../../components/switch/')
    import('../../components/button/')
    import('../../components/popconfirm/')
    // popover_event.addEventListener('show',function(ev){
    //     console.log('悬浮层出现了');
    // })
    // popover_event.addEventListener('hide',function(ev){
    //     console.log('悬浮层消失了');
    // })
  })
</script>

# popconfirm

确认悬浮框，基于`xy-popover`实现。

## 使用方式

```html
<!-- 引入 -->
<script type="module">
    import '../components/popconfirm/index.js';
</script>
<!-- 使用 -->
<xy-button>confirm</xy-button>
<xy-popconfirm>
</xy-popconfirm>
```

需要将悬浮内容放入`<xy-popover></xy-popover>`内

## 标题`title`、描述`desc`

提供两种默认样式，默认是带指向箭头的，同 [tips](./tips)，如果需要自定义，可以使用`custom`

<div class="wrap">
  <xy-button type="primary" danger>删除</xy-button>
  <xy-popconfirm title="确认要删除吗？">
    删除之后无法恢复
  </xy-popconfirm>
</div>

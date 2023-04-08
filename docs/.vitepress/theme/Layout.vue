<script setup>
import DefaultTheme from "vitepress/theme"
import Giscus from '@giscus/vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="giscus">
        <Giscus
          :key="giscus"
          host="https://giscus.app"
          repo="XboxYan/xy-ui"
          repoId="MDEwOlJlcG9zaXRvcnk2MjYzODgxNA=="
          categoryId="MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyOTYxODk2" 
          :theme="isDark ? 'dark' : 'light'"
          lang="zh-CN"
          loading="lazy"
          strict="1"
          mapping="title"
          crossorigin="anonymous"
        />
      </div>
    </template>
  </Layout>
</template>

<script>
import { watch } from 'vue'
import { useRoute, useData } from 'vitepress'

export default {
  mounted() {
    const vitePressData = useData()
    this.isDark = vitePressData.isDark

    const route = useRoute() 
    watch(route, () => {
      this.giscus = !this.giscus
    })
  },
  data() {
    return {
      giscus: true,
      isDark: false
    }
  }
}
</script>

<style>
img.pv {
  margin-top: 1em;
}

div.giscus {
  margin-top: 2em;
}

</style>
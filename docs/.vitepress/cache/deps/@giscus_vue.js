import {
  createCommentVNode,
  createElementBlock,
  defineComponent,
  onMounted,
  openBlock,
  ref
} from "./chunk-R647EDCJ.js";

// node_modules/@giscus/vue/dist/index.mjs
var d = ["id", "host", "repo", "repoid", "category", "categoryid", "mapping", "term", "strict", "reactionsenabled", "emitmetadata", "inputposition", "theme", "lang", "loading"];
var g = defineComponent({
  __name: "Giscus",
  props: {
    id: null,
    host: null,
    repo: null,
    repoId: null,
    category: null,
    categoryId: null,
    mapping: null,
    term: null,
    theme: null,
    strict: null,
    reactionsEnabled: null,
    emitMetadata: null,
    inputPosition: null,
    lang: null,
    loading: null
  },
  setup(e) {
    const t = ref(false);
    return onMounted(() => {
      t.value = true, import("./giscus-a53917f0-JJCRCOKM.js");
    }), (c, m) => t.value ? (openBlock(), createElementBlock("giscus-widget", {
      key: 0,
      id: e.id,
      host: e.host,
      repo: e.repo,
      repoid: e.repoId,
      category: e.category,
      categoryid: e.categoryId,
      mapping: e.mapping,
      term: e.term,
      strict: e.strict,
      reactionsenabled: e.reactionsEnabled,
      emitmetadata: e.emitMetadata,
      inputposition: e.inputPosition,
      theme: e.theme,
      lang: e.lang,
      loading: e.loading
    }, null, 8, d)) : createCommentVNode("", true);
  }
});
export {
  g as default
};
//# sourceMappingURL=@giscus_vue.js.map

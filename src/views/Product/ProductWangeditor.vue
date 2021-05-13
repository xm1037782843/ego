<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: "", //
    };
  },
  mounted() {
    this.editor = new E("#main");
    // 取消自动 focus
    this.editor.config.focus = false;
    // 配置 onchange 回调函数
    this.editor.config.onchange = (val) => {
      //   console.log("change-----", val);
      this.$emit("wangeditorData", val);
    };
    //配置菜单
    // 配置菜单栏，删减菜单，调整顺序
    // 默认情况下，显示所有菜单
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
    //   "strikeThrough",
    //   "indent",
    //   "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
    //   "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];

    this.editor.create();
  },
};
</script>

<style lang="less" scoped>
</style>
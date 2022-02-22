<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// UI库 局部引用
// import { ElButton } from "element-plus";
// important!!!   element-plus 设置全局语言
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

// JS中 defineComponent() 相当于 foo(obj) {return obj}
// TS中 defineComponent()函数 可以结合其泛型对 对象中得属性进行 限制 和 推导 (作用)
export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
  },
  setup() {
    return { zhCn };
  },
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>

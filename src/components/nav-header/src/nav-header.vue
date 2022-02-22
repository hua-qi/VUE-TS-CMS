<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import UserInfo from "./cpns/user-info.vue";
import NavBreadcrumb from "@/base-ui/breadcrumb/index";

import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
export default defineComponent({
  components: {
    UserInfo,
    NavBreadcrumb,
  },
  // 向父组件发送事件
  emits: ["foldChange"],
  setup(props, { emit }) {
    // 侧边栏折叠时，nav-header响应
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };

    // 面包屑数据 [{name: "",path: ""}]
    const store = useStore();
    const route = useRoute();
    // userMenus/currentPath 响应式修改（计算属性依赖的属性发生修改时，会重新计算）
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });
    return {
      isFold,
      breadcrumbs,
      handleFoldClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>

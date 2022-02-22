<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <!-- 向子组件传值 -->
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <!-- 为整个路由页面添加设置样式 -->
          <div class="page-info">
            <!-- 路由占位符 -->
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
  },
  setup() {
    const isCollapse = ref(false);
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold;
    };
    return {
      isCollapse,
      handleFoldChange,
    };
  },
});
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-content,
  .page {
    height: 100%;
  }

  .page-content {
    height: calc(100% - 48px);
  }

  .el-header {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
    height: 48px !important;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .page-content {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
    .page-info {
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
</style>

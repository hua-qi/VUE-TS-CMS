<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- template 使用src根目录别名固定格式 ~@ -->
      <img class="img" src="~@/assets/images/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">huaqi-vue-ts</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- item.type === 1 :拥有子节点 -->
        <template v-if="item.type === 1">
          <!-- 可以展开的标题 -->
          <!-- 列表唯一标识符 绑定 index(要求 string )(用于选定列表项目) -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历其中的子节点 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- item.type === 2 :可以进行点击,跳转页面 -->
        <template v-else-if="item.type === 2">
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
// 自定义 useStore
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";
export default defineComponent({
  // 接收父组件传值
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // store
    const store = useStore();
    const userMenus = computed(() => store.state.login.userMenus);

    // router
    const router = useRouter();
    const route = useRoute();
    const currnentPath = route.path;

    // data
    const menu = pathMapToMenu(userMenus.value, currnentPath); // 路径匹配
    const defaultValue = ref(menu.id + "");

    // event handle
    // menus click event
    const handleMenuItemClick = (item: any) => {
      // 路由跳转
      router.push({
        path: item.url ?? "/not-found",
      });
    };
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  // 样式覆盖
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>

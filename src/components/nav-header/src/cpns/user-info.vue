<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="circleUrl"></el-avatar>
        <span class="userName">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-s-operation"
            >系统管理</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-user">用户信息</el-dropdown-item>
          <el-dropdown-item divided @click="handleExitClick">
            <el-icon>
              <promotion />
            </el-icon>
            <span> 退出登录 </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

import { useRouter } from "vue-router";
import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const store = useStore();
    const name = computed(() => store.state.login.userInfo.name);
    const circleUrl =
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

    // 退出登录
    const router = useRouter();
    const handleExitClick = () => {
      // 清空用户相关数据
      localCache.deleteCache("token");
      localCache.deleteCache("userInfo");
      localCache.deleteCache("userMenus");
      // 跳转至 /main 页面, 借用路由守卫跳转至 /login页面
      router.push("/main");
    };
    return {
      name,
      circleUrl,
      handleExitClick,
    };
  },
});
</script>

<style scoped lang="less">
.user-info {
  cursor: pointer;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    .userName {
      margin-left: 10px;
    }
  }
}
</style>

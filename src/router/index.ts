import { createRouter, createWebHistory } from "vue-router";
// RouteRecordRaw routers类型声明(vue-router 源码已声明)
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";
const routers: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    // children: [] => 根据userMenus决定 -> children
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  routes: routers,
  history: createWebHistory(),
});

// 回调函数 目标路由非登录路由，进行登录判断 (路由守卫)
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }

  // 通过url进入 /main 此时进行匹配
  if (to.path === "/main") {
    return firstMenu.url;
  }
});

export default router;

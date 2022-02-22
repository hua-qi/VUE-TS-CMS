import { Module } from "vuex";
import { ILoginState } from "./types";
import { IRootState } from "../types";
// account登录请求
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId,
} from "@/service/login/login";
// 本地缓存
import localCache from "@/utils/cache";
// account请求参数类型
import { IAccount } from "@/service/login/type";
// 路由映射方法
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus";
import router from "@/router";
// Module 泛型<S,R> S: 自身state类型，R: 根模块state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissionsList: [],
    };
  },
  getters: {},
  mutations: {
    // 修改state中数据的唯一途径,通过mutations

    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      // userMenus -> routes
      const routes = mapMenusToRoutes(userMenus);

      // 注册路由 routes -> router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      // 获取用户权限组
      const permissionsList = mapMenusToPermissions(userMenus);
      state.permissionsList = permissionsList;
    },
  },
  actions: {
    // commit, payload 稍后处理
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //  1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      // token本地缓存
      localCache.setCache("token", token);

      // 2. 请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      // 本地缓存userInfo 方便用户下次登录
      localCache.setCache("userInfo", userInfo);

      // 3. 请求用户列表信息
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      // 4. 跳转至首页
      router.push("/main");

      // 5.获取弹窗下拉列表信息 role/department（每次登录请求一次）
      dispatch("getInitialDataAction", null, { root: true });
    },
    // 用户刷新时，vuex 重新加载信息
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
        // 获取弹窗下拉列表信息 role/department（每次刷新请求一次）
        dispatch("getInitialDataAction", null, { root: true });
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log("执行phoneLoginAction", payload);
    // },
  },
};

export default loginModule;

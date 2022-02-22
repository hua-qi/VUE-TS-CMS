import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from "./types";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
    };
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // 类型断言 any，方便进行字符拼接
        return (state as any)[`${pageName}List`];
        /*  switch (pageName) {
          case "users":
            return state.usersList;
          case "role":
            return state.roleList;
        } */
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    // commit 上下文使用
    async getPageListAction({ commit }, payload: any) {
      // 一、获取 pageUrl
      /*   根据 参数匹配路径
      1.（路径规范的前提下），直接使用字符拼接
      2. 使用switch 选择
      3. 使用 map 映射对象 */
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      /*  switch (pageName) {
        case "users":
          pageUrl = "/users/list";
          break;
        case "role":
          pageUrl = "/role/list";
          break;
      } */

      // 二、对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = pageResult.data;
      // 提交 mutations
      // pageName 首字符大写
      const pageNameToUpper = pageName.replace(
        pageName[0],
        pageName[0].toUpperCase()
      );
      commit(`change${pageNameToUpper}List`, list);
      commit(`change${pageNameToUpper}Count`, totalCount);
    },

    // 删除页面信息
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      // 2.调用删除网络请求
      await deletePageData(pageUrl);

      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    // 弹窗创建用户
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);

      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    // 弹窗点击确定按钮
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id, queryInfo } = payload;
      console.log(editData);
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);

      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          queryInfo,
        },
      });
    },
  },
};

export default systemModule;

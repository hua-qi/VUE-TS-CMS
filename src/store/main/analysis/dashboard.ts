// 引入vuex 模块
import { Module } from "vuex";

// 引入各个请求
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
} from "@/service/main/analysis/dashboard";

import { IDashboardState } from "./types";
import { IRootState } from "@/store/types";

// 类型注释泛型
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount();
      commit("changeCategoryGoodsCount", categoryCountResult.data);
      const categorySaleResult = await getCategoryGoodsSale();
      commit("changeCategoryGoodsSale", categorySaleResult.data);
      const categoryFavorResult = await getCategoryGoodsFavor();
      commit("changeCategoryGoodsFavor", categoryFavorResult.data);
      const addressGoodsResult = await getAddressGoodsSale();
      commit("changeAddressGoodsSale", addressGoodsResult.data);
    },
  },
};

// 导出模块，并在 根store 注册模块
export default dashboardModule;

<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      addTitle="添加用户"
      @addBtnClick="handleAddData"
      @editBtnClick="handleEditData"
    >
      <template #enable="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'primary' : 'danger'"
        >
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
    </page-content>
    <page-model
      :defaultInfo="defaultInfo"
      ref="pageModelRef"
      pageName="users"
      :modelConfig="modelConfigRef"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
// 搜索组件及其配置
import { PageSearch } from "@/components/page-search";
import { searchFormConfig } from "./config/search-config";
// 表单组件及其配置
import { PageContent } from "@/components/page-content";
import { contentTableConfig } from "./config/content-config";

// 弹出框组件及其配置
import { PageModel } from "@/components/page-model";
import { modelConfig } from "./config/model-config";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModel } from "@/hooks/use-page-model";
export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    PageModel,
  },
  // setup() 属于 create 声明周期，只创建一次，不存在响应式
  // 具有响应式特性（template, computed,... ）
  setup() {
    // 调用重置、检索hooks函数
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();

    // 1. pageModel独属于该页面的函数
    const addCallback = () => {
      // 密码框默认显示
      /*   // 获取 密码输入框 对应配置文件
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === "password"
      );
      if (passwordItem) {
        // 新建时 密码框显示
        passwordItem.isHidden = false;
      } */
    };
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === "password"
      );
      if (passwordItem) {
        // 编辑时 密码框隐藏
        passwordItem.isHidden = true;
      }
    };

    // 2.动态添加部门和角色列表
    const store = useStore();
    // computed 响应式处理
    const modelConfigRef = computed(() => {
      // 2.1. 获取配置文件中部门列表
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      // 2.2. 将 vuex 中 部门列表信息 赋值于 配置文件 (键值对匹配)
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return {
          title: item.name,
          value: item.id,
          key: item.id,
          label: item.name,
        };
      });
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return {
          title: item.name,
          value: item.id,
          key: item.id,
          label: item.name,
        };
      });
      return modelConfig;
    });

    // 调用pageModel hook 函数，传入回调函数
    const [pageModelRef, defaultInfo, handleAddData, handleEditData] =
      usePageModel(addCallback, editCallback);

    return {
      searchFormConfig,
      contentTableConfig,
      modelConfigRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModelRef,
      defaultInfo,
      handleAddData,
      handleEditData,
    };
  },
});
</script>

<style scoped></style>

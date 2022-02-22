<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      addTitle="添加角色"
      @addBtnClick="handleAddData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-model
      :modelConfig="modelConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
      ref="pageModelRef"
    >
      <div class="menuTree">
        <el-tree
          ref="elTreeRef"
          :props="{ children: 'children', label: 'name' }"
          :data="menus"
          node-key="id"
          show-checkbox
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import { useStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus";
import { ElTree } from "element-plus";
import { PageSearch } from "@/components/page-search";
import { PageContent } from "@/components/page-content";
import { PageModel } from "@/components/page-model";

import { searchFormConfig } from "./config/search-config";
import { contentTableConfig } from "./config/content-config";
import { modelConfig } from "./config/model-config";

import { usePageModel } from "@/hooks/use-page-model";

export default defineComponent({
  name: "role",
  components: {
    PageSearch,
    PageContent,
    PageModel,
  },
  setup() {
    // 处理 pageModel hoolk 函数
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      // 获取处理过后的叶子节点
      const leafKeys = menuMapLeafKeys(item.menuList);
      // 未调用nextTick之前，setCheckedKeys 数值绑定是，数据并没有传输过来。此时绑定为空数据
      // 将数值绑定延迟到 数据传输之后
      nextTick(() => {
        // 将叶子节点值 赋值于 ElTree
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const [pageModelRef, defaultInfo, handleAddData, handleEditData] =
      usePageModel(undefined, editCallback);
    // 获取 menus 数据
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);

    // 获取 ElTree 数据
    const otherInfo = ref({});
    // data1: ElTree 全部选项数据
    // data2: ElTree 已选/半选(父级列表) 数据
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };
    return {
      searchFormConfig,
      contentTableConfig,
      handleAddData,
      handleEditData,
      modelConfig,
      pageModelRef,
      defaultInfo,
      otherInfo,
      menus,
      elTreeRef,
      handleCheckChange,
    };
  },
});
</script>

<style scoped>
.menuTree {
  margin-left: 80px;
}
</style>

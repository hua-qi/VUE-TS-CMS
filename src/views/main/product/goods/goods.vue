<template>
  <div class="goods">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      addTitle="添加商品"
    >
      <template #oldPrice="scope"> {{ "￥" + scope.row.oldPrice }} </template>
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image
      ></template>
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'primary' : 'danger'"
          >{{ scope.row.status ? "启用" : "禁用" }}</el-button
        >
      </template></page-content
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { PageContent } from "@/components/page-content";
import { contentTableConfig } from "./config/content-config";

export default defineComponent({
  name: "goods",
  components: {
    PageContent,
  },
  setup() {
    return {
      contentTableConfig,
    };
  },
});
</script>

<style scoped></style>

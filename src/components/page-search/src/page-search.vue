<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h3>高级检索</h3>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon style="vertical-align: middle">
              <refresh />
            </el-icon>
            <span style="vertical-align: middle"> 重置 </span>
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon style="vertical-align: middle">
              <search />
            </el-icon>
            <span style="vertical-align: middle"> 检索 </span>
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { HyForm } from "@/base-ui/form";
export default defineComponent({
  components: {
    HyForm,
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    // 双向绑定的数据由配置文件的field属性决定
    const formItems = props.searchFormConfig.formItems ?? [];
    const formOriginData: any = [];
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);
    // 用户点击重置按钮
    const handleResetClick = () => {
      // 方法一： 双向绑定 v-model
      /*   for (const key in formOriginData) {
        // 原 formData 是通过浅拷贝方式获取内容
        // 通过以下方式对原值进行修改
        formData.value[`${key}`] = formOriginData[key];
      } */
      // 方法二： 子组件事件触发
      formData.value = formOriginData;
      // 向父组件发送事件
      emit("resetBtnClick");
    };
    // 用户点击搜索按钮
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value);
    };
    return { formData, handleResetClick, handleQueryClick };
  },
});
</script>

<style scoped lang="less">
.page-search {
  .handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>

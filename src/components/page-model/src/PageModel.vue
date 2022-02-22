<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      destroy-on-close
      title="新建用户"
      width="30%"
      center
    >
      <hy-form v-bind="modelConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取 消 </el-button>
          <el-button type="primary" @click="handleConfirmClick()">
            确 认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "@/store";
import { HyForm } from "@/base-ui/form";

export default defineComponent({
  components: {
    HyForm,
  },
  props: {
    modelConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    // 其他组件传递数据
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const dialogVisible = ref(false);
    const formData = ref<any>({});
    // 监听父组件传递 defaultInfo
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modelConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );

    // 弹窗点击确定后逻辑实现
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      // 弹窗输入框是否回显
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          // 参数合并
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
        });
      } else {
        // 新建
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        });
      }
    };
    return { dialogVisible, formData, handleConfirmClick };
  },
});
</script>

<style scoped></style>

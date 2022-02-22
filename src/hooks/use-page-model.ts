import { ref } from "vue";
import { PageModel } from "@/components/page-model";

type CallbackFn = (item?: any) => void;

export function usePageModel(addCb?: CallbackFn, editCb?: CallbackFn) {
  // 获取组件实例
  const pageModelRef = ref<InstanceType<typeof PageModel>>();
  const handleAddData = () => {
    // 添加数据时，dialog 内容清空
    defaultInfo.value = {};
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true;
    }
    // 回调函数 逻辑与判断
    addCb && addCb();
  };
  // 设置弹窗输入框默认值
  const defaultInfo = ref({});
  const handleEditData = (item: any) => {
    // item 对象结构 浅拷贝
    defaultInfo.value = { ...item };
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true;
    }
    // 回调函数传递 row.item
    editCb && editCb(item);
  };
  return [pageModelRef, defaultInfo, handleAddData, handleEditData];
}

import { ref } from "vue";
import { PageContent } from "@/components/page-content";

// 封装重置、检索函数
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleResetClick = () => {
    pageContentRef.value?.getPageData();
  };
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  // 返回（ts 中 元组） （js 中 数组）
  return [pageContentRef, handleResetClick, handleQueryClick];
}

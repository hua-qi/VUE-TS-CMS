import hyRequest from "@/service";
import { IDataType } from "@/service/types";
// 1. 获取列表信息
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo,
  });
}

// 2. 删除单行信息
// url: /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url,
  });
}

// 弹窗创建用户
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData,
  });
}

// 弹窗编辑用户
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData,
  });
}

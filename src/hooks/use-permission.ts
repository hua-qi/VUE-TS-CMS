import { useStore } from "@/store";

// 用户权限对比验证
export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore();
  // 获取该用户权限组
  const permissionsList = store.state.login.permissionsList;
  // 传入权限名拼接
  const verifyPermission = `system:${pageName}:${hanldeName}`;

  // name = "huaqi"
  // !name -> false
  // !!name -> true
  // !! 效果类似于 Boolean()
  // 非 boolean 类型 转boolean 值
  return !!permissionsList.find((item) => item === verifyPermission);
}

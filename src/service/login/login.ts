import hyRequest from "../index";
import { IDataType } from "@/service/types";
// 参数类型声明
import { IAccount, ILoginResult } from "./type";

// 登录请求函数封装

// 枚举类型集成路由（登录路由不止一个
enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法： /users + /id
  UserMenus = "/role/", // 用法： /role + /id + /menu
}
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  });
}

export function requestUserMenuByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false,
  });
}

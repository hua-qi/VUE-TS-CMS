import { ILoginState } from "./login/types";
import { ISystemState } from "./main/system/types";
import { IDashboardState } from "./main/analysis/types";

// 定义泛型接口
export interface IRootState {
  name: string;
  age: number;
  // 定义弹窗类型
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboardState;
}

// store 合并属性
export type IStoreType = IRootState & IRootWithModule;

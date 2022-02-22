// 登录表单填写
export interface IAccount {
  name: string;
  password: string;
}

// 登录数据响应
export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

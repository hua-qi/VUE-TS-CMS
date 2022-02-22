// 响应数据 (泛型默认 any)
export interface IDataType<T = any> {
  code: number;
  data: T;
}

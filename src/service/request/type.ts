import { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义拦截器接口 (通过定义接口的泛型(还有默认值 ) 进而 定义属性的类型)
export interface HYRequestInterceptors<T = AxiosResponse> {
  // 拦截器属性： 可选类型 && 函数类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
// 拦截接口继承
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 对 AxiosRequestConfig 属性进行拓展(添加拦截器相关属性)(可选类型)
  interceptors?: HYRequestInterceptors<T>;
  showLoading?: boolean;
}

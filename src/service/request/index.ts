import axios from "axios";
import type { AxiosInstance } from "axios";
import type { HYRequestInterceptors, HYRequestConfig } from "./type";
import { ElLoading } from "element-plus";
import { ILoadingInstance } from "element-plus/lib/components/loading/src/loading.type";
const DEFAULT_LOADING = true;

class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  showLoading: boolean;
  loading?: ILoadingInstance;
  constructor(config: HYRequestConfig) {
    // axios实例化 根据不同的配置，创建不同的 axios 实例。
    this.instance = axios.create(config);

    // 保存基本信息
    // 保存拦截器相关内容
    this.interceptors = config.interceptors;
    // 默认情况下 showLoading = true
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 使用拦截器
    // （自定义安装） 实例化时 提供的拦截器应用(请求发送,可选链形式引用)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    // （自定义安装） 实例化时 提供的拦截器应用(响应接收,可选链形式引用)
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // (全局)安装 所有实例共有的拦截器 (request)
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例皆有的拦截器：请求成功");
        // showLoading 判断
        if (this.showLoading) {
          // 添加loading
          this.loading = ElLoading.service({
            // 蒙板
            lock: true,
            text: "正在请求数据。。。",
            background: "rgba(0,0,0,0.2)",
          });
        }
        return config;
      },
      (err) => {
        // console.log("所有实例皆有的拦截器：请求失败");
        return err;
      }
    );
    // (全局)(response) 拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例皆有的拦截器：响应成功");
        // 去除loading
        this.loading?.close();
        // return res;
        // 返回非axios封装信息
        const data = res.data;
        if (data.returnCode === "-1001") {
          // 示例1：
          console.log("请求失败，错误信息。。。");
        } else {
          return data;
        }
      },
      (err) => {
        // console.log("所有实例皆有的拦截器：响应失败");
        this.loading?.close();
        // 示例2：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404错误");
        }
        return err;
      }
    );
  }
  /*
   request 方法
   HYRequestConfig<T> 保证 1. 2. res 和 responseInterceptor() 类型一致
   1. request<any, T>(config) 类型： T
   2. res = config.interceptors.responseInterceptor(res); responseInterceptor() 默认类型： AxiosResponse

   */
  // request<T> 此时泛型 由使用者决定何种类型
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((reslove, reject) => {
      // 1. 单请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        // 请求拦截转化
        config = config.interceptors.requestInterceptor(config);
      }
      // loading判断
      if (config.showLoading === false) {
        // 2. 此时设置 showloading 会影响之后的 showloading 判断
        this.showLoading = config.showLoading;
      }
      // 修改此时 request 类型
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单请求对 数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2. 重置 重新将 showLoading 设为默认值
          this.showLoading = DEFAULT_LOADING;
          // 3. reslove包裹res返回
          reslove(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }
  // get 方法
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  // post 方法
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  // delete 方法
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  // patch 方法
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default HYRequest;

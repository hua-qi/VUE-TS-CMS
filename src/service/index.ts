// service 统一出口文件
import HYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";
// 根据不同的配置创建不同的 axios封装类 的实例化
const hyRequest = new HYRequest({
  // 基本属性
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 每个实例可以自定义 独属于自身的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // console.log("请求成功拦截");
      return config;
    },
    requestInterceptorCatch: (err) => {
      // console.log("请求失败拦截");
      return err;
    },
    responseInterceptor: (res) => {
      // console.log("响应成功拦截");
      return res;
    },
    responseInterceptorCatch: (err) => {
      // console.log("响应失败拦截");
      return err;
    },
  },
});
/* const hyRequest01 = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
}); */
export default hyRequest;
// export { hyRequest, hyRequest01 };

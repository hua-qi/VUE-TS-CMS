import axios from "axios";

// axios 实例化对象
// 1. 请求方式一 (需要指定请求类型)
/* axios.request({
  method: "get",
});
 */
// 2. 方式二直接使用类型请求(返回值类型 Promise<AxiosResponse<any>>)
// 2.1. 模拟get请求
/* axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
  console.log(res.data);
}); */
// 2.2. 模拟get请求并携带参数
/* axios
  .get("http://httpbin.org/get", {
    params: {
      name: "huaqi",
      age: 20,
    },
  })
  .then((res) => {
    console.log(res.data);
  }); */
// 2.3. 模拟post请求
/* axios
  .post("http://httpbin.org/post", {
    data: {
      name: "huaqi",
      age: 20,
    },
  })
  .then((res) => {
    console.log(res.data);
  }); */

// 3. Promise类，实例化时本身可以有类型，通过泛型指定类型 <string>
/* new Promise<string>((resolve, reject) => {
  resolve("huaqi");
}).then((res) => {
  console.log(res.length);
}); */

// 4. axios 配置选项(全局配置)
// 4.1. 默认根路径
axios.defaults.baseURL = "http://httpbin.org";
// 4.2. 请求超时时间
axios.defaults.timeout = 10000;
axios
  .get("/get", {
    params: {
      name: "huaqi",
      age: 20,
    },
    // 单独配置
    timeout: 5000,
  })
  .then((res) => {
    console.log(res.data);
  });
axios
  .post("/post", {
    data: {
      name: "huaqi",
      age: 20,
    },
  })
  .then((res) => {
    console.log(res.data);
  });

// 5. axios.all -> 同时多个请求，一起返回
axios
  .all([
    axios.get("/get", { params: { name: "huaqi", age: 20 } }),
    axios.post("/post", { params: { name: "huaqi", age: 20 } }),
  ])
  .then((res) => {
    console.log(res);
  });

// 6. axios 拦截器
// fn1: 请求发送 / 数据响应 成功 执行的函数
// fn2: 请求发送 / 数据相应 失败 执行的函数
// 6.1. 拦截请求
axios.interceptors.request.use(
  (config) => {
    // 6.1.1. 对 config 包含的属性做相关操作
    // 请求 添加 token
    // 添加 isLoading 动画
    // 6.1.2. 返回操作完毕的 config
    return config;
  },
  (err) => {
    console.log("请求发送错误：", err);
  }
);
axios.interceptors.response.use(
  (res) => {
    // console.log("数据响应成功的拦截");
    return res;
  },
  (err) => {
    console.log("数据相应失败的拦截");
    return err;
  }
);

// 0.0. eslint 格式化报警时，可以在 其文件中rules配置信息
// const path = require("path");
module.exports = {
  // 1. 配置方式一： VUE-CLI 官方提供的属性
  outputDir: "./build",
  // publicPath: "./",
  // 配置devServer 解决跨域请求
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000", // 地址为：准备向后端服务器发送请求的主机+端口
        pathRewrite: {
          "^/api": "", // 重写路径 "/api" 为 "/"
        },
        changeOrigin: true, // 虚拟站点更换 origin, (必须为true)
      },
    },
  },
  // 2. 配置方式二： 使用webpack配置文件属性(对象格式)(属性完全一致)(最后自定义配置文件会 与 webpack内置配置文件 合并)
  configureWebpack: {
    resolve: {
      alias: {
        // 配置 components 组件路径别名 (@: 代表 src，已于webpack内置配置文件声明)
        components: "@/components",
      },
    },
  },
  // 3. 配置方式三：使用webpack配置文件属性(对象格式)(属性完全一致)(最后自定义配置文件会 将 webpack内置配置文件 覆盖)
  /* configureWebpack: (config) => {
    config.reslove.alias = {
      "@": path.resolve(__dirname, "src"),
      components: "@/components",
    };
  }, */
  // 4. 配置方式四： 链式配置
  /* chainWebpack: (config) => {
    config.reslove.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("components", "@/components");
  }, */
};

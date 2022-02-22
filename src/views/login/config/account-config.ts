// 面向el-form编写规则
export const accountRules = {
  name: [
    {
      required: true,
      message: "用户名未填写",
      trigger: "blur",
    },
    {
      pattern: /^[A-Za-z0-9]{5,10}$/,
      message: "用户名要求:长度5-10个字符,包含字母或数字",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码未填写",
      trigger: "blur",
    },
    {
      pattern: /^[A-Za-z0-9]{5,}$/,
      message: "密码要求:大于5个字符,包含字母或数字",
      trigger: "blur",
    },
  ],
};

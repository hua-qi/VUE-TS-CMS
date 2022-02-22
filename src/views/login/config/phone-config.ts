// 面向el-form编写规则
export const phoneRules = {
  phoneNumber: [
    {
      required: true,
      message: "手机号未填写",
      trigger: "blur",
    },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请填写正确的手机号",
      trigger: "blur",
    },
  ],
  identifyingCode: [
    {
      required: true,
      message: "验证码未填写",
      trigger: "blur",
    },
    {
      pattern: /^[0-9]{4,}$/,
      message: "请填写正确的验证码",
      trigger: "blur",
    },
  ],
};

export const contentTableConfig = {
  title: "用户列表",
  propsList: [
    { prop: "name", label: "用户名", minWidth: "100" },
    { prop: "realname", label: "真实姓名", minWidth: "100" },
    { prop: "cellphone", label: "手机号码", minWidth: "110" },
    { prop: "enable", label: "状态", minWidth: "100", slotName: "enable" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "250",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "250",
      slotName: "updateAt",
    },
    {
      prop: "handler",
      label: "操作",
      width: "120",
      slotName: "handler",
    },
  ],
  // 显示序列
  showIndexColumn: true,
  // 显示选中框
  showSelectColumn: true,
};

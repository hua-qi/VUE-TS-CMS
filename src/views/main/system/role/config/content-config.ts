export const contentTableConfig = {
  title: "权限列表",
  propsList: [
    { prop: "name", label: "角色名", minWidth: "100" },
    { prop: "intro", label: "权限介绍", minWidth: "100" },
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

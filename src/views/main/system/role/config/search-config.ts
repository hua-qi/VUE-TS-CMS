import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  labelWidth: "120px",
  formItems: [
    {
      field: "id",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名",
    },
    {
      // field 用于后续数据监听标识
      field: "name",
      type: "input",
      label: "权限名",
      placeholder: "请输入权限名称",
    },
    {
      field: "createTime",
      type: "datepicker",
      label: "创建时间",
      placeholder: "请选择时间范围",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
};

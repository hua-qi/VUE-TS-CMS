type IFormType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // 对于 select
  options?: any[];
  // 对于其他属性
  otherOptions?: any;
  // 输入框是否显示
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}

export interface IForm {
  rows: IFormColumn[];
}

export interface IFormColumn {
  inputs: IFormInput[];
}

export interface IFormInput {
  ID: string;
  inputType: IFormInputType;
  text: string;
  required: boolean;

  placeholder?: string;
  options?: Array<string | number | boolean>;
}

export type IFormInputType = 'input' | 'textarea' | 'checkbox' | 'select';

export interface IFormData {
  items: IFormDataItem<string | number | boolean>[];
}

export interface IFormDataItem<T> {
  ID: string;
  value: T;
}

export interface IConfig {
  host: string;
}

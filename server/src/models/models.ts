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
}

export type IFormInputType = 'int' | 'string' | 'boolean';


export interface IFormData {
  items: IFormDataItem<string | number | boolean>[];
}

export interface IFormDataItem<T> {
  ID: string;
  value: T;
}

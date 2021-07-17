import { IFormInput, IFormInputType } from '@models/models.interface';


export type ControlValueType = string | string[] | number | number[] | boolean;

export class Control {
  readonly ID: string;
  readonly required: boolean;
  readonly type: IFormInputType;

  readonly placeholder?: string;
  readonly label?: string;

  public value: ControlValueType | null = null;

  constructor(c: IFormInput) {
    this.ID = c.ID;
    this.required = c.required;
    this.type = c.inputType;
    this.placeholder = c.placeholder;
    this.label = c.text;
  }
}

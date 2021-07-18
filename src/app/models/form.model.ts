import { IForm, IFormColumn } from '@models/models.interface';
import { Control } from '@models/control.model';


export class FormColumn {
  inputs: Control[] = [];

  constructor(row: IFormColumn) {
    this.inputs = row.inputs.map(i => new Control(i));
  }
}

export class Form {
  rows: FormColumn[] = [];

  constructor(form: IForm) {
    this.rows = form.rows.map(r => new FormColumn(r));
  }
}

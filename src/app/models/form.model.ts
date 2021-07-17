import { IForm, IFormColumn, IFormData, IFormDataItem } from '@models/models.interface';
import { Control } from '@models/control.model';


class FormColumn {
  inputs: Control[] = [];

  constructor(row: IFormColumn) {
    this.inputs = row.inputs.map(i => new Control(i));
  }
}

export class Form {
  rows: FormColumn[] = [];
  controls: { [key: string]: Control } = {};

  constructor(form: IForm) {
    this.rows = form.rows.map(r => new FormColumn(r));
    this.createControls(this.rows);
  }

  public resetControls() {
    Object.keys(this.controls).forEach(key => {
      this.controls[key].value = null;
    });
  }

  public updateData(formData: IFormData) {
    this.resetControls();
    formData.items.forEach(item => {
      this.controls[item.ID].value = item.value;
    });
  }

  public getData(): IFormData {
    const items = <IFormDataItem<string | boolean | number>[]>Object
      .keys(this.controls)
      .filter(key => this.controls[key].value !== null)
      .map(key => ({ID: key, value: this.controls[key].value}));

    return {
      items
    };
  }

  private createControls = (rows: FormColumn[]) => {
    rows.forEach(c => {
      c.inputs.forEach(input => {
        const {ID} = input;
        this.controls[ID] = input;
      });
    });
  };
}

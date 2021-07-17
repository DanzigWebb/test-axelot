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
  controls: { [key: string]: null | string | number | boolean } = {};

  constructor(form: IForm) {
    this.rows = form.rows.map(r => new FormColumn(r));
    this.createControls(form);
  }

  public resetControls() {
    Object.keys(this.controls).forEach(key => {
      this.controls[key] = null;
    });
  }

  public updateData(formData: IFormData) {
    this.resetControls();
    formData.items.forEach(item => {
      this.controls[item.ID] = item.value;
    });
  }

  public getData(): IFormData {
    const items = <IFormDataItem<string | boolean | number>[]>Object
      .keys(this.controls)
      .filter(key => this.controls[key] !== null)
      .map(key => ({ID: key, value: this.controls[key]}));

    return {
      items
    };
  }

  private createControls = (form: IForm) => {
    form.rows.forEach(c => {
      c.inputs.forEach(input => {
        const {ID} = input;
        this.controls[ID] = null;
      });
    });
  };
}

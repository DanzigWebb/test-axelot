import { IForm, IFormColumn, IFormData } from '@models/models';

export class Form {
  rows: IFormColumn[] = [];
  controls: { [key: string]: null | string | number | boolean } = {};

  constructor(form: IForm) {
    this.rows = form.rows;
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

  private createControls = (form: IForm) => {
    form.rows.forEach(c => {
      c.inputs.forEach(input => {
        const {ID} = input;
        this.controls[ID] = null;
      });
    });
  };
}

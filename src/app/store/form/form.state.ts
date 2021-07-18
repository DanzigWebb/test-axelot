import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Form, FormColumn } from '@models/form.model';
import { Injectable } from '@angular/core';
import { FormActions } from '@src/app/store/form/form.actions';
import { ApiService } from '@services/api.service';
import { tap } from 'rxjs/operators';
import { Control } from '@models/control.model';
import { IFormData } from '@models/models.interface';

export interface FormStateModel {
  form: Form | null;
  controls: Record<string, Control>
}

export const FORM_STATE_TOKEN = new StateToken<FormStateModel>('form');

@State<FormStateModel>({
  name: FORM_STATE_TOKEN,
  defaults: {
    form: null,
    controls: {}
  }
})
@Injectable()
export class FormState {
  constructor(private api: ApiService) {
  }

  @Selector()
  static state(state: FormStateModel): FormStateModel {
    return state;
  }

  @Selector()
  static form(state: FormStateModel): Form | null {
    return state.form;
  }

  @Selector()
  static controls(state: FormStateModel): Record<string, Control> {
    return state.controls;
  }

  @Action(FormActions.Fetch)
  fetch(ctx: StateContext<FormStateModel>) {
    return this.api.getForm().pipe(
      tap((form) => {
        const controls = this.createControls(form.rows);
        ctx.setState({...ctx.getState(), form, controls});
      })
    );
  }

  @Action(FormActions.Update)
  update(ctx: StateContext<FormStateModel>) {
    return this.api.getData().pipe(
      tap((data) => {
        const controls = this.getUpdatedControls(ctx.getState().controls, data);
        ctx.setState({...ctx.getState(), controls});
      })
    );
  }

  private createControls(rows: FormColumn[]): Record<string, Control> {
    const output: Record<string, Control> = {};

    rows.forEach(c => {
      c.inputs.forEach(input => {
        const {ID} = input;
        output[ID] = input;
      });
    });

    return output;
  };

  private getDroppedControls(initialControls: Record<string, Control>): Record<string, Control> {
    const output: Record<string, Control> = {};

    Object.keys(initialControls).forEach(key => {
      output[key] = {...initialControls[key]};
    });

    return output;
  }

  private getUpdatedControls(initialControls: Record<string, Control>, data: IFormData): Record<string, Control> {
    const controls = this.getDroppedControls(initialControls);

    if (Object.keys(controls).length) {
      data.items.forEach((item) => {
        const id = item.ID;
        controls[id].value = item.value;
      });
    }

    return controls;
  }

}

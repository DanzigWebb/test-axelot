import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Form } from '@models/form.model';
import { Injectable } from '@angular/core';
import { FormActions } from '@src/app/store/form/form.actions';
import { ApiService } from '@services/api.service';
import { tap } from 'rxjs/operators';
import { Control } from '@models/control.model';
import { patch } from '@ngxs/store/operators';
import { IFormData } from '@models/models.interface';

export interface FormStateModel {
  form: Form | null;
}

export const FORM_STATE_TOKEN = new StateToken<FormStateModel>('form');

@State<FormStateModel>({
  name: FORM_STATE_TOKEN,
  defaults: {
    form: null
  }
})
@Injectable()
export class FormState {
  constructor(private api: ApiService) {
  }

  @Selector()
  static form(state: FormStateModel): Form | null {
    return state.form;
  }

  @Action(FormActions.Fetch)
  fetch(ctx: StateContext<FormStateModel>) {
    return this.api.getForm().pipe(
      tap((form) => {
        ctx.setState({...ctx.getState(), form: form});
      })
    );
  }

  @Action(FormActions.Update)
  update(ctx: StateContext<FormStateModel>) {
    return this.api.getData().pipe(
      tap((data) => {
        const controls = this.updateControls(ctx.getState().form!.controls, data);

        ctx.setState(
          // @ts-ignore
          patch({
            form: patch({
              controls
            })
          })
        );
      })
    );
  }

  resetControls(initialControls: Record<string, Control>): Record<string, Control> {
    const output: Record<string, Control> = {};

    Object.keys(initialControls).forEach(key => {
      output[key] = {...initialControls[key]};
    });

    return output;
  }

  updateControls(initialControls: Record<string, Control>, data: IFormData): Record<string, Control> {
    const controls = this.resetControls(initialControls);
    data.items.forEach((item) => {
      const id = item.ID;
      controls[id].value = item.value;
    });

    return controls;
  }

}

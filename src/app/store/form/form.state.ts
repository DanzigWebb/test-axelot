import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Form } from '@models/form.model';
import { Injectable } from '@angular/core';
import { FormActions } from '@src/app/store/form/form.actions';
import { FormStateModule } from '@src/app/store/form/form.state.module';

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
  @Selector()
  static form(state: FormStateModel): Form | null {
    return state.form;
  }

  @Action(FormActions.Fetch)
  fetchForm(ctx: StateContext<FormStateModel>, action: FormActions.Fetch) {
    ctx.setState({...ctx.getState(), form: action.form});
  }

}

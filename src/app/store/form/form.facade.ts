import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormState, FormStateModel } from '@src/app/store/form/form.state';
import { Observable } from 'rxjs';
import { Form } from '@models/form.model';
import { FormActions } from '@src/app/store/form/form.actions';
import { Control } from '@models/control.model';

@Injectable()
export class FormFacade {

  @Select(FormState.state) state$!: Observable<FormStateModel>;
  @Select(FormState.form) form$!: Observable<Form | null>;
  @Select(FormState.controls) controls$!: Observable<Record<string, Control>>;

  constructor(
    private store: Store
  ) {
  }

  fetch() {
    return this.store.dispatch(new FormActions.Fetch());
  }

  update() {
    return this.store.dispatch(new FormActions.Update());
  }
}


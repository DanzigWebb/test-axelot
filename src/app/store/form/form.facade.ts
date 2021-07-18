import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormState } from '@src/app/store/form/form.state';
import { Observable } from 'rxjs';
import { Form } from '@models/form.model';
import { FormActions } from '@src/app/store/form/form.actions';

@Injectable()
export class FormFacade {

  @Select(FormState.form) form$!: Observable<Form | null>;

  constructor(
    private store: Store
  ) {
  }

  fetch() {
    return this.store.dispatch(new FormActions.Fetch());
  }
}


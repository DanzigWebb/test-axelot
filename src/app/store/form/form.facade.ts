import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { FormState } from '@src/app/store/form/form.state';
import { Observable } from 'rxjs';
import { Form } from '@models/form.model';

@Injectable()
export class FormFacade {
  @Select(FormState.form) form$!: Observable<Form | null>;

  constructor() {
  }
}


import { Form } from '@models/form.model';

export namespace FormActions {
  export class Fetch {
    static readonly type = '[Form] fetch';
    constructor(public form: Form) {
    }
  }

  export class Update {
    static readonly type = '[Form] update';
  }

  export class Reset {
    static readonly type = '[Form] reset';
  }
}



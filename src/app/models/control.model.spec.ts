import { Control } from '@models/control.model';
import { IFormInput } from '@models/models.interface';

const fakeFormControl: IFormInput = {
  inputType: 'string',
  required: false,
  text: 'text',
  ID: '1'
}

describe('Form', () => {
  it('should create an instance', () => {
    expect(new Control(fakeFormControl)).toBeTruthy();
  });
});

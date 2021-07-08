import { Form } from './form';
import { IForm, IFormData } from '@models/models';

const fakeForm: IForm = {
  columns: [{
    inputs: [{
      ID: '1',
      text: 'text',
      required: false,
      placeholder: 'placeholder',
      inputType: 'boolean'
    }]
  }]
};

const fakeData: IFormData = {
  items: [{
    ID: '1',
    value: 'value'
  }]
};

describe('Form', () => {
  it('should create an instance', () => {
    expect(new Form(fakeForm)).toBeTruthy();
  });

  it('should create controls', () => {
    const form = new Form(fakeForm);
    expect(form.controls['1']).toBeNull();
    expect(Object.keys(form.controls).length).toBe(1);
  });

  it('should update data', () => {
    const form = new Form(fakeForm);
    form.updateData(fakeData);
    expect(form.controls['1']).toBe('value')
  })

  it('should reset controls', () => {
    const form = new Form(fakeForm);
    form.updateData(fakeData);
    form.resetControls();
    expect(form.controls['1']).toBeNull();
  })
});

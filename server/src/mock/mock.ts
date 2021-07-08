import { IForm, IFormData } from '../models/models';

export const INITIAL_FORM: IForm = {
  rows: [
    {
      inputs: [
        {
          ID: '1',
          inputType: 'string',
          text: 'Имя',
          placeholder: 'Например, Иван',
          required: true
        },
        {
          ID: '2',
          inputType: 'string',
          text: 'Фамилия',
          placeholder: 'Иванов',
          required: true
        },
        {
          ID: '2',
          inputType: 'int',
          text: 'Номер телефона',
          placeholder: '89005556565',
          required: true
        }
      ]
    },
    {
      inputs: [
        {
          ID: '3',
          inputType: 'string',
          text: 'Город',
          placeholder: 'Москва',
          required: true
        },
        {
          ID: '4',
          inputType: 'string',
          text: 'Улица',
          placeholder: 'Калинина',
          required: true
        },
        {
          ID: '4',
          inputType: 'int',
          text: 'Дом',
          placeholder: '13',
          required: true
        }
      ]
    },
    {
      inputs: [
        {
          ID: '5',
          inputType: 'string',
          text: 'Дополнительная информация',
          placeholder: 'Домофон *55...',
          required: false
        }
      ]
    },
    {
      inputs: [
        {
          ID: '6',
          inputType: 'boolean',
          text: 'Согласине на обработку персональных данных',
          required: true
        }
      ]
    }
  ]
};

export const FORM_DATA: IFormData = {
  items: [
    {
      ID: '1',
      value: 'Андрей'
    },
    {
      ID: '2',
      value: '89009993434'
    },
    {
      ID: '3',
      value: 'Москва'
    },
    {
      ID: '6',
      value: true
    }
  ]
};

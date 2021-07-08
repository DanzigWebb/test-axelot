import { IForm, IFormData } from '../models/models';

export const INITIAL_FORM: IForm = {
  rows: [
    {
      inputs: [
        {
          ID: 'row1_1',
          inputType: 'string',
          text: 'Имя',
          placeholder: 'Например, Иван',
          required: true
        },
        {
          ID: 'row1_2',
          inputType: 'string',
          text: 'Фамилия',
          placeholder: 'Иванов',
          required: true
        },
        {
          ID: 'row1_3',
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
          ID: 'row2_1',
          inputType: 'string',
          text: 'Город',
          placeholder: 'Москва',
          required: true
        },
        {
          ID: 'row2_2',
          inputType: 'string',
          text: 'Улица',
          placeholder: 'Калинина',
          required: true
        },
        {
          ID: 'row2_3',
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
          ID: 'row3_1',
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
          ID: 'row4_1',
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
      ID: 'row1_1',
      value: 'Андрей'
    },
    {
      ID: 'row1_2',
      value: 'Иванов'
    },
    {
      ID: 'row1_3',
      value: 89500343412
    },
    {
      ID: 'row2_1',
      value: 'Москва'
    },
    {
      ID: 'row4_1',
      value: true
    }
  ]
};

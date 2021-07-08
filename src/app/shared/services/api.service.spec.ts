import { TestBed } from '@angular/core/testing';

import { ApiService } from '@services/api.service';
import { IConfig, IForm } from '@models/models';
import { CONFIG_TOKEN } from '@shared/config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const fakeConfig: IConfig = {
  host: 'backend host'
};

const getFormMock: IForm = {
  rows: [{
    inputs: [{
      ID: '1',
      inputType: 'string',
      text: 'Ваше имя',
      placeholder: 'Например, Иван',
      required: true
    }]
  }]
};

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: CONFIG_TOKEN,
        useValue: fakeConfig
      }],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get backend host from config', () => {
    expect(service.url).toBe(fakeConfig.host);
  });

  it('should contains valid request url in getForm method', () => {
    service.getForm().subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.url}/getForm`);
    req.flush(getFormMock);
  });

  it('should contains valid request url in getData method', () => {
    service.getData().subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.url}/getData`);
    req.flush(true);
  });
});

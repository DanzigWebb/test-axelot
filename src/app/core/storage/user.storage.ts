import { Injectable } from '@angular/core';
import { AbstractStorage } from '@core/storage';

export enum UserStorageEnum {
  name = 'name',
  token = 'token',
}

@Injectable()
export class UserStorage extends AbstractStorage {
  key = 'user';
}

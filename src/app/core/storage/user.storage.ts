import { Injectable } from '@angular/core';
import { AbstractStorage } from '@core/storage/abstract.storage';

export enum UserStorageEnum {
  name = 'name',
  token = 'token',
}

@Injectable({
  providedIn: 'root'
})
export class UserStorage extends AbstractStorage {
  key = 'user';
}

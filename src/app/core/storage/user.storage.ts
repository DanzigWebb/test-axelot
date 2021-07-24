import { Inject, Injectable } from '@angular/core';
import { AbstractStorage } from '@core/storage/abstract.storage';
import { DOCUMENT } from '@angular/common';

export enum UserStorageEnum {
  name = 'name',
  token = 'token',
}

@Injectable({
  providedIn: 'root'
})
export class UserStorage extends AbstractStorage {
  key = 'user';

  constructor(@Inject(DOCUMENT) public doc: Document) {
    super(doc);
    super.init();
  }
}

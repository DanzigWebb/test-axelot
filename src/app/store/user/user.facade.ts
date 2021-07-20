import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserStorage, UserStorageEnum } from '@core/storage';
import { IUserLoginData, IUserLoginResponse } from '@models/user.interface';
import { UserActions } from '@store/user/user.actions';
import { UserState, UserStateModel } from '@store/user/user.state';

@Injectable()
export class UserFacade {
  @Select(UserState.state) state$!: Observable<UserStateModel>;

  constructor(
    private store: Store,
    private storage: UserStorage
  ) {
  }

  login(data: IUserLoginData) {
    return this.store.dispatch(new UserActions.Login(data)).pipe(
      tap((data: IUserLoginResponse) => {
        this.storage.setItem(UserStorageEnum.name, data.name);
        this.storage.setItem(UserStorageEnum.token, data.token);
      })
    );
  }

  logout() {
    return this.store.dispatch(new UserActions.Logout()).pipe(
      tap(() => {
        this.storage.clear();
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { IUserLoginData } from '@models/user.interface';
import { UserActions } from '@store/user/user.actions';
import { UserState, UserStateModel } from '@store/user/user.state';

@Injectable()
export class UserFacade {
  @Select(UserState.state) state$!: Observable<UserStateModel>;
  @Select(UserState.isLogin) isLogin$!: Observable<boolean>;

  constructor(
    private store: Store
  ) {
  }

  login(data: IUserLoginData) {
    return this.store.dispatch(new UserActions.Login(data));
  }

  logout() {
    return this.store.dispatch(new UserActions.Logout());
  }

  updateByStorage() {
    return this.store.dispatch(new UserActions.UpdateByStorage());
  }
}

import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserActions } from '@store/user/user.actions';
import { UserService } from '@services/user.service';
import { tap } from 'rxjs/operators';
import { UserStorage, UserStorageEnum } from '@core/storage';

export interface UserStateModel {
  isLogin: boolean;
  name?: string;
  token?: string;
}

export const USER_STATE_TOKEN = new StateToken<UserStateModel>('user');

@State<UserStateModel>({
  name: USER_STATE_TOKEN,
  defaults: {
    isLogin: false
  }
})
@Injectable()
export class UserState {

  constructor(
    private user: UserService,
    private storage: UserStorage
  ) {
  }

  @Selector()
  static state(state: UserStateModel): UserStateModel {
    return state;
  }

  @Action(UserActions.Login)
  login(ctx: StateContext<UserStateModel>, action: UserActions.Login) {
    return this.user.login(action.data).pipe(
      tap((data) => {
        const {name, token} = data;
        const isLogin = true;

        this.storage.setItem(UserStorageEnum.name, data.name);
        this.storage.setItem(UserStorageEnum.token, data.token);

        ctx.setState({...ctx.getState(), name, token, isLogin});
      })
    );
  }

  @Action(UserActions.Logout)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.setState({isLogin: false});
    this.storage.clear();
  }

  @Action(UserActions.UpdateByStorage)
  updateByStorage(ctx: StateContext<UserStateModel>) {
    const name = this.storage.getItem<string>(UserStorageEnum.name);
    const token = this.storage.getItem<string>(UserStorageEnum.token);

    if (name && token) {
      ctx.setState({
        name, token, isLogin: true
      });
    }
  }
}

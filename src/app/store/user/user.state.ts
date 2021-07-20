import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserActions } from '@store/user/user.actions';
import { UserService } from '@services/user.service';
import { tap } from 'rxjs/operators';

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
    private user: UserService
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

        ctx.setState({...ctx.getState(), name, token, isLogin});
      })
    );
  }

  @Action(UserActions.Logout)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.setState({
      isLogin: false
    });
  }
}

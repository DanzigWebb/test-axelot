import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { UserFacade } from '@store/user/user.facade';
import { UserState } from '@store/user/user.state';


@NgModule({
  providers: [UserFacade],
  imports: [
    NgxsModule.forRoot([UserState])
  ]
})
export class UserStateModule {
}

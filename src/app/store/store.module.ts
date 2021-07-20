import { NgModule } from '@angular/core';
import { FormFacade } from '@store/form/form.facade';
import { NgxsModule } from '@ngxs/store';
import { FormState } from '@store/form/form.state';
import { environment } from '@src/environments/environment';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { UserState } from '@store/user/user.state';
import { UserFacade } from '@store/user/user.facade';

@NgModule({
  providers: [FormFacade, UserFacade],
  imports: [
    NgxsModule.forRoot([FormState, UserState], {developmentMode: !environment.production}),
    NgxsFormPluginModule.forRoot()
  ]
})
export class AppStoreModule {
}

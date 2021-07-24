import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Config
import { CONFIG_DATA, CONFIG_TOKEN } from '@core/config';

import { FormPageModule } from '@pages/form-page/form-page.module';
import { HeaderModule } from '@components/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogsModule } from '@components/dialogs/dialogs.module';

import { AppStoreModule } from '@store/store.module';
import { LoginPageModule } from '@pages/login-page/login-page.module';
import { UserFacade } from '@store/user/user.facade';
import { UserStorage } from '@core/storage';

function initializeApp(userFacade: UserFacade) {
  return () => userFacade.updateByStorage();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Pages
    FormPageModule,
    LoginPageModule,

    HeaderModule,
    // Components
    DialogsModule,
    // Store
    AppStoreModule
  ],
  providers: [
    {
      provide: CONFIG_TOKEN,
      useValue: CONFIG_DATA
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserFacade],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

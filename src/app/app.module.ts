import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Config
import { CONFIG_TOKEN, CONFIG_DATA } from '@shared/config';
import { FormPageModule } from '@pages/form-page/form-page.module';
import { HeaderModule } from '@components/header/header.module';
import { HttpClientModule } from '@angular/common/http';

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
    HeaderModule
  ],
  providers: [
    {
      provide: CONFIG_TOKEN,
      useValue: CONFIG_DATA
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EdcaUrlSerializer, EndecapodService } from '@ibfd/endecapod';
import { CoreModule } from './core/core.module';
import { UrlSerializer } from '@angular/router';
import { TrpUrlSerializer } from './core/utils/trp-url-serializer';
import { FilterExposeService } from './demo/Components/demo/demo.component';
import { AppConfigService } from './core/services/app-config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';


const appConfigFactory = (appConfigService: AppConfigService) => {
  return () => appConfigService.loadAppConfig();
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    NgxSpinnerModule

  ],
  providers: [
    { provide: UrlSerializer, useClass: TrpUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigFactory,
      multi: true,
      deps: [AppConfigService]
    },
    EdcaUrlSerializer],
  bootstrap: [AppComponent]
})
export class AppModule { }

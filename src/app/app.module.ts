import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Api} from './api';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {SharedModule} from './shared/shared.module';
import {TokenInjectorInterceptor} from './security/interceptor/token-injector.interceptor';
import {InvalidSecurityContextInterceptor} from './security/interceptor/invalid-security-context.interceptor';
import {SecurityModule} from './security/security.module';
import {BooksModule} from './books/books.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BooksModule,
    SharedModule,
    SecurityModule
  ],
  providers: [
    Api,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInjectorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidSecurityContextInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('pl');
  }

}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

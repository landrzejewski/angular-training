import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LoginFormComponent} from './componnet/component/login-form/login-form.component';
import {FormsModule} from '@angular/forms';
import {SecurityService} from './service/security.service';
import {CryptoService} from '../shared/service/crypto.service';
import {SecurityRoutingModule} from './security-routing.module';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  exports: [
    LoginFormComponent
  ],
  providers: [
    SecurityService,
    CryptoService
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule {
}

import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SecurityService} from './security/service/security.service';
import {AuthenticationModel} from './security/model/authentication.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authentication = new AuthenticationModel();

  constructor(private translateService: TranslateService, private securityService: SecurityService) {
    this.securityService.authenticationChanges.subscribe((authentication) => this.authentication = authentication);
  }

  setLanguage(value: string) {
    this.translateService.use(value);
  }

  logout() {
    this.securityService.logout();
  }

}

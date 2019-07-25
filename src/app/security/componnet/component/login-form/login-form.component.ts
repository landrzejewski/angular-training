import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../../../service/security.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  credentials = {
    username: '',
    password: ''
  };
  loginError = false;
  router: Router;

  constructor(private securityService: SecurityService, router: Router) {
    this.router = router;
  }

  login() {
    this.securityService.login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => this.router.navigateByUrl('/'),
        (error) => this.loginError = true
      );
  }
}

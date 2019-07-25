import {Injectable} from '@angular/core';
import {SecurityService} from '../service/security.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.securityService.getToken() && this.securityService.hasRole('user')) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

}

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class InvalidSecurityContextInterceptor implements HttpInterceptor{
z
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      () => {},
      (error) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigateByUrl('login');
        }
      }));
  }

}

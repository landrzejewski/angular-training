import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SecurityService} from '../service/security.service';

@Injectable()
export class TokenInjectorInterceptor implements HttpInterceptor {

  private securityService: SecurityService;

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.securityService) {
      this.securityService = this.injector.get(SecurityService);
    }
    const token = this.securityService.getToken();
    if (token) {
      const decoratedRequest = request.clone({
        headers: request.headers.set('Authorization', `bearer ${token}`)
      });
      next.handle(decoratedRequest);
    }
    return next.handle(request);
  }

}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.value) {
      console.log('Interceptor, ', currentUser);
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${currentUser.value}`
        }
      });
    }

    return next.handle(request);
  }
}

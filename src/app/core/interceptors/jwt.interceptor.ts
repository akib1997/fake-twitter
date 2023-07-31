import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { NavigateService } from '@services/navigate/navigate.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private navigateService: NavigateService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (this.authService.isAuthenticated()) {
      const accessToken = this.authService.getToken();
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      this.navigateService.toLogin();
      throwError(() => 'Not authenticated');
    }

    const modifiedRequest = request.clone({headers});

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.navigateService.toLogin();
        }
        return throwError(() => error);
      })
    );
  }
}

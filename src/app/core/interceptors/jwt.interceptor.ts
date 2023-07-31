import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { NavigateService } from '@services/navigate/navigate.service';
import { ErrorHandlerService } from '@app/services/errors/error-handler.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private navigateService: NavigateService,
    private errorHandler: ErrorHandlerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();
    // debugger;
    if (this.authService.isAuthenticated()) {
      request.clone({
        setHeaders: { 'X-Jwt-Token': `Bearer ${authToken}` },
      })
    } else {
      this.navigateService.toLogin();
      throwError(() => 'Not authenticated');
    }

    // console.log(request.headers, 'hea')
    request = request.clone({
      setHeaders: { 'X-Jwt-Token': `Bearer ${authToken}` },
    });
    // console.log(request.headers, 'hea')

    return next.handle(request).pipe(
      map((response) => {
        let isError = (response as any)?.body?.error;
        console.log(response, 'response')
        if(isError) {
          this.authService.removeToken();
          this.navigateService.toLogin();
          return null as any
        }
        // console.log(isError, 'isError')
        // console.log(response, 'response')
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.navigateService.toLogin();
        }
        return throwError(() => error);
      })
    );
  }
}

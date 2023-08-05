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
    if (this.isExcludedUrl(request.url)) {
      return next.handle(request);
    }

    const authToken = this.authService.getToken();

    // if (this.authService.isAuthenticated()) {
    //   request.clone({
    //     setHeaders: { 'X-Jwt-Token': `Bearer ${authToken}` },
    //   });
    // } else {
    //   this.navigateService.toLogin();
    //   throwError(() => 'Not authenticated');
    // }

    request = request.clone({
      setHeaders: { 'X-Jwt-Token': `Bearer ${authToken}` },
    });

    return next.handle(request).pipe(
      map((response) => {
        let isError = (response as any)?.body?.error;
        console.log(response, 'response');
        if (isError) {
          console.warn(isError)
          this.authService.logout();
          this.navigateService.toLogin();
          return null as any;
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.navigateService.toLogin();
        }
        return throwError(() => error);
      })
    );
  }

  private isExcludedUrl(url: string): boolean {
    const excludedUrls: string[] = [
      'https://missingdata.pythonanywhere.com/signup',
      'https://missingdata.pythonanywhere.com/login',
    ];

    return excludedUrls.some((excludedUrl) => url.includes(excludedUrl));
  }
}

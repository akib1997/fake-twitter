import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '@app/models/login.model';
import {
  AuthResponse,
  ISignUpErrorResponse,
  ISignUpSuccessResponse,
} from '@app/models/response.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LocalStorageService } from '@services/local-store/local-storage.service';
import { ISignUp } from '@app/models/sign-up.model';
import { apiConfig } from '@config/api.config';
import { NavigateService } from '../navigate/navigate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private navigateService: NavigateService,
  ) {}

  isAuthenticated(): boolean {
    const token = this.storageService.getLocalItem('token');
    return !!token;
  }

  logout(): void {
    this.storageService.removeLocalItem('token');
    this.storageService.removeLocalItem('user');
    this.navigateService.toLogin();
  }

  login(payload: ILogin): Observable<boolean> {
    const endpoint = 'login';
    const apiUrl = apiConfig(endpoint);

    return this.http.post<AuthResponse>(apiUrl, payload).pipe(
      map((response: AuthResponse) => {
        if (response.token) {
          this.storageService.setLocalItem('token', response?.token);
          this.storageService.setLocalItem('user', payload.email);
          return of(true);
        } else {
          return of(false);
        }
      }),
      catchError((error) => {
        return of(false, error?.error);
      })
    );
  }

  signUp(
    payload: ISignUp
  ): Observable<any> {
    const endpoint = 'signup';
    const apiUrl = apiConfig(endpoint);

    return this.http
      .post(apiUrl, payload)
      .pipe(
        catchError((err) => this.handleError(err))
      );
  }

  removeToken(): void {
    this.storageService.removeLocalItem('token');
  }

  getToken(): string {
    const token = this.storageService.getLocalItem('token');
    return token;
  }

  private handleError(error: HttpErrorResponse) {
    // Custom error handling logic based on the error response
    console.log(error, 'Error')
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error?.error?.error}`;
    }
    // You can also send the error to a logging service
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}

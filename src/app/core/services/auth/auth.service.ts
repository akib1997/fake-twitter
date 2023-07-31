import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '@app/models/login.model';
import { AuthResponse } from '@app/models/response.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '@services/local-store/local-storage.service';
import { ISignUp } from '@app/models/sign-up.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl = `${environment.apiUrl}/${environment.version}`;
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  isAuthenticated(): boolean {
    const token = this.storageService.getLocalItem('token');
    return !!token;
  }


  logout(): void {}

  login(payload: ILogin): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload).pipe(
      map((response: AuthResponse) => {
        if (response.token) {
          this.storageService.setLocalItem('token', response?.token);
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

  signUp(payload: ISignUp): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-up`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error occurred (e.g., network issue, CORS error)
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error occurred
          console.error('Server-side error:', error.error);
        }

        // Return an observable with a custom error message or throw a new error
        return throwError(
          () => 'Something went wrong. Please try again later.'
        );
      })
    );
  }

  removeToken(): void {
    this.storageService.removeLocalItem('token');
  }

  getToken(): string {
    const token = this.storageService.getLocalItem('token');
    return token;
  }
}

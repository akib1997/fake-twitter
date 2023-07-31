import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '@app/models/login.model';
import { AuthResponse } from '@app/models/response.model';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '@services/local-store/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl = `${environment.apiUrl}/${environment.version}/login`;
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  isAuthenticated(): boolean {
    const token = this.storageService.getLocalItem('token');
    return !!token;
  }

  refreshingToken(): any {}

  logout(): void {}

  login(payload: ILogin): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, payload).pipe(
      map((response) => {
        if (response.token) {
          this.storageService.setLocalItem('token', response?.token);
        } else {
          // Handle unsuccessful login here if needed
          console.error('Login error:', response.message);
        }
        const successResponse: AuthResponse = {
          success: true,
          message: 'Success.',
        };
        return successResponse
      }),
      catchError((error) => {
        const errorResponse: AuthResponse = {
          success: false,
          message: 'An error occurred during login.',
        };
        return of(errorResponse, error); // Wrap the error in an observable and return
      })
    );
  }

  getToken(): string {
    return '';
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}
  handleError(error: HttpErrorResponse) {
    if (error.status === 200 && error.error && error.error.error) {
      // If the response status is 200 and it contains an 'error' field in the body, throw an error
      return throwError(() => error.error.error);
    } else {
      // For other errors, you can log the error or handle them based on your application's requirements
      console.error('HTTP Error:', error);
      // Return an observable with a custom error message
      return throwError(
        () => 'An unexpected error occurred. Please try again later.'
      );
    }
  }
}

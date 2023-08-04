import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(
    message: string,
    action: string = 'Close',
    config?: MatSnackBarConfig
  ): void {
    const defaultConfig: MatSnackBarConfig = {
      ...config,
      duration: 2000,
    };

    this.showSnackbar(message, 'success-snackbar', action, defaultConfig);
  }

  showError(
    message: string,
    action: string = 'Close',
    config?: MatSnackBarConfig
  ): void {
    const defaultConfig: MatSnackBarConfig = {
      ...config,
      duration: 2000,
    };
    this.showSnackbar(message, 'error-snackbar', action, defaultConfig);
  }

  showSnackbar(
    message: string,
    panelClass: string,
    action: string,
    config?: MatSnackBarConfig
  ): void {
    const defaultConfig: MatSnackBarConfig = {
      duration: 3000, // 3 seconds (adjust as per your requirement)
      panelClass: [panelClass],
    };

    this.snackBar.open(message, action, config || defaultConfig);
  }
}

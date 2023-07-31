import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { markAllControlsAsDirty } from '@utilities/markAllControlsAsDirty';
import { ILogin } from '@models/login.model';
import { AuthService } from '@services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigateService } from '@app/services/navigate/navigate.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<TLoginForm>;
  hide = true;
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigateService: NavigateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group<TLoginForm>({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(80),
      ]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      markAllControlsAsDirty([this.loginForm]);
      return;
    }
    const payload = this.loginForm.value as ILogin;
    this.authService.login(payload).subscribe((loggedIn: boolean) => {
      console.log(loggedIn, 'loggedIn');
      // debugger
      if (loggedIn && !(loggedIn as any).error) {
        this.snackBar.open('Login successful!', 'Dismiss', {
          duration: 2000,
          panelClass: ['success-toast'],
        });
        this.navigateService.toApp();
      } else {
        this.loginError = (loggedIn as any)?.error;
        console.log('Login failed.');
      }
    });
  }
}

type TLoginForm = {
  [property in keyof ILogin]: FormControl<property | null>;
};

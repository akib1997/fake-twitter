import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigateService } from '@app/services/navigate/navigate.service';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { ILogin } from '@models/login.model';
import { AuthService } from '@services/auth/auth.service';
import { markAllControlsAsDirty } from '@utilities/markAllControlsAsDirty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<TLoginForm>;
  hide = true;
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigateService: NavigateService,
    private snackbarService: SnackbarService,
    private spinnerService: SpinnerService
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
    this.spinnerService.show();
    this.authService
      .login(payload)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn && !(loggedIn as any).error) {
          this.snackbarService.showSuccess('Login successful!');
          this.navigateService.toApp();
        } else {
          this.loginError = (loggedIn as any)?.error;
          this.snackbarService.showError(this.loginError);
          console.log('Login failed.', this.loginError);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      });
  }
}

type TLoginForm = {
  [property in keyof ILogin]: FormControl<property | null>;
};

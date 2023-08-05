import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { NavigateService } from '@app/services/navigate/navigate.service';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { markAllControlsAsDirty } from '@app/utilities/markAllControlsAsDirty';
import { passwordValidator } from '@app/validators/password.validator';
import { usernameValidator } from '@validators/username.validator';

import { ISignUp } from 'src/app/core/models/sign-up.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup<TSignUpForm>;
  hide = true;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigateService: NavigateService,
    private snackbarService: SnackbarService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group<TSignUpForm>({
      username: this.fb.control(null, [
        Validators.required,
        usernameValidator()
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        passwordValidator()
      ]),
    });
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      markAllControlsAsDirty([this.signUpForm]);
      return;
    }

    const payload = this.signUpForm.value as ISignUp;
    // console.log(payload, 'payload')
    this.isSubmitting = true;
    this.spinnerService.show();
    this.authService
      .signUp(payload)
      .subscribe({
        next: (res: any) => {
          console.log(res, 'res');
          this.snackbarService.showSuccess('Signup successful ' + res?.message);
          this.signUpForm.reset();
          this.navigateService.toLogin();
        },
        error: (err) => {
          console.log(err, 'res');
          this.snackbarService.showError('Signup failed: ' + err);
        },
      })
      .add(() => {
        this.isSubmitting = false;
        this.spinnerService.hide();
      });
  }
}

type TSignUpForm = {
  [property in keyof ISignUp]: FormControl<property | null>;
};

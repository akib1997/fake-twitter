import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { NavigateService } from '@app/services/navigate/navigate.service';
import { markAllControlsAsDirty } from '@app/utilities/markAllControlsAsDirty';

import { ISignUp } from 'src/app/core/models/sign-up.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup<TSignUpForm>;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigateService: NavigateService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group<TSignUpForm>({
      username: this.fb.control(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
      ]),
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      markAllControlsAsDirty([this.signUpForm]);
      return;
    }

    const payload = this.signUpForm.value as ISignUp;
    this.authService.signUp(payload).subscribe((res) => {
      if (res) {
        this.signUpForm.reset();
        this.navigateService.toLogin();
      }
    });
  }
}

type TSignUpForm = {
  [property in keyof ISignUp]: FormControl<property | null>;
};

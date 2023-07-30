import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ILogin } from 'src/app/core/models/login.model';
import { ISignUp } from 'src/app/core/models/sign-up.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loginForm: FormGroup<TSignUpForm>;
  hide = true;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group<TSignUpForm>({
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
    if (this.loginForm.valid) {
    }
  }

}

type TSignUpForm = {
  [property in keyof ISignUp]: FormControl<property | null>;
};

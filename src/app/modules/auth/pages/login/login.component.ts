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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<TLoginForm>;
  hide = true;
  constructor(private fb: FormBuilder, private authService: AuthService,
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
      return
    }
    const payload = this.loginForm.value as ILogin;
    this.authService.login(payload).subscribe({
      next: (success) => {
        console.info(success, 'success')
        this.snackBar.open('Login successful!', 'Dismiss', {
          duration: 3000, // Time in milliseconds the toast should stay visible
          panelClass: ['success-toast'], // Add custom CSS class to style the toast
        });
      },
      error: (error) => {
        console.error('Login error:', error.message);
      }
    })
  }
}

type TLoginForm = {
  [property in keyof ILogin]: FormControl<property | null>;
};

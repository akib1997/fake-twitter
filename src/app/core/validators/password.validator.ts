import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;

    // Check the length of the password
    if (password?.length < 6 || password?.length > 12) {
      return { invalidLength: true };
    }

    // Check if the password contains at least 1 uppercase letter
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      return { noUppercase: true };
    }

    // Check if the password contains at least 1 number
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
      return { noNumber: true };
    }

    // Check if the password contains at least 1 special character
    const specialCharRegex = /[!@#*+\-_?]/;
    if (!specialCharRegex.test(password)) {
      return { noSpecialChar: true };
    }

    // If all validations pass, return null (no error)
    return null;
  };
}

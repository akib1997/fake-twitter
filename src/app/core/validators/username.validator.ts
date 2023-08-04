import { AbstractControl, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const username = control.value;
    const forbiddenWords = ['Twitter', 'Admin'];

    // Check if the username contains forbidden words
    for (const word of forbiddenWords) {
      if (username?.includes(word)) {
        return { forbiddenWord: { value: username } };
      }
    }

    // Check the length of the username
    if (username?.length > 15 || username?.length < 4) {
      return { invalidLength: { value: username } };
    }

    // Check if the username contains any symbols, dashes, or spaces
    const regex = /^[A-Za-z0-9_]+$/;
    if (!regex.test(username)) {
      return { invalidCharacters: { value: username } };
    }

    // If all validations pass, return null (no error)
    return null;
  };
}

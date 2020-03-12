import { ValidatorFn, FormControl } from '@angular/forms';

/**
 * This class for trimming form controls (this is the main difference from 
 * Angular Validators)
 */
export class CustomValidators {
  public static required(control: FormControl) {
    if (
      !control.value ||
      (typeof control.value === 'string' && !control.value.trim())
    ) {
      return {
        required: true
      };
    }

    return null;
  }

  public static minLength(length: number): ValidatorFn {
    return (control: FormControl) => {
      if (
        !control.value ||
        (typeof control.value === 'string' &&
          control.value.trim().length < length)
      ) {
        return {
          minlength: true
        };
      }

      return null;
    };
  }

  public static maxLength(length: number): ValidatorFn {
    return (control: FormControl) => {
      if (
        control.value &&
        typeof control.value === 'string' &&
        control.value.trim().length > length
      ) {
        return {
          maxlength: true
        };
      }

      return null;
    };
  }
}

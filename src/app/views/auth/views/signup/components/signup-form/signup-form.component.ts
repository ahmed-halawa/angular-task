import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../../../../../utils/custom-validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  @Output() submitted = new EventEmitter();
  @Input() signUpPending;

  get firstNameRequired(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('firstName').invalid &&
      this.form.get('firstName').hasError('required')
    );
  }

  get firstNameMinlength(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('firstName').invalid &&
      this.form.get('firstName').hasError('minlength') &&
      !this.form.get('firstName').hasError('required')
    );
  }

  get lastNameRequired(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('lastName').invalid &&
      this.form.get('lastName').hasError('required')
    );
  }

  get lastNameMinlength(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('lastName').invalid &&
      this.form.get('lastName').hasError('minlength') &&
      !this.form.get('lastName').hasError('required')
    );
  }

  get usernameRequired(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('username').invalid &&
      this.form.get('username').hasError('required')
    );
  }

  get usernameMinlength(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('username').invalid &&
      this.form.get('username').hasError('minlength') &&
      !this.form.get('username').hasError('required')
    );
  }

  get passwordRequired(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('password').invalid &&
      this.form.get('password').hasError('required')
    );
  }

  get passwordMinlength(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('password').invalid &&
      this.form.get('password').hasError('minlength') &&
      !this.form.get('password').hasError('required')
    );
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [CustomValidators.required, CustomValidators.minLength(3)]
      ],
      lastName: [
        '',
        [CustomValidators.required, CustomValidators.minLength(3)]
      ],
      username: [
        '',
        [CustomValidators.required, CustomValidators.minLength(3)]
      ],
      password: ['', [CustomValidators.required, CustomValidators.minLength(6)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    const { value, valid } = this.form;

    if (valid) {
      this.submitted.emit(value);
    }
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../../../../../utils/custom-validators';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  @Output() submitted = new EventEmitter();

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
      username: [
        '',
        [CustomValidators.required, CustomValidators.minLength(3)]
      ],
      password: ['', [CustomValidators.required, CustomValidators.minLength(6)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.submitted.emit(this.form.value);
  }
}

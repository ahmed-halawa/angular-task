import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromModels from '../../../../models';
import * as fromStore from '../../../../store';
import * as fromActions from '../../../../store/actions';
import { localStorageAdapter } from '../../../../utils/local-storage-adapter';
import { CustomValidators } from '../../../../utils/custom-validators';
import { changePassword } from '../../../../store/actions/auth.actions';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  authUser: fromModels.IUser;

  form: FormGroup;
  isSubmitted = false;
  changePasswordPending$: Observable<boolean>;

  get oldPasswordRequired(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('oldPassword').invalid &&
      this.form.get('oldPassword').hasError('required')
    );
  }

  get oldPasswordMinlength(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('oldPassword').invalid &&
      this.form.get('oldPassword').hasError('minlength') &&
      !this.form.get('oldPassword').hasError('required')
    );
  }

  get newPasswordRequired(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('newPassword').invalid &&
      this.form.get('newPassword').hasError('required')
    );
  }

  get newPasswordMinlength(): boolean {
    return (
      this.isSubmitted &&
      this.form &&
      this.form.get('newPassword').invalid &&
      this.form.get('newPassword').hasError('minlength') &&
      !this.form.get('newPassword').hasError('required')
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromStore.IRootState>
  ) {}

  ngOnInit() {
    this.authUser = localStorageAdapter.getItem('authUser');
    this.changePasswordPending$ = this.store.pipe(
      select(fromStore.getChangePasswordPending)
    );

    this.form = this.formBuilder.group({
      oldPassword: [
        '',
        [CustomValidators.required, CustomValidators.minLength(6)]
      ],
      newPassword: [
        '',
        [CustomValidators.required, CustomValidators.minLength(6)]
      ]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    const { value, valid } = this.form;

    if (valid) {
      this.store.dispatch(
        fromActions.changePassword({
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
          user: this.authUser
        })
      );
    }
  }

  logout() {
    this.store.dispatch(fromActions.logout());
  }
}

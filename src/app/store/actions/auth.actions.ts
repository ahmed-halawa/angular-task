import { createAction, props } from '@ngrx/store';

import * as fromModels from '../../models';

// Login Actions
export const login = createAction(
  '[Authentication] login',
  props<{
    credentials: {
      username: string;
      password: string;
    };
  }>()
);
export const loginSuccess = createAction(
  '[Authentication] login success',
  props<{ token: string; user: fromModels.IUser }>()
);
export const loginFailure = createAction(
  '[Authentication] login failure',
  props<{ error: Error }>()
);

// Signup Actions
export const signup = createAction(
  '[Authentication] signup',
  props<{ user: fromModels.IUser }>()
);
export const signupSuccess = createAction('[Authentication] signup success');
export const signupFailure = createAction(
  '[Authentication] signup failure',
  props<{ error: Error }>()
);

// Change Password Actions
export const changePassword = createAction(
  '[Authentication] changePassword',
  props<{ oldPassword: string; newPassword: string; user: fromModels.IUser }>()
);
export const changePasswordSuccess = createAction(
  '[Authentication] changePassword success'
);
export const changePasswordFailure = createAction(
  '[Authentication] changePassword failure',
  props<{ error: Error }>()
);

// Logout Actions
export const logout = createAction('[Authentication] logout');

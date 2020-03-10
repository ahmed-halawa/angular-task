import { createAction, props } from '@ngrx/store';

import * as fromModels from '../../models';

// Login Actions
export const login = createAction(
  '[Authentication] login',
  props<{
    payload: Partial<fromModels.IUser>;
  }>()
);
export const loginSuccess = createAction('[Authentication] login success');
export const loginFailure = createAction(
  '[Authentication] login failure',
  props<{
    payload: Error;
  }>()
);

// Signup Actions
export const signup = createAction(
  '[Authentication] signup',
  props<{
    payload: Partial<fromModels.IUser>;
  }>()
);
export const signupSuccess = createAction('[Authentication] signup success');
export const signupFailure = createAction(
  '[Authentication] signup failure',
  props<{
    payload: Error;
  }>()
);

// Logout Actions
export const logout = createAction('[Authentication] logout');

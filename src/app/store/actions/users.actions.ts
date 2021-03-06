import { createAction, props } from '@ngrx/store';

import * as fromModels from '../../models';

// Load Users Actions
export const loadUsers = createAction('[Users] load users');
export const loadUsersSuccess = createAction(
  '[Users] load users success',
  props<{ users: fromModels.IUser[] }>()
);
export const loadUsersFailure = createAction(
  '[Users] load users failure',
  props<{ error: Error }>()
);

// Delete User Actions
export const deleteUser = createAction(
  '[Users] delete user',
  props<{
    id: string;
  }>()
);
export const deleteUserSuccess = createAction(
  '[Users] delete user success',
  props<{ id: string }>()
);
export const deleteUserFailure = createAction(
  '[Users] delete user failure',
  props<{ error: Error }>()
);

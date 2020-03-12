import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromAuthReducer from './auth.reducer';
import * as fromUsersReducer from './users.reducer';

export interface IRootState {
  auth: fromAuthReducer.IAuthState;
  users: fromUsersReducer.IUsersState;
}

export const reducers = {
  auth: fromAuthReducer.reducer,
  users: fromUsersReducer.reducer
};

export const getAuthState = createFeatureSelector<fromAuthReducer.IAuthState>(
  'auth'
);

export const getUsersState = createFeatureSelector<
  fromUsersReducer.IUsersState
>('users');

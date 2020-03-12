import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromAuthReducer from './auth.reducer';
import * as fromUsersReducer from './users.reducer';

export interface IRootState {
  auth: fromAuthReducer.IAuthState;
  users: fromUsersReducer.IUsersState;
}

export function reducers(state: IRootState, action: Action) {
  return combineReducers({
    auth: fromAuthReducer.reducer,
    users: fromUsersReducer.reducer
  })(state, action);
}

export const getAuthState = createFeatureSelector<fromAuthReducer.IAuthState>(
  'auth'
);

export const getUsersState = createFeatureSelector<
  fromUsersReducer.IUsersState
>('users');

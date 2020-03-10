import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromAuthReducer from './auth.reducer';

export interface IRootState {
  auth: fromAuthReducer.IAuthState;
}

export function reducers(state: IRootState, action: Action) {
  return combineReducers({
    auth: fromAuthReducer.reducer
  })(state, action);
}

export const getAuthState = createFeatureSelector<fromAuthReducer.IAuthState>(
  'auth'
);

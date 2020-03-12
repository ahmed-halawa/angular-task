import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromAuthReducer from '../reducers/auth.reducer';

export const getAuthLoginPending = createSelector(
  fromRoot.getAuthState,
  (state: fromAuthReducer.IAuthState) => state.loginPending
);

export const getAuthLoginError = createSelector(
  fromRoot.getAuthState,
  (state: fromAuthReducer.IAuthState) => state.loginError
);

export const getAuthSignupPending = createSelector(
  fromRoot.getAuthState,
  (state: fromAuthReducer.IAuthState) => state.signupPending
);

export const getAuthSignupError = createSelector(
  fromRoot.getAuthState,
  (state: fromAuthReducer.IAuthState) => state.signupError
);

// Change password
export const getChangePasswordPending = createSelector(
  fromRoot.getAuthState,
  fromAuthReducer.getChangePasswordPendingState
);

export const getChangePasswordError = createSelector(
  fromRoot.getAuthState,
  fromAuthReducer.getChangePasswordErrorState
);

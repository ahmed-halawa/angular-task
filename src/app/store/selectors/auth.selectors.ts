import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromAuthReducer from '../reducers/auth.reducer';

export const getAuthLoginPending = createSelector(
  fromRoot.getAuthState,
  fromAuthReducer.getLoginPendingState
);

export const getAuthLoginError = createSelector(
  fromRoot.getAuthState,
  fromAuthReducer.getLoginErrorState
);

export const getAuthSignupPending = createSelector(
  fromRoot.getAuthState,
  fromAuthReducer.getSignupPendingState
);

export const getAuthSignupError = createSelector(
  fromRoot.getAuthState,
  fromAuthReducer.getSignupErrorState
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

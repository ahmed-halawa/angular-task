import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromUsersReducer from '../reducers/users.reducer';

export const getUsers = createSelector(
  fromRoot.getUsersState,
  fromUsersReducer.getUsersState
);

export const getUsersPending = createSelector(
  fromRoot.getUsersState,
  fromUsersReducer.getDeleteUserPendingState
);

export const getUsersError = createSelector(
  fromRoot.getUsersState,
  fromUsersReducer.getUsersErrorState
);

export const getDeleteUserPending = createSelector(
  fromRoot.getUsersState,
  fromUsersReducer.getDeleteUserPendingState
);

export const getDeleteUserError = createSelector(
  fromRoot.getUsersState,
  fromUsersReducer.getDeleteUserErrorState
);

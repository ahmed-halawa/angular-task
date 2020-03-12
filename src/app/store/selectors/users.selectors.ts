import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromUsersReducer from '../reducers/users.reducer';

export const getUsers = createSelector(
  fromRoot.getUsersState,
  (state: fromUsersReducer.IUsersState) => state.users
);

export const getUsersPending = createSelector(
  fromRoot.getUsersState,
  (state: fromUsersReducer.IUsersState) => state.pending
);

export const getUsersError = createSelector(
  fromRoot.getUsersState,
  (state: fromUsersReducer.IUsersState) => state.error
);

export const getDeleteUserPending = createSelector(
  fromRoot.getUsersState,
  (state: fromUsersReducer.IUsersState) => state.deletePending
);

export const getDeleteUserError = createSelector(
  fromRoot.getUsersState,
  (state: fromUsersReducer.IUsersState) => state.deleteError
);

import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '../actions';

export interface IUsersState {
  pending: boolean;
  error: Error;
  deletePending: boolean;
  deleteError: Error;
}

export const initialState: IUsersState = {
  pending: false,
  error: undefined,
  deletePending: false,
  deleteError: undefined
};

export const usersReducer = createReducer(
  initialState,

  // Handle load users actions
  on(fromActions.loadUsers, state => ({
    ...state,
    pending: true,
    error: undefined
  })),
  on(fromActions.loadUsersSuccess, state => ({
    ...state,
    pending: false,
    error: undefined
  })),
  on(fromActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error: error
  })),

  // Handle delete user actions
  on(fromActions.deleteUser, state => ({
    ...state,
    deletePending: true,
    deleteError: undefined
  })),
  on(fromActions.deleteUserSuccess, state => ({
    ...state,
    deletePending: false,
    deleteError: undefined
  })),
  on(fromActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    deletePending: false,
    deleteError: error
  }))
);

export function reducer(state: IUsersState | undefined, action: Action) {
  return usersReducer(state, action);
}

// Load users selectors
export const getUsersPendingState = (state: IUsersState) => state.pending;
export const getUsersErrorState = (state: IUsersState) => state.error;

// Delete user selectors
export const getDeleteUserPendingState = (state: IUsersState) =>
  state.deletePending;
export const getDeleteUserErrorState = (state: IUsersState) =>
  state.deleteError;

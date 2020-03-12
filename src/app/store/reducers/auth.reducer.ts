import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '../../store/actions';

export interface IAuthState {
  loginPending: boolean;
  loginError: Error;
  signupPending: boolean;
  signupError: Error;
}

export const initialState: IAuthState = {
  loginPending: false,
  loginError: undefined,
  signupPending: false,
  signupError: undefined
};

export const authReducer = createReducer(
  initialState,

  // Handle login actions
  on(fromActions.login, state => ({
    ...state,
    loginPending: true,
    loginError: undefined
  })),
  on(fromActions.loginSuccess, state => ({
    ...state,
    loginPending: false,
    loginError: undefined
  })),
  on(fromActions.loginFailure, (state, { error }) => ({
    ...state,
    loginPending: false,
    loginError: error
  })),

  // Handle signup actions
  on(fromActions.signup, state => ({
    ...state,
    signupPending: true,
    signupError: undefined
  })),
  on(fromActions.signupSuccess, state => ({
    ...state,
    signupPending: false,
    signupError: undefined
  })),
  on(fromActions.signupFailure, (state, { error }) => ({
    ...state,
    signupPending: false,
    signupError: error
  }))
);

export function reducer(state: IAuthState | undefined, action: Action) {
  return authReducer(state, action);
}

// Login selectors
export const getLoginPendingState = (state: IAuthState) => state.loginPending;
export const getLoginErrorState = (state: IAuthState) => state.loginError;

// Signup selectors
export const getSignupPendingState = (state: IAuthState) => state.signupPending;
export const getSignupErrorState = (state: IAuthState) => state.signupError;

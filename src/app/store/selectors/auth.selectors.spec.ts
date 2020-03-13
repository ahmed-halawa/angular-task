import { TestBed } from '@angular/core/testing';

import { combineLatest } from 'rxjs';
import { Store, StoreModule, select } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

import * as faker from 'faker';

import * as fromReducers from '../reducers';
import * as fromAuthSelectors from '../selectors/auth.selectors';
import * as fromAuthActions from '../actions/auth.actions';

describe('AuthSelectors', () => {
  let store: MockStore<fromReducers.IRootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            ...fromReducers.reducers
          },
          {
            runtimeChecks: {
              strictStateImmutability: false,
              strictActionImmutability: false,
              strictStateSerializability: false,
              strictActionSerializability: false
            }
          }
        )
      ]
    });

    store = TestBed.get(Store);
  });

  // Initial state for all (login - signup - change password)
  it('should return initial state', () => {
    let loginPending: boolean;
    let loginError: Error;

    let signupPending: boolean;
    let signupError: Error;

    let changePasswordPending: boolean;
    let changePasswordError: Error;

    const loginPending$ = store.pipe(
      select(fromAuthSelectors.getAuthLoginPending)
    );
    const loginError$ = store.pipe(select(fromAuthSelectors.getAuthLoginError));

    const signupPending$ = store.pipe(
      select(fromAuthSelectors.getAuthSignupPending)
    );
    const signupError$ = store.pipe(
      select(fromAuthSelectors.getAuthSignupError)
    );

    const changePasswordPending$ = store.pipe(
      select(fromAuthSelectors.getChangePasswordPending)
    );
    const changePasswordError$ = store.pipe(
      select(fromAuthSelectors.getChangePasswordError)
    );

    combineLatest(
      loginPending$,
      loginError$,
      signupPending$,
      signupError$,
      changePasswordPending$,
      changePasswordError$
    ).subscribe(
      ([
        _loginPending,
        _loginError,
        _signupPending,
        _signupError,
        _changePasswordPending,
        _changePasswordError
      ]: [boolean, Error, boolean, Error, boolean, Error]) => {
        loginPending = _loginPending;
        loginError = _loginError;

        signupPending = _signupPending;
        signupError = _signupError;

        changePasswordPending = _changePasswordPending;
        changePasswordError = _changePasswordError;
      }
    );

    expect(loginPending).toBe(false);
    expect(loginError).toBeUndefined();

    expect(signupPending).toBe(false);
    expect(signupError).toBeUndefined();

    expect(changePasswordPending).toBe(false);
    expect(changePasswordError).toBeUndefined();
  });

  // Login Selectors
  it('should change state after login action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromAuthSelectors.getAuthLoginPending));
    const error$ = store.pipe(select(fromAuthSelectors.getAuthLoginError));

    store.dispatch(
      fromAuthActions.login({
        credentials: {
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(true);
    expect(error).toBeUndefined();
  });

  it('should change state after loginSuccess action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromAuthSelectors.getAuthLoginPending));
    const error$ = store.pipe(select(fromAuthSelectors.getAuthLoginError));

    store.dispatch(
      fromAuthActions.loginSuccess({
        token: 'Bearer fake token',
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName()
        }
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error).toBeUndefined();
  });

  it('should change state after loginFailure action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromAuthSelectors.getAuthLoginPending));
    const error$ = store.pipe(select(fromAuthSelectors.getAuthLoginError));

    store.dispatch(
      fromAuthActions.loginFailure({
        error: new Error('login Failure')
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error.message).toBe('login Failure');
  });

  // Signup Selectors
  it('should change state after signup action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromAuthSelectors.getAuthSignupPending));
    const error$ = store.pipe(select(fromAuthSelectors.getAuthSignupError));

    store.dispatch(
      fromAuthActions.signup({
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(true);
    expect(error).toBeUndefined();
  });

  it('should change state after signupSuccess action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromAuthSelectors.getAuthSignupPending));
    const error$ = store.pipe(select(fromAuthSelectors.getAuthSignupError));

    store.dispatch(fromAuthActions.signupSuccess());

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error).toBeUndefined();
  });

  it('should change state after signupFailure action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromAuthSelectors.getAuthSignupPending));
    const error$ = store.pipe(select(fromAuthSelectors.getAuthSignupError));

    store.dispatch(
      fromAuthActions.signupFailure({
        error: new Error('Signup Failure')
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error.message).toBe('Signup Failure');
  });

  // Change Password Selectors
  it('should change state after changePassword action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(
      select(fromAuthSelectors.getChangePasswordPending)
    );
    const error$ = store.pipe(select(fromAuthSelectors.getChangePasswordError));

    store.dispatch(
      fromAuthActions.changePassword({
        newPassword: faker.random.uuid(),
        oldPassword: faker.random.uuid(),
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(true);
    expect(error).toBeUndefined();
  });

  it('should change state after changePasswordSuccess action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(
      select(fromAuthSelectors.getChangePasswordPending)
    );
    const error$ = store.pipe(select(fromAuthSelectors.getChangePasswordError));

    store.dispatch(fromAuthActions.changePasswordSuccess());

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error).toBeUndefined();
  });

  it('should change state after changePasswordFailure action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(
      select(fromAuthSelectors.getChangePasswordPending)
    );
    const error$ = store.pipe(select(fromAuthSelectors.getChangePasswordError));

    store.dispatch(
      fromAuthActions.changePasswordFailure({
        error: new Error('Change Password Failure')
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error.message).toBe('Change Password Failure');
  });
});

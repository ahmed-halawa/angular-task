import * as faker from 'faker';

import * as fromAuthReducer from '../reducers/auth.reducer';
import * as fromAuthActions from '../../store/actions/auth.actions';

describe('AuthReducer', () => {
  // Login
  it('should pending = true & error = undefined if login action is dispatched', () => {
    const action = fromAuthActions.login({
      credentials: {
        username: faker.name.findName(),
        password: faker.random.uuid()
      }
    });

    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.loginError).toBeUndefined();
    expect(result.loginPending).toBe(true);
  });

  it('should pending = false & error = undefined if loginSuccess is dispatched', () => {
    const action = fromAuthActions.loginSuccess({
      token: 'Bearer fake token',
      user: {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.name.findName()
      }
    });
    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.loginError).toBeUndefined();
    expect(result.loginPending).toBe(false);
  });

  it('should pending = false & error != undefined if loginFailure action is dispatched', () => {
    const action = fromAuthActions.loginFailure({
      error: new Error('Login Error Message')
    });

    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.loginError.message).toBe('Login Error Message');
    expect(result.loginPending).toBe(false);
  });

  // Signup
  it('should pending = true & error = undefined if login signup is dispatched', () => {
    const action = fromAuthActions.signup({
      user: {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.name.findName(),
        password: faker.random.uuid()
      }
    });

    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.signupError).toBeUndefined();
    expect(result.signupPending).toBe(true);
  });

  it('should pending = false & error = undefined if signupSuccess is dispatched', () => {
    const action = fromAuthActions.signupSuccess();
    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.signupError).toBeUndefined();
    expect(result.signupPending).toBe(false);
  });

  it('should pending = false & error != undefined if signupFailure action is dispatched', () => {
    const action = fromAuthActions.signupFailure({
      error: new Error('Signup Error Message')
    });

    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.signupError.message).toBe('Signup Error Message');
    expect(result.signupPending).toBe(false);
  });

  // Change Password
  it('should pending = true & error = undefined if login changePassword is dispatched', () => {
    const action = fromAuthActions.changePassword({
      newPassword: faker.random.uuid(),
      oldPassword: faker.random.uuid(),
      user: {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.name.findName(),
        password: faker.random.uuid()
      }
    });

    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.changePasswordError).toBeUndefined();
    expect(result.changePasswordPending).toBe(true);
  });

  it('should pending = false & error = undefined if changePasswordSuccess is dispatched', () => {
    const action = fromAuthActions.changePasswordSuccess();
    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.changePasswordError).toBeUndefined();
    expect(result.changePasswordPending).toBe(false);
  });

  it('should pending = false & error != undefined if changePasswordFailure action is dispatched', () => {
    const action = fromAuthActions.changePasswordFailure({
      error: new Error('Change Password Error Message')
    });

    const result = fromAuthReducer.reducer(
      fromAuthReducer.initialState,
      action
    );

    expect(result.changePasswordError.message).toBe(
      'Change Password Error Message'
    );
    expect(result.changePasswordPending).toBe(false);
  });
});

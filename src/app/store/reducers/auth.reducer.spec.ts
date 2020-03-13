import * as faker from 'faker';

import * as fromAuthReducer from '../reducers/auth.reducer';
import * as fromAuthActions from '../../store/actions/auth.actions';

describe('AuthReducer', () => {
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

  it('should pending = false & error = undefined if loginSuccess', () => {
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
});

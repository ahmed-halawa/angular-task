import * as faker from 'faker';

import * as fromUsersReducer from '../reducers/users.reducer';
import * as fromUsersActions from '../../store/actions/users.actions';
import * as fromModels from '../../models';

const mockedUsers: fromModels.IUser[] = [
  {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: faker.random.uuid()
  },
  {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: faker.random.uuid()
  }
];

describe('UsersReducer', () => {
  it('should pending = true & error = undefined if loadUsers action is dispatched', () => {
    const action = fromUsersActions.loadUsers();

    const result = fromUsersReducer.reducer(
      fromUsersReducer.initialState,
      action
    );

    expect(result.error).toBeUndefined();
    expect(result.pending).toBe(true);
  });

  it('should pending = false & error = undefined & users = mocked users if loadUsersSuccess is dispatched', () => {
    const action = fromUsersActions.loadUsersSuccess({ users: mockedUsers });
    const result = fromUsersReducer.reducer(
      fromUsersReducer.initialState,
      action
    );

    expect(result.error).toBeUndefined();
    expect(result.pending).toBe(false);
    expect(result.users).toEqual(mockedUsers);
  });

  it('should pending = false & error != undefined if loadUsersFailure action is dispatched', () => {
    const action = fromUsersActions.loadUsersFailure({
      error: new Error('Fake LoadUsers Error Message')
    });

    const result = fromUsersReducer.reducer(
      fromUsersReducer.initialState,
      action
    );

    expect(result.error.message).toBe('Fake LoadUsers Error Message');
    expect(result.pending).toBe(false);
  });
});

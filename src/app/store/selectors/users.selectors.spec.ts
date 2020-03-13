import { TestBed } from '@angular/core/testing';

import { combineLatest } from 'rxjs';
import { Store, StoreModule, select } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

import * as faker from 'faker';

import * as fromReducers from '../reducers';
import * as fromUsersSelectors from './users.selectors';
import * as fromUsersActions from '../actions/users.actions';
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

describe('UsersSelectors', () => {
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

  // Initial state for all (loadUsers - deleteUser)
  it('should return initial state', () => {
    let pending: boolean;
    let error: Error;
    let users: fromModels.IUser[];

    let deletePending: boolean;
    let deleteError: Error;

    const pending$ = store.pipe(select(fromUsersSelectors.getUsersPending));
    const error$ = store.pipe(select(fromUsersSelectors.getUsersError));
    const users$ = store.pipe(select(fromUsersSelectors.getUsers));

    const deletePending$ = store.pipe(
      select(fromUsersSelectors.getDeleteUserPending)
    );
    const deleteError$ = store.pipe(
      select(fromUsersSelectors.getDeleteUserError)
    );

    combineLatest(
      pending$,
      error$,
      users$,

      deletePending$,
      deleteError$
    ).subscribe(
      ([_pending, _error, _users, _deletePending, _deleteError]: [
        boolean,
        Error,
        fromModels.IUser[],

        boolean,
        Error
      ]) => {
        pending = _pending;
        error = _error;
        users = _users;

        deletePending = _deletePending;
        deleteError = _deleteError;
      }
    );

    expect(pending).toBe(false);
    expect(error).toBeUndefined();
    expect(users).toEqual([]);

    expect(deletePending).toBe(false);
    expect(deleteError).toBeUndefined();
  });

  // Loading users selectors
  it('should change state after loadUsers action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromUsersSelectors.getUsersPending));
    const error$ = store.pipe(select(fromUsersSelectors.getUsersError));

    store.dispatch(fromUsersActions.loadUsers());

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(true);
    expect(error).toBeUndefined();
  });

  it('should change state after loadUsersSuccess action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromUsersSelectors.getUsersPending));
    const error$ = store.pipe(select(fromUsersSelectors.getUsersError));

    store.dispatch(fromUsersActions.loadUsersSuccess({ users: mockedUsers }));

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error).toBeUndefined();
  });

  it('should change state after loadUsersFailure action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromUsersSelectors.getUsersPending));
    const error$ = store.pipe(select(fromUsersSelectors.getUsersError));

    store.dispatch(
      fromUsersActions.loadUsersFailure({
        error: new Error('Load Users Failure')
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error.message).toBe('Load Users Failure');
  });

  // Delete users selectors
  it('should change state after deleteUser action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(
      select(fromUsersSelectors.getDeleteUserPending)
    );
    const error$ = store.pipe(select(fromUsersSelectors.getDeleteUserError));

    store.dispatch(fromUsersActions.deleteUser({ id: faker.random.uuid() }));

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(true);
    expect(error).toBeUndefined();
  });

  it('should change state after deleteUserSuccess action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(select(fromUsersSelectors.getUsersPending));
    const error$ = store.pipe(select(fromUsersSelectors.getUsersError));

    store.dispatch(
      fromUsersActions.deleteUserSuccess({
        id: faker.random.uuid()
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

  it('should change state after deleteUserFailure action', () => {
    let pending: boolean;
    let error: Error;

    const pending$ = store.pipe(
      select(fromUsersSelectors.getDeleteUserPending)
    );
    const error$ = store.pipe(select(fromUsersSelectors.getDeleteUserError));

    store.dispatch(
      fromUsersActions.deleteUserFailure({
        error: new Error('Delete User Failure')
      })
    );

    combineLatest(pending$, error$).subscribe(
      ([_pending, _error]: [boolean, Error]) => {
        pending = _pending;
        error = _error;
      }
    );

    expect(pending).toBe(false);
    expect(error.message).toBe('Delete User Failure');
  });
});

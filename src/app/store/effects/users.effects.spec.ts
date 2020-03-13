import { TestBed } from '@angular/core/testing';

import { Observable, of, throwError } from 'rxjs';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import * as faker from 'faker';
import { ToastrService } from 'ngx-toastr';

import * as fromServices from '../../services';
import { UsersEffects } from './users.effects';
import * as fromUsersActions from '../actions/users.actions';
import * as fromModels from '../../models';

describe('UsersEffects', () => {
  let effects: UsersEffects;
  let actions$: Observable<any>;
  let usersService: fromServices.UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        {
          provide: fromServices.UsersService,
          useValue: {
            getUsers: jest.fn(),
            deleteUser: jest.fn()
          }
        },
        {
          provide: ToastrService,
          useValue: {
            success: jest.fn(),
            error: jest.fn()
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(UsersEffects);
    actions$ = TestBed.get(Actions);
    usersService = TestBed.get(fromServices.UsersService);
  });

  describe('loadUsers$', () => {
    it('should return a loadUsersSuccess, on success', () => {
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

      const action = fromUsersActions.loadUsers();
      const completion = fromUsersActions.loadUsersSuccess({
        users: mockedUsers
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      usersService.getUsers = jest.fn(() => of(mockedUsers));

      expect(effects.loadUsers$).toBeObservable(expected);
    });

    it('should return a loadUsersFailure, on failure', () => {
      const action = fromUsersActions.loadUsers();
      const error = 'Error!';
      const completion = fromUsersActions.loadUsersFailure({
        error: new Error(error)
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      usersService.getUsers = jest.fn(() => throwError(new Error(error)));

      expect(effects.loadUsers$).toBeObservable(expected);
    });
  });

  describe('deleteUser$', () => {
    it('should return a deleteUserSuccess, on success', () => {
      const fakeId = faker.random.uuid();
      const action = fromUsersActions.deleteUser({ id: fakeId });
      const completion = fromUsersActions.deleteUserSuccess({
        id: fakeId
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      usersService.deleteUser = jest.fn(() => of({ id: fakeId }));

      expect(effects.deleteUser$).toBeObservable(expected);
    });

    it('should return a deleteUserFailure, on failure', () => {
      const action = fromUsersActions.deleteUser({ id: faker.random.uuid() });
      const error = 'Error!';
      const completion = fromUsersActions.deleteUserFailure({
        error: new Error(error)
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      usersService.deleteUser = jest.fn(() => throwError(new Error(error)));

      expect(effects.deleteUser$).toBeObservable(expected);
    });
  });
});

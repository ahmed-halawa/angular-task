import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import * as faker from 'faker';
import { ToastrService } from 'ngx-toastr';

import * as fromServices from '../../services';
import { AuthEffects } from './auth.effects';
import * as fromAuthActions from '../actions/auth.actions';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;
  let authService: fromServices.AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {
          provide: fromServices.AuthService,
          useValue: {
            login: jest.fn(),
            signup: jest.fn(),
            changePassword: jest.fn()
          }
        },
        {
          provide: ToastrService,
          useValue: {
            success: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthEffects);
    actions$ = TestBed.get(Actions);
    authService = TestBed.get(fromServices.AuthService);
  });

  describe('login$', () => {
    it('should return a loginSuccess, on success', () => {
      const loginPayload = {
        credentials: {
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      };

      const loginSuccessPayload = {
        token: 'Bearer fake token',
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName()
        }
      };

      const action = fromAuthActions.login(loginPayload);
      const completion = fromAuthActions.loginSuccess(loginSuccessPayload);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      authService.login = jest.fn(() => of(loginSuccessPayload));

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a loginFailure, on failure', () => {
      const loginPayload = {
        credentials: {
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      };

      const action = fromAuthActions.login(loginPayload);
      const error = 'Error!';
      const completion = fromAuthActions.loginFailure({
        error: new Error(error)
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      authService.login = jest.fn(() => throwError(new Error(error)));

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('signup$', () => {
    it('should return a signupSuccess, on success', () => {
      const signupPayload = {
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      };

      const action = fromAuthActions.signup(signupPayload);
      const completion = fromAuthActions.signupSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      authService.signup = jest.fn(() => of({}));

      expect(effects.signup$).toBeObservable(expected);
    });

    it('should return a signupFailure, on failure', () => {
      const signupPayload = {
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      };

      const action = fromAuthActions.signup(signupPayload);
      const error = 'Error!';
      const completion = fromAuthActions.signupFailure({
        error: new Error(error)
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      authService.signup = jest.fn(() => throwError(new Error(error)));

      expect(effects.signup$).toBeObservable(expected);
    });
  });

  describe('changePassword$', () => {
    it('should return a changePasswordSuccess, on success', () => {
      const changePasswordPayload = {
        newPassword: faker.random.uuid(),
        oldPassword: faker.random.uuid(),
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      };

      const action = fromAuthActions.changePassword(changePasswordPayload);
      const completion = fromAuthActions.changePasswordSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      authService.changePassword = jest.fn(() => of({}));

      expect(effects.changePassword$).toBeObservable(expected);
    });

    it('should return a changePasswordFailure, on failure', () => {
      const changePasswordPayload = {
        newPassword: faker.random.uuid(),
        oldPassword: faker.random.uuid(),
        user: {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.name.findName(),
          password: faker.random.uuid()
        }
      };

      const action = fromAuthActions.changePassword(changePasswordPayload);
      const error = 'Error!';
      const completion = fromAuthActions.changePasswordFailure({
        error: new Error(error)
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      authService.changePassword = jest.fn(() => throwError(new Error(error)));

      expect(effects.changePassword$).toBeObservable(expected);
    });
  });
});

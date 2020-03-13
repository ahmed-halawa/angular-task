import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import * as faker from 'faker';
import { cold } from 'jasmine-marbles';

import { AuthService } from './auth.service';
import * as fromModels from '../models';

describe('Auth Service', () => {
  let service: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: jest.fn(), post: jest.fn() } }
      ]
    });

    service = TestBed.get(AuthService);
    http = TestBed.get(HttpClient);
  });

  const mockedLoginPayload = {
    username: faker.name.findName(),
    password: faker.random.uuid()
  };

  const mockedLoginResponsePayload = {
    token: 'Bearer fake token',
    user: {
      ...mockedLoginPayload,
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }
  };

  const mockedSignupPayload: fromModels.IUser = {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: faker.random.uuid()
  };

  const mockedChangePasswordPayload = {
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

  it('should call the login api and return user with token', () => {
    const response = cold('-a|', { a: mockedLoginResponsePayload });
    const expected = cold('-b|', { b: mockedLoginResponsePayload });
    http.post = jest.fn(() => response);

    expect(service.login(mockedLoginPayload)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(
      '/api/v1/auth/login',
      mockedLoginPayload
    );
  });

  it('should call the signup api', () => {
    const response = cold('-a|', { a: {} });
    const expected = cold('-b|', { b: {} });
    http.post = jest.fn(() => response);

    expect(service.signup(mockedSignupPayload)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(
      '/api/v1/auth/signup',
      mockedSignupPayload
    );
  });

  it('should call the change password api', () => {
    const response = cold('-a|', { a: {} });
    const expected = cold('-b|', { b: {} });
    http.post = jest.fn(() => response);

    expect(service.changePassword(mockedChangePasswordPayload)).toBeObservable(
      expected
    );
    expect(http.post).toHaveBeenCalledWith(
      '/api/v1/auth/change-password',
      mockedChangePasswordPayload
    );
  });
});

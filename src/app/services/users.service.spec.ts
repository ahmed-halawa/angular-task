import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import * as faker from 'faker';
import { cold } from 'jasmine-marbles';

import { UsersService } from './users.service';
import * as fromModels from '../models';

describe('Users Service', () => {
  let service: UsersService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: jest.fn(), delete: jest.fn() } }
      ]
    });

    service = TestBed.get(UsersService);
    http = TestBed.get(HttpClient);
  });

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

  const mockDeletedUserId = faker.random.uuid();

  it('should call the getUsers api and return all users data', () => {
    const response = cold('-a|', { a: mockedUsers });
    const expected = cold('-b|', { b: mockedUsers });
    http.get = jest.fn(() => response);

    expect(service.getUsers()).toBeObservable(expected);
    expect(http.get).toHaveBeenCalledWith(`/api/v1/users`);
  });

  it('should call the deleteUser api and return id of deleted user', () => {
    const response = cold('-a|', { a: { id: mockDeletedUserId } });
    const expected = cold('-b|', { b: { id: mockDeletedUserId } });
    http.delete = jest.fn(() => response);

    expect(service.deleteUser(mockDeletedUserId)).toBeObservable(expected);
    expect(http.delete).toHaveBeenCalledWith(
      `/api/v1/users/delete/${mockDeletedUserId}`
    );
  });
});

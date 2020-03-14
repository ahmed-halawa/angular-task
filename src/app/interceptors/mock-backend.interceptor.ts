import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

import { v4 as uuidV4 } from 'uuid';

import * as fromModels from '../models';
import { localStorageAdapter } from '../utils/local-storage-adapter';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  users: fromModels.IUser[] = localStorageAdapter.getItem('users') || [];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'POST' && request.url === '/api/v1/auth/signup') {
      const newUser = { ...request.body, id: uuidV4() };

      // check if new user username is exist or not
      // if throw an error
      const userIsFound = this.users.find(
        _user => _user.username === newUser.username
      );

      if (userIsFound) {
        // this is the way to delay throwError Observable
        const throwingObservable = throwError(
          new Error('This username is already exist.')
        );
        return timer(1500).pipe(mergeMap(e => throwingObservable));
      }

      this.users.push(newUser);
      localStorageAdapter.setItem('users', this.users);
      return of(new HttpResponse({ status: 200 })).pipe(delay(1500));
    }

    if (request.method === 'POST' && request.url === '/api/v1/auth/login') {
      this.users = localStorageAdapter.getItem('users') || [];

      const { username, password } = request.body;
      const user = this.users.find(
        _user => _user.username === username && _user.password === password
      );

      const fakeToken = 'Bearer fake token';

      if (user) {
        return of(
          new HttpResponse({ status: 200, body: { token: fakeToken, user } })
        ).pipe(delay(1500));
      } else {
        // this is the way to delay throwError Observable
        const throwingObservable = throwError(
          new Error('Username or password is invalid.')
        );
        return timer(1500).pipe(mergeMap(e => throwingObservable));
      }
    }

    if (request.method === 'GET' && request.url === '/api/v1/users') {
      return of(new HttpResponse({ status: 200, body: this.users })).pipe(
        delay(1500) // Simulate async process
      );
    }

    if (
      request.method === 'DELETE' &&
      request.url.startsWith('/api/v1/users/delete/')
    ) {
      const urlParts = request.url.split('/');
      const id = urlParts[urlParts.length - 1];

      const users = this.users.filter(_user => _user.id !== id);
      localStorageAdapter.setItem('users', users);
      this.users = localStorageAdapter.getItem('users');

      return of(new HttpResponse({ status: 200, body: { id } }));
    }

    // Handle change password api
    if (
      request.method === 'POST' &&
      request.url === '/api/v1/auth/change-password'
    ) {
      const { oldPassword, newPassword, user } = request.body;
      const userFound = this.users.find(
        _user =>
          _user.username === user.username && _user.password === oldPassword
      );

      if (userFound) {
        // Change his password to new password
        const newUser: fromModels.IUser = { ...user, password: newPassword };
        const newUsers = this.users.filter(_user => _user.id !== user.id);
        localStorageAdapter.setItem('users', [...newUsers, newUser]);
        this.users = localStorageAdapter.getItem('users');

        return of(new HttpResponse({ status: 200, body: { user } })).pipe(
          delay(1500)
        );
      } else {
        // this is the way to delay throwError Observable
        const throwingObservable = throwError(
          new Error('The old password is invalid. something wrong!')
        );
        return timer(1500).pipe(mergeMap(e => throwingObservable));
      }
    }
  }
}

/**
 *   TODO: Signup module
 *
 *   1. components
 *   2. state management
 *   3. design
 *   4. feedback
 *   5. error cases with api like username is already exits
 *   6. pending & spinners
 *  
 *  TODO: Testing
 *          1. Ngrx store [reducers, selectors, effects] 
 *          2. Services [auth, users] 
 *          3. Services [auth, users]  
 */

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

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
      this.users.push(newUser);
      localStorageAdapter.setItem('users', this.users);
      return of(new HttpResponse({ status: 200 })).pipe(delay(2000));
    }

    if (request.method === 'POST' && request.url === '/api/v1/auth/login') {
      const { username, password } = request.body;
      const user = this.users.find(
        _user => _user.username === username && _user.password === password
      );

      if (user) {
        return of(new HttpResponse({ status: 200 })).pipe(delay(2000));
      } else {
        return throwError({
          message: 'Username or password is invalid.'
        });
      }
    }

    if (request.method === 'GET' && request.url === '/api/v1/users') {
      return of(new HttpResponse({ status: 200, body: this.users })).pipe(
        delay(2000) // Simulate async process
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

      return of(new HttpResponse({ status: 200, body: { id } })).pipe(
        delay(2000)
      );
    }
  }
}

/**
 * TODO: connect ngrx
 * TODO: add ngrx effects
 * TODO: complete all api actions
 * TODO: add jwt and its interceptor
 * TODO: design the app with responsive
 * TODO: test ngrx state
 * TODO: test local storage adapter
 * TODO: test components
 *
 */

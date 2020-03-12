import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as fromModels from '../models';
import { localStorageAdapter } from '../utils/local-storage-adapter';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<{ token: string; user: fromModels.IUser }> {
    return this.httpClient.post<{ token: string; user: fromModels.IUser }>(
      '/api/v1/auth/login',
      credentials
    );
  }

  signup(user: fromModels.IUser) {
    return this.httpClient.post('/api/v1/auth/signup', user);
  }

  changePassword({
    oldPassword,
    newPassword,
    user
  }: {
    oldPassword;
    newPassword;
    user: fromModels.IUser;
  }) {
    return this.httpClient.post('/api/v1/auth/change-password', {
      oldPassword,
      newPassword,
      user
    });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getAuthUser(): fromModels.IUser {
    return localStorageAdapter.getItem('authUser');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    const authUser = this.getAuthUser();

    // TODO: must check token expiry WHEN (Real Backend Api)
    // const helper = new JwtHelperService();
    // return helper.isTokenExpired(token);

    if (token && authUser && authUser.id) {
      return true;
    } else {
      return false;
    }
  }
}

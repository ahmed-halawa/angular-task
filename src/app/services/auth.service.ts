import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as fromModels from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(
      '/api/v1/auth/login',
      credentials
    );
  }

  signup(user: fromModels.IUser) {
    return this.httpClient.post('/api/v1/auth/signup', user);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    // TODO: must check token expiry WHEN (Real Backend Api)
    // const helper = new JwtHelperService();
    // return helper.isTokenExpired(token);

    if (token) {
      return true;
    } else {
      return false;
    }
  }
}

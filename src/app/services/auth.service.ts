import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as fromModels from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.httpClient.post('/api/v1/auth/login', credentials);
  }

  signup(user: fromModels.IUser) {
    return this.httpClient.post('/api/v1/auth/signup', user);
  }
}

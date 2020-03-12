import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as fromModels from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<fromModels.IUser[]> {
    return this.httpClient.get<fromModels.IUser[]>('/api/v1/users');
  }

  deleteUser(id: string): Observable<{ id: string }> {
    return this.httpClient.delete<{ id: string }>(`/api/v1/users/delete/${id}`);
  }
}

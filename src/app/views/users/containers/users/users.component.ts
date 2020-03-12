import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromModels from '../../../../models';
import * as fromStore from '../../../../store';
import * as fromActions from '../../../../store/actions';
import { localStorageAdapter } from '../../../../utils/local-storage-adapter';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<fromModels.IUser[]>;
  usersLoading$: Observable<boolean>;
  authUser: fromModels.IUser;

  constructor(private store: Store<fromStore.IRootState>) {}

  ngOnInit() {
    this.authUser = localStorageAdapter.getItem('authUser');
    this.users$ = this.store.pipe(select(fromStore.getUsers));
    this.usersLoading$ = this.store.pipe(select(fromStore.getUsersPending));
    this.loadUsers();
  }

  private loadUsers() {
    this.store.dispatch(fromActions.loadUsers());
  }

  logout() {
    this.store.dispatch(fromActions.logout());
  }

  deleteUser({ id }: fromModels.IUser) {
    this.store.dispatch(fromActions.deleteUser({ id }));
  }
}

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromModels from '../../../../models';
import * as fromStore from '../../../../store';
import * as fromActions from '../../../../store/actions';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<fromModels.IUser[]>;
  usersLoading$: Observable<boolean>;

  constructor(private store: Store<fromStore.IRootState>) {}

  ngOnInit() {
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
}

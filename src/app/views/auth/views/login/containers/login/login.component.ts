import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../../../../../../store';
import * as fromActions from '../../../../../../store/actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPending$: Observable<boolean>;

  constructor(private store: Store<fromStore.IRootState>) {}

  ngOnInit() {
    this.loginPending$ = this.store.pipe(select(fromStore.getAuthLoginPending));
  }

  onSubmit(credentials: { username: string; password: string }) {
    this.store.dispatch(fromActions.login({ credentials }));
  }
}

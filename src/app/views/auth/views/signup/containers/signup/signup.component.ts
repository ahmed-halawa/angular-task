import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromModels from '../../../../../../models';
import * as fromStore from '../../../../../../store';
import * as fromActions from '../../../../../../store/actions';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpPending$: Observable<boolean>;

  constructor(private store: Store<fromStore.IRootState>) {}

  ngOnInit() {
    this.signUpPending$ = this.store.pipe(
      select(fromStore.getAuthSignupPending)
    );
  }

  onSubmit(user: fromModels.IUser) {
    this.store.dispatch(fromActions.signup({ user }));
  }
}

import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions';
import * as fromServices from '../../services';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: fromServices.AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.login),
      switchMap(payload =>
        this.authService.login(payload).pipe(
          map(() => fromActions.loginSuccess()),
          catchError(err => of(fromActions.loginFailure(err)))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signup),
      switchMap(payload =>
        this.authService.signup(payload).pipe(
          map(() => fromActions.signupSuccess()),
          catchError(err => of(fromActions.signupFailure(err)))
        )
      )
    )
  );
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';

import * as fromActions from '../actions';
import * as fromServices from '../../services';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: fromServices.AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.login),
      switchMap(payload =>
        this.authService.login(payload.credentials).pipe(
          map(() => fromActions.loginSuccess()),
          catchError(error => of(fromActions.loginFailure({ error })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signup),
      switchMap(payload =>
        this.authService.signup(payload.user).pipe(
          map(() => fromActions.signupSuccess()),
          catchError(error => of(fromActions.signupFailure({ error })))
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.signupSuccess),
        tap(() => {
          this.toastr.success('You have successfully signed up', 'Congrats', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });

          this.router.navigate(['/auth/login']);
        })
      );
    },
    { dispatch: false }
  );

  signupFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.signupFailure),
        tap(({ error }) => {
          this.toastr.error(error.message, 'Failed to signup', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });
        })
      );
    },
    { dispatch: false }
  );
}

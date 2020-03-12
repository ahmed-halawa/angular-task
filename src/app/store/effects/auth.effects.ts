import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import { localStorageAdapter } from '../../utils/local-storage-adapter';

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
          map(({ token, user }) => fromActions.loginSuccess({ token, user })),
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

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.loginSuccess),
        tap(({ token, user }) => {
          localStorage.setItem('token', token);
          localStorageAdapter.setItem('authUser', user);

          this.toastr.success('You have successfully logged in', 'Cool!', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });

          this.router.navigate(['/users']);
        })
      );
    },
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.loginFailure),
        tap(({ error }) => {
          this.toastr.error(error.message, 'Failed to login', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/auth/login']);
        })
      );
    },
    { dispatch: false }
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.changePassword),
      switchMap(payload =>
        this.authService.changePassword(payload).pipe(
          map(() => fromActions.changePasswordSuccess()),
          catchError(error => of(fromActions.changePasswordFailure({ error })))
        )
      )
    )
  );

  changePasswordSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.changePasswordSuccess),
        tap(() => {
          this.toastr.success(
            'You password has been successfully changed',
            'Done !',
            {
              timeOut: 5000,
              positionClass: 'toast-bottom-left'
            }
          );

          this.router.navigate(['/users']);
        })
      );
    },
    { dispatch: false }
  );

  changePasswordFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.changePasswordFailure),
        tap(({ error }) => {
          this.toastr.error(error.message, 'Failed to change password', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });
        })
      );
    },
    { dispatch: false }
  );
}

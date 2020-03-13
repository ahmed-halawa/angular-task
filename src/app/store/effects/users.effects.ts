import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions/users.actions';
import * as fromServices from '../../services';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: fromServices.UsersService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map(users => fromActions.loadUsersSuccess({ users })),
          catchError(error => of(fromActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteUser),
      switchMap(({ id }) =>
        this.usersService.deleteUser(id).pipe(
          map(({ id }) => fromActions.deleteUserSuccess({ id })),
          catchError(error => of(fromActions.deleteUserFailure({ error })))
        )
      )
    )
  );
}

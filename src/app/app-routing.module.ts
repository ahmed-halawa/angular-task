import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.module').then(module => module.AuthModule),
    canActivate: [fromGuards.CloseAuthGuardService]
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./views/users/users.module').then(module => module.UsersModule),
    canActivate: [fromGuards.AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import * as fromServices from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: fromServices.AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}

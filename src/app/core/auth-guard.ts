import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {

const router = inject(Router);
const auth = inject(AuthService);

  return auth.isLoggedIn()
  ? true
  : router.createUrlTree(['/login']);
};

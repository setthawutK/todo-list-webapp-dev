import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSessionService } from '@shared/services/session/auth-session.service';

export const loginGuard: CanActivateFn = () => {
  const authSessionService: AuthSessionService = inject(AuthSessionService);
  const router: Router = inject(Router);
  if (!authSessionService.getAccessToken()) return true;
  return router.navigate(['info']);
};

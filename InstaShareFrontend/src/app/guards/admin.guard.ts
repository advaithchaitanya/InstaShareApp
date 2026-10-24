import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MainService } from '../Services/main.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const myService = inject(MainService);

  const roles = myService.getRoles();
const adminRoles = ['ROLE_ADMIN', 'ROLE_OWNER'];

return roles.some((role:any) => adminRoles.includes(role));
};

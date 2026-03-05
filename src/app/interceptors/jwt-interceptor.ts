import { HttpInterceptorFn, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError,switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService); // inject service
  const token = authService.getToken();

  //clone request and add auth header if token exists
  const authReq = token
  ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })
  :req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Call the injected service, not the class
        return authService.refreshToken().pipe(
          switchMap((newToken: string) => {
            const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
            return next(newReq);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RefreshService } from './refresh.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: RefreshService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token && shouldApplyInterceptor(request)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          const refreshToken = this.tokenService.getRefreshToken();
          return this.tokenService.refreshToken(refreshToken).pipe(
            switchMap(newToken => {
              this.tokenService.setToken(newToken.access);
              // Retry the request with the new token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.access}`
                }
              });
              return next.handle(newRequest);
            }),
            catchError(refreshError => {
              // Handle the refresh token error
              console.error('Refresh token error:', refreshError);
              // You can choose to rethrow the error or handle it differently
              return throwError(refreshError);
            })
          );
        } else {
          // Handle other errors
          console.error('Request error:', error);
          // You can choose to rethrow the error or handle it differently
          return throwError(error);
        }
      })
    );
  }
}

function shouldApplyInterceptor(request: HttpRequest<any>): boolean {
  // Exclude URLs where the bearer token should not be added
  if (request.url.includes('http://localhost:8000/api/auth/login/')) {
    return false; // Ignore applying the interceptor for this URL
  }
  if (request.url.includes('http://localhost:8000/api/post/')) {
    return false; // Ignore applying the interceptor for this URL
  }

  return true; // Apply the interceptor for all other URLs
}

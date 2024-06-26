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
          return this.tokenService.refreshToken().pipe(
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
  if (request.url.includes('http://localhost:8000/api/auth/login/')) {
    return false; 
  }
  if (request.url.includes('http://localhost:8000/api/post/')) {
    return false; 
  }
  if (request.url.includes('http://localhost:8000/api/user/by_slug/<slug:slug>/')) {
    return false; 
  }
  if (request.url.includes('http://localhost:8000/api/user/<slug:pk>/posts/')) {
    return false;
  }

  return true; 
}

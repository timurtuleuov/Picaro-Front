import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from 'rxjs/operators'
import { RefreshService } from "./refresh.service"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: RefreshService) {}
    newToken: any;
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
            this.newToken = this.tokenService.getRefreshToken(localStorage.getItem('refresh'));
            this.tokenService.setToken(this.newToken);
          }
          return throwError(error);
        })
      );
    }
  }
  
  function shouldApplyInterceptor(request: HttpRequest<any>): boolean {
    // Исключите URL, к которому не нужно добавлять Bearer токен
    if (request.url.includes('http://localhost:8000/api/auth/login')) {
      return false; // Игнорируйте применение интерсептора для этого URL
    }
    if (request.url.includes('http://localhost:8000/api/post/')) {
      return false; // Игнорируйте применение интерсептора для этого URL
    }
    
    return true; // Применяйте интерсептор для всех остальных URL
  }
  
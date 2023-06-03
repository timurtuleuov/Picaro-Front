import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from 'rxjs/operators'
import { RefreshService } from "./refresh.service"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: RefreshService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.tokenService.getToken();
      
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
  
      return next.handle(request).pipe(
        catchError(error => {
          if (error.status === 401) {
            // Вызов метода обновления токена
            // refreshAccessToken().subscribe(...)
          }
          return throwError(error);
        })
      );
    }
  }
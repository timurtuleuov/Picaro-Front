import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  constructor(private http: HttpClient) { }
  tokenKey: string | any = localStorage.getItem('access');
  refreshKey: string | any;
  getToken(): string | null {
    return localStorage.getItem('access');
  }

  setToken(token: string | any): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  getRefreshToken(): string | any {
    return localStorage.getItem('refresh')
  }
  refreshToken(): Observable<any> {
    this.refreshKey = this.getRefreshToken(); 
    return this.http.post('http://localhost:8000/api/auth/refresh/', {refresh: this.refreshKey}).pipe(
      tap((response) => {
        return this.setToken(response);
      })
    )
  }
  
}

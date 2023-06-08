import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  constructor(private http: HttpClient) { }
  private tokenKey: string | any = localStorage.getItem('access');
  
  getToken(): string | null {
    return localStorage.getItem('access');
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh')
  }
  refreshToken(refreshKey: string | null) {
    return this.http.post('http://localhost:8000/api/auth/refresh', {refresh: refreshKey}) as Observable<any>
  }
  
}

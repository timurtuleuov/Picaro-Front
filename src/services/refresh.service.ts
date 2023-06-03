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
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getRefreshToken(refreshKey: string | null) {
    return this.http.post('http://localhost:8000/api/auth/refresh', {refreshKey}) as Observable<any>
  }
  
}

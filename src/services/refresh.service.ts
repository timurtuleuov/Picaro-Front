import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private tokenKey = 'access';
  private tokenData = localStorage.getItem('data')
  // getToken(): string | null {
  //   return localStorage.get
  // }
  constructor() { }
}

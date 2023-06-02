import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:8000/api/auth/login/', {email, password}) as Observable<any>;
  }

  signup(email: string, username: string, firstName:string, lastName: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:8000/api/auth/register/', {"email": email, "username":username, "first_name": firstName, "last_name":lastName, "password": password}) as Observable<any>;
  }

  
}

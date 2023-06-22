import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(slug_name: string): Observable<User> {
    const url = `http://localhost:8000/api/user/by_slug/${slug_name}/`
    return this.http.get<User>(url);
  }
}

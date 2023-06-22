import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // getUserInfo(slug_name: string){
  //   const url = `http://localhost:8000/api/user/by_slug/${slug_name}/`
  //   this.http.get<User>(url);
  // }
}

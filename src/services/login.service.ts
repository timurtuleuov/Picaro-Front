import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  public login(user: any) {
    this.http.post('http://localhost:8000/api/auth/login/', JSON.stringify(user)).subscribe(
      data => {
        console.log(data);
      },
      err => {
       console.log(err['error']);
      }
    );
  }

  
}

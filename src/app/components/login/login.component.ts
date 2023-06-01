import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user = {
    "email": "timmmur123@gmail.com",
    "password": "123456789"
    }
  constructor(private loginService: LoginService) {}

}

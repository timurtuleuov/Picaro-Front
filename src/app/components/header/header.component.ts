import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    username: any;
    constructor(public loginService: LoginService){}
    ngOnInit(): void {
      this.username = localStorage.getItem('username')
    }
    

}

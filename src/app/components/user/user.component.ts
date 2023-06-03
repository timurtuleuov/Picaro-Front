import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userInfo: any;
  constructor(private loginService: LoginService){
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
  }

  username!: string;
  userBio!: string;
  userPosts!: object;
  ngOnInit(){
    console.log(this.userInfo)
    this.username = this.userInfo.username;
    this.userBio = this.userInfo.bio;
    
  }
}

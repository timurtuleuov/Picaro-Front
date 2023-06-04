import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import * as slug from 'slug'
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    slug_name!: string;
    isLogged: any;

    userUnparse: any;
    user: any;
    username: any;


    constructor(public loginService: LoginService, private router: Router){}
    ngOnInit(): void {
      this.checkLocalStorage();
      console.log(this.userUnparse)
    }
    slugIt(username: string){
      this.slug_name = slug(username)
     this.router.navigate(['/user', this.slug_name])
    }
   
    
    // username = this.user.username;
    checkLocalStorage(): void {
      if (localStorage.getItem('acces') === null) {
        this.isLogged = false;
      } else {
        this.userUnparse = localStorage.getItem('acces');
    console.log(this.userUnparse);
    this.user = JSON.parse(this.userUnparse);
    console.log(this.user);

    this.username = this.user.username;
    console.log(this.username);

    this.isLogged = true;
      }
    }
    
    

}

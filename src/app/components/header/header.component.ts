import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  slug!: string;


  isLogged: any;

  userUnparse: any;
  user: any;
  username: any;


  constructor(public loginService: LoginService, private router: Router){}
  ngOnInit(): void {
    this.checkLocalStorage();
  }
  slugIt(){
    
     this.router.navigate(['/user', this.slug])
    }
   
    
    // username = this.user.username;
    checkLocalStorage(): void {
      if (localStorage === null) {
        this.isLogged = false;
      } else {
        this.userUnparse = localStorage.getItem('user');
        this.user = JSON.parse(this.userUnparse);
        this.username = this.user.username;
        this.slug = this.user.slug;
        
        this.isLogged = true;
      }
    }
    
    

}

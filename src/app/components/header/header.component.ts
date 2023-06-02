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
  
    constructor(public loginService: LoginService, private router: Router){}
    ngOnInit(): void {
    }
    slugIt(username: string){
      this.slug_name = slug(username)
     this.router.navigate(['/user'], this.slug_name)
    }

}

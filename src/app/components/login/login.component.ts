import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  loginGroup!: FormGroup;
  signupGroup!: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.buildLoginForm();
    console.log(this.buildLoginForm())
    this.buildSignupForm();
  }

  buildLoginForm() {
    this.loginGroup = new FormGroup({
      'loginEmail': new FormControl('', [Validators.required, Validators.email]),
      'loginPassword': new FormControl('', Validators.required)
    });
  }

  onLogin():void{
    console.log(this.loginGroup.value.loginEmail, this.loginGroup.value.loginPassword)
    this.loginService.login(this.loginGroup.value.loginEmail, this.loginGroup.value.loginPassword).subscribe(
      response => {
        this.loginService.user = response.user.username;
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            let value = response[key];
    
            if (typeof value === 'object') {
              value = JSON.stringify(value);
            }
            // Сохранение каждой пары ключ-значение в localStorage
            localStorage.setItem(key, value);
          }
        }

        this.loginService.isLoged = true;
        this.router.navigate(['/'])
      },
      error => {
        console.error(error);
      }
    );
  }

  buildSignupForm(){
    this.signupGroup = new FormGroup({
      'signupEmail': new FormControl('', [Validators.required, Validators.email]),
      'signupUsername': new FormControl('', Validators.required),
      'signupFName': new FormControl('', Validators.required),
      'signupLName': new FormControl('', Validators.required),
      'signupPassword': new FormControl('', Validators.required)
    });
  }

  onSignup():void{
    this.loginService.signup(this.signupGroup.value.signupEmail, this.signupGroup.value.signupUsername, 
      this.signupGroup.value.signupFName, this.signupGroup.value.signupLName, this.signupGroup.value.signupPassword)
      .subscribe(
      response => {
        
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            let value = response[key];
    
            if (typeof value === 'object') {
              value = JSON.stringify(value);
            }
            // Сохранение каждой пары ключ-значение в localStorage
            localStorage.setItem(key, value);
          }
        }
        this.loginService.isLoged = true;
        this.router.navigate(['/'])
        console.log(this.loginService.isLoged)
      },
      error => {
        console.error(error);
      }
    );
  }
}
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
  // user = {
  //   "email": "timmmur123@gmail.com",
  //   "password": "123456789"
  //   }
  loginGroup!: FormGroup;
  signupGroup!: FormGroup;

  
  
  constructor(private loginService: LoginService, private router: Router) {
    
  }
  ngOnInit() {
    // this.loginService.login(this.user);
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
        console.log(this.loginService.user)
        localStorage.setItem('data', JSON.stringify(response));
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
        
        // Handle the response data here
        console.log(response);
        localStorage.setItem('data', JSON.stringify(response));
        this.loginService.isLoged = true;
        console.log(this.loginService.isLoged)

      },
      error => {
        console.error(error);
      }
    );
  }
}
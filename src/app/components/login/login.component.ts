import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
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
  email = "";
  password = "";
  
  
  constructor(private loginService: LoginService) {
    
  }
  ngOnInit() {
    // this.loginService.login(this.user);
    this.buildForm();
    console.log(this.buildForm())
  }
  buildForm() {
    this.loginGroup = new FormGroup({
      'loginEmail': new FormControl('', [Validators.required, Validators.email]),
      'loginPassword': new FormControl('', Validators.required)
    });
  }
  onLogin():void{
    console.log(this.loginGroup.value.loginEmail, this.loginGroup.value.loginPassword)
  }
}

import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: AuthserviceService
  ) { }

  ngOnInit(): void {
  }

  loginModel = new Login('', '');

  showSpinner = false;
  login(){
    this.loginService.postLogin(this.loginModel).subscribe(result =>{
      console.log(result);
    });
  }

}

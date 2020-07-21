import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthserviceService } from '../authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: AuthserviceService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  loginModel = new Login('', '');

  showSpinner = false;
  login(){
    this.loginService.postLogin(this.loginModel).subscribe(result =>{
      if (result.status=="AUTHORIZED" && result.role=="doctor"){
        localStorage.setItem("authID", result.ID);
        this.router.navigate([`/reminders`]);
      }else{
        this._snackBar.open('Login failed: Wrong Username or Password', 'dismiss', {
          duration:3000
        });
      }
    });
  }

}

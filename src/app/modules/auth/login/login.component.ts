import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
    ]),       
    password: new FormControl('', [
      Validators.required,
    ]),
  });
  currentLang:any;
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('currentLang');
  }

  onSubmit(){
    if(!this.loginForm.valid)
        return;
   console.log(this.loginForm.value);
   this.login();
  }

  login(){
    this.authService.login(this.loginForm.value);
    this.sharedService.reload(this.router.url);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/core/services/lang.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({});
  currentLang:any;
  subscription: Subscription | undefined;
  constructor(
    private authService: AuthService,
    private langService: LangService
    ) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('currentLang');
    //this.subscription = this.langService.currentLang.subscribe(lang => this.currentLang = lang)
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
      ]),       
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onSubmit(){
    if(!this.loginForm.valid)
        return;
   console.log(this.loginForm.value);
   this.login();
  }

  login(){
    this.authService.login(this.loginForm.value);
  }
}

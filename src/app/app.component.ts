import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { SharedService } from './core/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Jordan Academy';
  isArabic= false;
  textDirection : string | undefined;
  textAlign: string | undefined;
  currentLang: string ;
  firstNameEn: string | undefined;
  lastNameEn: string | undefined;
  firstNameAr: string | undefined;
  lastNameAr: string | undefined;
  constructor(
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService,
    public sharedService: SharedService
    ){
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
    this.setTextDirection(this.currentLang);
    this.setFullUserName();
  }

  setCurrentLang(nextLang: string){
    this.translate.use(nextLang);
    localStorage.setItem('currentLang', nextLang);
    this.setTextDirection(nextLang)
    this.sharedService.reload(this.router.url);
  }

  setTextDirection(currentLang: string){
    if(currentLang == 'ar')
    { this.isArabic = true;
      this.textDirection= 'rtl';
      this.textAlign= 'right'
    }
    else
    { this.isArabic = false;
      this.textDirection= 'ltr';
      this.textAlign= 'left'
    }
  }

  logout(){
    this.authService.logout();
  }

  setFullUserName(){
    let user: any = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      this.firstNameEn = user.First_Name_En;
      this.lastNameEn = user.Last_Name_En;
      this.firstNameAr = user.First_Name_Ar;
      this.lastNameAr = user.Last_Name_Ar;
    }
  }

  getCurrentLang(){
    if(localStorage.getItem('currentLang'))
      return localStorage.getItem('currentLang');
    return 'en';
  }

}

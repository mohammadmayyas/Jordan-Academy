import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser = this.sharedService.currentUser;
  //currentUser: any = JSON.stringify({ ...this.user })
  @Output() updateLang= new EventEmitter<string>();
  currentLang: string ;
  firstNameEn: string = '';
  lastNameEn: string = '';
  firstNameAr: string = '';
  lastNameAr: string = '';
  userImagePath: string = '';
  apiRoot = env.apiRoot;
  userId: number = 0;
  roles: any[] = [];


  constructor(
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService,
    public sharedService: SharedService,
    ) { 
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {
    this.setFullUserName();
    this.getUserId();
    this.getUserRoles();
    console.log(this.roles);
  }

  setCurrentLang(nextLang: string){
    this.translate.use(nextLang);
    localStorage.setItem('currentLang', nextLang);
    //this.setTextDirection(nextLang)
    this.sharedService.reload(this.router.url);
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
      this.userImagePath = user.User_Image_Path;
    }
  }

  getCurrentLang(){
    if(localStorage.getItem('currentLang'))
      return localStorage.getItem('currentLang');
    return 'en';
  }

  getUserId(){
    let user: any= localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      this.userId= user.User_Id;
    }
  }

  getUserRoles(){
    let user: any= localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      this.roles= user.Roles;
    }
  }
}

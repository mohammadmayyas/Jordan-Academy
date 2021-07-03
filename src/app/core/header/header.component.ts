import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { environment as env } from 'src/environments/environment';
import { Permission } from '../enums/permission';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser = this.sharedService.currentUser;
  
  @Output() updateLang= new EventEmitter<string>();
  currentLang: string ;
  apiRoot = env.apiRoot;
  userId: number = 0;
  roles: any[] = [];
  permission = Permission;

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
    this.getUserId();
  }

  setCurrentLang(nextLang: string){
    this.translate.use(nextLang);
    localStorage.setItem('currentLang', nextLang);
    this.sharedService.reload(this.router.url);
  }

  logout(){
    this.authService.logout();
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

}

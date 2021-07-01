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
  // sidenavWidth = 4;
  // ngStyle: string = '';

  isMenuOpen = true;
  contentMargin = 240;

  task: string[] = [
    'Clearning out my closet', 'Take out trash bins', 'Wash car', 'Tank up the motorcycles', 'Go for flight training'
  ]
  constructor(
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService,
    public sharedService: SharedService
    ){}

    ngOnInit(): void {
      let user: any = localStorage.getItem('user');
      if(user){
      user = JSON.parse(user);
      this.sharedService.currentUser.next(user);
      }
    }




}

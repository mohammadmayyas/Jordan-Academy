import { Component } from '@angular/core';
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

  constructor(
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

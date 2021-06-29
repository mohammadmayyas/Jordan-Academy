import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })
  
  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendResetPasswordLinkToEmail(){
    this.userService.sendResetPasswordLinkToEmail(this.emailForm.value);
    console.log(this.emailForm.value);
    this.sharedService.reload(this.router.url);
  }

}

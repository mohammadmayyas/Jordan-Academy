import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export class NewPassword{
  newPassword: string;
  constructor(newPassword: string){
    this.newPassword = newPassword;
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm = new FormGroup({    
    newPassword: new FormControl('', [
      Validators.required,
    ]),
    newPasswordConfirmed: new FormControl('', [
      Validators.required,
    ])
  });
  userId: string = '';
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
  }

  forgotPassword(){
    let newPassword= new NewPassword(this.forgotPasswordForm.controls.newPassword.value );
    this.userService.forgotPassword(this.userId, newPassword);
  }

}

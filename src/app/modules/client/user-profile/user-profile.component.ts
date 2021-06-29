import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userId: string= '';
  user: any;
  userImagePath: string= '';
  currentLang: string = '';
  userForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5), 
      Validators.maxLength(50)
    ]),       
    firstNameEn: new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(25)
    ]),
    lastNameEn: new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(25)
    ]),
    firstNameAr: new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(25)
    ]),
    lastNameAr: new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(25)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
      Validators.minLength(10), 
      Validators.maxLength(13)
    ]),
    gender: new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(10)
    ]),
    dateOfBirth: new FormControl('', [
      // Validators.required,
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(25)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5), 
      Validators.maxLength(200)
    ])
  });

  resetPasswordForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required
    ]),       
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8), 
      Validators.maxLength(200)
    ]),
    confirmedPassword: new FormControl('', [
      Validators.required,
    ])
  });
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.getAllUserInfoById();
 
  }

  getAllUserInfoById(){
    this.userService.getAllUserInfoById(this.userId).subscribe((res: any) => {
      if(res)
        this.user = res;
        this.userForm.controls.userName.setValue(this.user.userName);
        this.userForm.controls.firstNameEn.setValue(this.user.firstNameEn);
        this.userForm.controls.lastNameEn.setValue(this.user.lastNameEn);
        this.userForm.controls.firstNameAr.setValue(this.user.firstNameAr);
        this.userForm.controls.lastNameAr.setValue(this.user.lastNameAr);
        this.userForm.controls.email.setValue(this.user.email);
        this.userForm.controls.phoneNumber.setValue(this.user.phoneNumber);
        this.userForm.controls.gender.setValue(this.user.gender);
        this.userForm.controls.dateOfBirth.setValue(this.user.dateOfBirth);
        this.userForm.controls.city.setValue(this.user.city);
        this.userForm.controls.address.setValue(this.user.address);
        this.userImagePath = this.user.userImagePath;
    }, err => {
      this.toaster.error("Somthing went wrong");
    })
  }

  resetPassword(){
    this.spinner.show();
    this.userService.resetPassword(this.userId, this.resetPasswordForm.value).subscribe(res => {
      this.spinner.hide();
    },err =>{
      this.spinner.hide();
      this.toaster.error("Somthing went wrong");
    });;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { DatePipe } from '@angular/common'
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({});
  isPasswordConfirmMatch: boolean = false;
  textAlign: string | undefined;
  lang: string | undefined;
  imageSrc: string| undefined;
  currentLang = localStorage.getItem('currentLang');
  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    public datepipe: DatePipe,
    public sharedService: SharedService
    ) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('currentLang');
    console.log(this.currentLang);
    this.registerForm = new FormGroup({
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
      gender: new FormControl('Male', [
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
      ]),
      userImage: new FormControl('', []),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(200)
      ]),
    })
  }

  
  onSubmit(){
    if(!this.registerForm.valid)
         return;
   console.log(this.registerForm.value);
   this.register();
  }

  register(){
    const formData: FormData = new FormData();
    let dateTimeOfBirth = this.registerForm.controls.dateOfBirth.value;
    let dateOfBirth =this.datepipe.transform(dateTimeOfBirth, 'yyyy-MM-dd');
    formData.append('userImage', this.registerForm.controls.userImage.value);
    formData.append('userName', this.registerForm.controls.userName.value);
    formData.append('firstNameEn', this.registerForm.controls.firstNameEn.value);
    formData.append('lastNameEn', this.registerForm.controls.lastNameEn.value);
    formData.append('firstNameAr', this.registerForm.controls.firstNameAr.value);
    formData.append('lastNameAr', this.registerForm.controls.lastNameAr.value);
    formData.append('email', this.registerForm.controls.email.value);
    formData.append('gender', this.registerForm.controls.gender.value);
    formData.append('dateOfBirth', `${dateOfBirth}`);
    formData.append('phoneNumber', this.registerForm.controls.phoneNumber.value);
    formData.append('city', this.registerForm.controls.city.value);
    formData.append('address', this.registerForm.controls.address.value);
    formData.append('password', this.registerForm.controls.password.value);
    this.authService.register(formData);
  }

  
  langUpdated(lang: string){
    this.lang = lang;
    if(lang == 'ar')
      this.textAlign= 'right'
    else
      this.textAlign= 'left'
  }

  onFileChange(event: any) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.registerForm.patchValue({

          fileSource: reader.result

        });
      };
    }
  }

}

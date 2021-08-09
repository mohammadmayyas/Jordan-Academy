import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  
  getAllUsers(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUsers`);
  }

  getFullUserNameById(userId: number){
    return this.http.get(`${env.apiRoot}/api/User/GetFullUserNameById/${userId}`);
  }

  enrollToCourseRequest(data: any){
    return this.http.post(`${env.apiRoot}/api/User/AddEnrollToCourseRequest`, data,{ responseType: 'text' });
  }

  getAllUserEnrollments(userId: number){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUserCourses/${userId}`);
  }

  getUserCourseInfoByIds(data: any){
    return this.http.post(`${env.apiRoot}/api/User/GetUserEnrolledCourseInfoByIds`, data);
  }

  addCertificateRequest(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/User/AddCertificateRequest`, data).subscribe(res => {
      this.spinner.hide();
    },err =>{
      this.spinner.hide();
    });
  }

  resetPassword(userId: string, data: any){
    return this.http.put(`${env.apiRoot}/api/Account/ResetPassword/${userId}`, data,{ responseType: 'text'});
  }

  forgotPassword(userId: string, data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Account/ForgotPassword/${userId}`, data,{ responseType: 'text'}).subscribe(any => {
      this.spinner.hide();
      this.toastr.success("Your password changed successfully");
      this.router.navigate(['./auth/login'])
    }, err => {
      this.spinner.hide();
      this.toastr.error("Something went wrong!");
    });
  }

  sendResetPasswordLinkToEmail(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/sendResetPasswordLinkToEmail`, data).subscribe(any => {
      this.spinner.hide();
      this.toastr.success("Password reset link sent to your email")
    }, err => {
      this.spinner.hide();
      this.toastr.error("Email not exist");
    });
  }

  getAllUserInfoById(userId: string){
    return this.http.get(`${env.apiRoot}/api/User/UserInfo/${userId}`);
  }

  getAllUserCourses(userId: number){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUserCourses/${userId}`);
  }

  updateUserImageById(userId: string ,userImage: any){
    return this.http.post(`${env.apiRoot}/api/User/UpdateUserImageById/${userId}`, userImage,{ responseType: 'text' });
  }

  updateUserIInfoById(userId: string ,data: any){
    return this.http.post(`${env.apiRoot}/api/User/UpdateUserInfoById/${userId}`, data,{ responseType: 'text' });
  }

}

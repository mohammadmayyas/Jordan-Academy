import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  
  getAllUsers(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUsers`);
  }

  getAllUsersWithRoles(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUsers`);
  }

  updateUserRoles(userRoles: any[]){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/User/UpdateUserRoles`, userRoles).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  deleteUser(userId: number){
    return this.http.delete(`${env.apiRoot}/api/User/${userId}`).subscribe(res => {
      console.log(res);
    },err =>{

    });
  }

  responsForEnrollToCourseRequest(data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/User/ResponseForEnrollToCourseRequest`, data).subscribe(res => {
      this.spinner.hide();
    },err =>{
      this.spinner.hide();
    });
  }

  ResponseForGetCertificateRequest(data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/User/ResponseForGetCertificateRequest`, data).subscribe(res => {
      this.spinner.hide();
    },err =>{
      this.spinner.hide();
    });
  }

  enrollToCourseRequest(data: any){
    return this.http.post(`${env.apiRoot}/api/User/AddEnrollToCourseRequest`, data);
  }

  getAllTrainers(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllTrainers`);
  }

  getAllTrainers2(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllTrainers`);
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
    return this.http.put(`${env.apiRoot}/api/Account/ResetPassword/${userId}`, data);
  }

  forgotPassword(userId: string, data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Account/ForgotPassword/${userId}`, data).subscribe(any => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  sendResetPasswordLinkToEmail(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/sendResetPasswordLinkToEmail`, data).subscribe(any => {
      this.spinner.hide();
      this.toastr.success("We sent the password reset link to youre email")
    }, err => {
      this.spinner.hide();
      this.toastr.error("Email not exist");
    });
  }

  getAllUserInfoById(userId: string){
    return this.http.get(`${env.apiRoot}/api/User/UserInfo/${userId}`);
  }
}

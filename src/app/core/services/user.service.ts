import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User} from 'src/app/core/interfaces/user';

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
}

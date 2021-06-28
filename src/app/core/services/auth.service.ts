import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) { }

  login(user: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/Login`, user,{ responseType: 'text' }).subscribe(res => {
      this.spinner.hide();
      this.router.navigate([''])

      const data: any = jwt_decode(res);
      localStorage.setItem('user', JSON.stringify({ ...data }));
      localStorage.setItem('token', res)
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error)
      console.log(err);
    })
  }

  register(user: any){
    
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/Register`, user,{
        responseType: 'text' }).subscribe((res: any) => {
      console.log(res);
      this.spinner.hide();
      this.router.navigate(['auth/login'])
      this.toastr.success('Registerd successfully');
    },err =>{
      this.spinner.hide();
      console.log(err);
      this.toastr.error(err.error)
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["public/home"]);
  }

  isLoggedIn(){
    return localStorage.getItem('token');
  }
}

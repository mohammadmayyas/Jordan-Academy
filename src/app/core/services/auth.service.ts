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

  clearTimeout: any;
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
      this.redirectUser(data);
      localStorage.setItem('user', JSON.stringify({ ...data }));
      localStorage.setItem('token', res);
      
      let user = JSON.parse(localStorage.getItem('user')!);
      this.autoLogout(user.exp * 1000 - new Date().getTime());
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error)
    })
  }

  register(user: any){
    
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/Register`, user,{
        responseType: 'text' }).subscribe((res: any) => {
      this.spinner.hide();
      this.router.navigate(['auth/login'])
      this.toastr.success('Registerd successfully');
    },err =>{
      this.spinner.hide();
      this.toastr.error(err.error)
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(["public/home"]);
    if(this.clearTimeout)
      clearTimeout(this.clearTimeout);
  }

  isLoggedIn(){
    return localStorage.getItem('token');
  }

  autoLogout(expirationDate: number){
    this.clearTimeout=  setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  redirectUser(user: any){
    if(user.Roles.includes("Admin")){
      this.router.navigate(["dashboard/home"]);
    }
  }

}

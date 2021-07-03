import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  addTestimonial(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Testimonial`, data, {responseType: 'text'}).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.success('Thank you for intresting, your testimonial pending to approved by admin.');
    }, err => {
      this.spinner.hide();
      this.toastr.error('Somthing went wrong');
    });
  }

  getAllAllowedTestimonials(){
    return this.http.get(`${env.apiRoot}/api/Testimonial/GetAllAllowedTestimonials`);
  }
}

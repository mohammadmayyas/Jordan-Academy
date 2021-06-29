import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestimonialService } from 'src/app/core/services/testimonial.service';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { environment as env } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  stars = Array(5);
  testimonialsList: any[]= [];
  apiRoot: string = env.apiRoot;
  constructor(
    private dialog: MatDialog,
    private testimonialService: TestimonialService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllAllowedTestimonials();
  }

  isLoggedIn(){
    if(this.sharedService.isLoggedIn())
      this.openDialog()
    else{
      this.toaster.warning("Please login with your account");
      this.router.navigate(["../auth/login"]);
    }
      
  }

  openDialog(){
    this.dialog.open(AddTestimonialComponent);
  }

  getAllAllowedTestimonials(){
    this.spinner.show();
    this.testimonialService.getAllAllowedTestimonials().subscribe((res: any) => {
      this.testimonialsList= res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    })
  }

}

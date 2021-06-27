import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestimonialService } from 'src/app/core/services/testimonial.service';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { environment as env } from 'src/environments/environment';

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
    private testimonialService: TestimonialService
  ) { }

  ngOnInit(): void {
    this.getAllAllowedTestimonials();
  }

  openDialog(){
    this.dialog.open(AddTestimonialComponent);
  }

  getAllAllowedTestimonials(){
    this.testimonialService.getAllAllowedTestimonials().subscribe((res: any) => {
      this.testimonialsList= res;
      console.log(this.testimonialsList);
    }, err => {

    })
  }

}

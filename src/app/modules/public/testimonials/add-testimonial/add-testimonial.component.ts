import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { TestimonialService } from 'src/app/core/services/testimonial.service';

export class Testimonial{
  comment: string;
  rating: number;
  userId: number;
  constructor(comment: string, rating: number, userId: number){
    this.comment = comment;
    this.rating = rating;
    this.userId = userId
  }
  
}

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {

  testimonialForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(1000)]),
    rating: new FormControl('', [
      Validators.required])
  })
  constructor(
    private testimonalService: TestimonialService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addTestimonial(){
    let user= JSON.parse(localStorage.getItem('user')!);
    let userId= user.User_Id;
    let data = new Testimonial(
      this.testimonialForm.controls.comment.value,
      this.testimonialForm.controls.rating.value,
      userId
    );

    this.testimonalService.addTestimonial(data);
    this.sharedService.reload(this.router.url);
    
  }

}

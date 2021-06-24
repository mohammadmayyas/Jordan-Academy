import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseService } from 'src/app/core/services/course.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-course-detials',
  templateUrl: './course-detials.component.html',
  styleUrls: ['./course-detials.component.scss']
})
export class CourseDetialsComponent implements OnInit{

  courseId: string = "N/A";
  course: any;
  apiRoot: string = env.apiRoot;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.getCourseInfo(this.courseId);
    console.log(this.course);
  }
  
  getCourseInfo(courseId: string){
    this.spinner.show();
    this.courseService.getCourseInfo(courseId).subscribe((res: any) => {
      this.course = res;
      console.log(this.course);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

}

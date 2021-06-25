import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment as env } from 'src/environments/environment';

export class EnrollToCourse{
  userId: number;
  courseId: number;
  constructor(userId: number, courseId: number){
    this.userId = userId;
    this.courseId = courseId;
  }
}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  courseId: string = '';
  course: any;
  apiRoot= env.apiRoot;
  enrollRequest: any;
  enrollsRequestsList: any[] = [];
  isDisabled: boolean= false;
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private courseService: CourseService,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.getCourseInfo(this.courseId);
    this.getAllPendingEnrollRequests();

  }

  getCourseInfo(courseId: string){
    this.spinner.show();
    this.courseService.getCourseInfo(courseId).subscribe((res: any) => {
      this.course = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  enrollToCourseRequest(){
    if(localStorage.getItem('token')){
      let user = JSON.parse(localStorage.getItem('user')!);
      let userId = user.User_Id;
      this.enrollRequest = new EnrollToCourse(userId, this.course.courseId);

      this.spinner.show();
      this.userService.enrollToCourseRequest(this.enrollRequest).subscribe(res => {
      this.spinner.hide();
      this.sharedService.reload(this.router.url);
      },err =>{
        this.spinner.hide();
      });
    } 
    else{
      this.router.navigate(['auth/login']);
    }
  }

  getAllPendingEnrollRequests(){
    this.courseService.getAllPendingEnrollRequests().subscribe((res: any) => {
      this.enrollsRequestsList= res;
      console.log(this.enrollsRequestsList)
      this.checkIfUserEnrolledToCourse();
    }, err => {

    });
  }

  checkIfUserEnrolledToCourse(){
    let user= JSON.parse(localStorage.getItem('user')!);
    let userId= user.User_Id;
    this.enrollsRequestsList.forEach((element: any) => {
      if(element.courseId == this.courseId && element.userId == userId){
        this.isDisabled= true;
      }
    });
  }

}

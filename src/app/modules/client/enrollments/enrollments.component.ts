import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {

  enrollmentsList: any[] = [];
  apiRoot: string= env.apiRoot;
  constructor(
    public sharedService: SharedService,
    private courseService: CourseService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllUserEnrollments();
  }

  getAllUserEnrollments(){
    let user= JSON.parse(localStorage.getItem('user')!);
    let userId= user.User_Id;
    this.userService.getAllUserEnrollments(userId).subscribe((res: any) => {
      this.enrollmentsList= res
      console.log(this.enrollmentsList)
    }, err => {

    })
  }

}

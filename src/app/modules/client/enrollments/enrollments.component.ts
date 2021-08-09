import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllUserEnrollments();
  }

  getAllUserEnrollments(){
    let user: any = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      let userId= user.User_Id;
      this.spinner.show();
      this.userService.getAllUserEnrollments(userId).subscribe((res: any) => {
        this.enrollmentsList= res
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toaster.error("Something went wrong");
      });
    }
  }

}

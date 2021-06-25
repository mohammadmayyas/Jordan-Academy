import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment as env } from 'src/environments/environment';

export class UserCourseIds{
  userId: string;
  courseId: string;
  constructor(userId: string, courseId: string){
    this.userId = userId;
    this.courseId = courseId
  }
}

export class CertificateRequest{
  courseName: string;
  traineeFullName: string;
  userName: string;
  constructor(traineeFullName: string, courseName: string, userName: string){
    this.traineeFullName = traineeFullName;
    this.courseName = courseName;
    this.userName = userName;
  }
}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  courseId: string= '';
  isDisabled: boolean= true;
  userCourseInfo: any;
  apiRoot: string = env.apiRoot;
  isRequestSent: boolean= false;
  certificateRequests: any[]= [];
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private courseService: CourseService,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService,
    private certificateService: CertificateService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.getUserCourseInfoByIds();
  }

  getUserCourseInfoByIds(){
    let user= JSON.parse(localStorage.getItem('user')!);
    let userId= user.User_Id;
    let data = new UserCourseIds(userId, this.courseId);

    this.userService.getUserCourseInfoByIds(data).subscribe((res: any) => {
      this.userCourseInfo = res;
      console.log(this.userCourseInfo);
      this.checkIfUserCanSendCertificateRequest();
      this.checkIfUserAlreadySentCertificateRequest();
    }, err => {

    })
  }

  addCertificateRequest(){
    let user= JSON.parse(localStorage.getItem('user')!);
    let traineeName: string = user.First_Name_En + " " + user.Last_Name_En;
    let userName= user.User_Name;
    let data = new CertificateRequest(traineeName, this.userCourseInfo.courseName, userName);

    this.userService.addCertificateRequest(data);
    this.sharedService.reload(this.router.url);
  }

  checkIfUserCanSendCertificateRequest(){
    let todayDate = moment(new Date()).format('YYYY-MM-DD');
    let courseEndDate = moment(this.userCourseInfo.endDate).format('YYYY-MM-DD');
    if(todayDate >= courseEndDate && this.userCourseInfo.userCourses[0].finalMark >= 50)
      this.isDisabled = false;
  }

  checkIfUserAlreadySentCertificateRequest(){
    let user= JSON.parse(localStorage.getItem('user')!);
    let userName= user.User_Name;
    this.certificateService.getAllCertificatesRequests2().subscribe((res: any) => {
      this.certificateRequests = res;
      let userCertificateRequests = this.certificateRequests.filter(m =>
        (m.userName= userName) && (m.courseName= this.userCourseInfo.courseName));
      if(userCertificateRequests.length > 0){
        this.isRequestSent = true;
        this.isDisabled = true;
      }
        
    }, err => {

    })
  }

}

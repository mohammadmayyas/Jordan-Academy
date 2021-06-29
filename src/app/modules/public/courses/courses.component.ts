import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  coursesList: any[] = [];
  apiRoot = env.apiRoot;
  searchText: any;
  searchStartDate: any;
  searchEndDate: any;
  totalCount: string = '';
  pageCount: string = '';
  userCourses: any[] = [];
  constructor(
    public sharedService: SharedService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    //this.getAllApprovedEnrollRequests();
    this.getAllCourses();
  }

  getAllCourses(){
    this.spinner.show();
    this.courseService.getAllCourses().subscribe((res: any) =>{
        this.coursesList= res;
        this.getAllUserCourses();
        this.sharedService.onCoursesListChange(this.coursesList);
        this.spinner.hide();
        console.log(this.coursesList);
    }, err => {
        this.spinner.hide();
        this.toaster.error("Somthing went wrong..");
    });
  }

  retrieveCourses(){
    let fliterdCoursesList: any;
    this.sharedService.currentCoursesList.subscribe(coursesList => this.coursesList = coursesList);
    let searchStartDateToString= moment(this.searchStartDate).format('YYYY-MM-DD');
    let searchEndDateToString= moment(this.searchEndDate).format('YYYY-MM-DD');

    if(this.searchStartDate && this.searchEndDate)
      fliterdCoursesList = this.coursesList.filter(m => m.startDate >= searchStartDateToString && m.endDate <= searchEndDateToString);
    else if(this.searchStartDate)
      fliterdCoursesList = this.coursesList.filter(m => m.startDate >= searchStartDateToString);
    else if(this.searchEndDate)
      fliterdCoursesList = this.coursesList.filter(m => m.endDate <= searchEndDateToString);
    else{
      this.sharedService.currentCoursesList.subscribe(coursesList => this.coursesList = coursesList);
      return;
    }
      
    this.coursesList= fliterdCoursesList;
  }

  getAllUserCourses(){
    let user: any = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      let userId= user.User_Id;
      this.spinner.show();
      this.userService.getAllUserCourses(userId).subscribe((res: any) =>{
        this.userCourses= res;
        this.spinner.hide();
        console.log(this.userCourses);
        this.filterCoursesListFromUserCourses();
      }, err => {
        this.toaster.error("Somthing went wrong..");
        this.spinner.hide();
      });
    }
    
  }

  filterCoursesListFromUserCourses(){
    if(this.userCourses){
      this.userCourses.forEach((element: any) => {
        this.coursesList.forEach((element2: any, index) => {
          if(element.courseId === element2.courseId){
            this.coursesList.splice(index,1);
          }
        });
      });
    }
  }

}

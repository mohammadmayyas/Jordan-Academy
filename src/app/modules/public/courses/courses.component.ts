import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';

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
  approvedRequests: any[] = [];
  constructor(
    public sharedService: SharedService,
    private courseService: CourseService
    ) { }

  ngOnInit(): void {
    this.getAllApprovedEnrollRequests();
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe((res: any) =>{
        this.coursesList= res;
        console.log(this.coursesList);
        this.checkIfCoursesEnrolled(this.coursesList);
        this.sharedService.onCoursesListChange(this.coursesList);
    }, err => {
  
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

  getAllApprovedEnrollRequests(){
    this.courseService.getAllApprovedEnrollRequests().subscribe((res: any) =>{
      this.approvedRequests= res;
      console.log(this.approvedRequests= res);
  }, err => {

  });
  }

  checkIfCoursesEnrolled(coursesList: any[]){
    let user= JSON.parse(localStorage.getItem('user')!);
    let userId= user.User_Id;
    let userCourses= this.approvedRequests.filter(m => m.userId == userId);
    console.log(coursesList.filter(g => g.courseId != userCourses[0].courseId));
    // userCourses.forEach((element: any) => {
    //   coursesList.forEach((element2: any) => {
    //     if(element.courseId != element2.courseId)
    //       console.log(coursesList);
    //   });
    // });
  }

}

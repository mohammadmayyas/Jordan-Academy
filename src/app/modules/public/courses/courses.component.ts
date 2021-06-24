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
  public searchStartDate: any;
  public searchEndDate: any;
  totalCount: string = '';
  pageCount: string = '';
  constructor(
    public sharedService: SharedService,
    private courseService: CourseService
    ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe((res: any) =>{
        this.coursesList= res;
        this.sharedService.onCoursesListChange(this.coursesList);
    }, err => {
  
    });
  }

  // startDateFilter(){
  //   //const filterValue = (event.target as HTMLInputElement).value;
  //   //let startDate = new Date(filterValue);
  //   //console.log(this.coursesList.filter(m => new Date(m.startDate) >= startDate));
  // }

  // endDateFilter(event: Event){
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   let endDate = new Date(filterValue);
  //   this.coursesList.filter(m => new Date(m.endDate) <= endDate);
  //   console.log(this.coursesList);
  // }

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

}

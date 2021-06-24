import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coursesList: any[] = [];
  apiRoot = env.apiRoot;
  constructor(
    public translate: TranslateService,
    public sharedService: SharedService,
    private courseService: CourseService
    ) { }

  ngOnInit(): void {
    this.getFirstThreeCourses();
  }

  getFirstThreeCourses(){
    this.courseService.getAllCourses().subscribe((res: any) =>{
      for(var i=0; i<3; i++){
        this.coursesList.push(res[i]);
      }
    }, err => {
  
    });
  }

}

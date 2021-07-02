import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCourses(){
    return this.http.get(`${env.apiRoot}/api/Course`);
  }

  getCourseInfo(courseId: string){
    return this.http.post(`${env.apiRoot}/api/Course/GetCourseInfoById/${courseId}`, {});
  }

  getAllPendingEnrollRequests(){
    return this.http.get(`${env.apiRoot}/api/Course/GetAllPendingEnrollRequests`);
  }

  getAllApprovedEnrollRequests(){
    return this.http.get(`${env.apiRoot}/api/Course/GetAllApprovedEnrollRequests`);
  }

  getTraineesAcademyInfoByCourseId(courseId: string){
    return this.http.get(`${env.apiRoot}/api/Course/GetTraineesAcademyInfoByCourseId/${courseId}`);
  }

}

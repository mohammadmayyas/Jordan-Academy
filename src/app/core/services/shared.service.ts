import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private roleIdSource = new BehaviorSubject<number>(0);
  currentRoleId = this.roleIdSource.asObservable();

  private userIdSource = new BehaviorSubject<number>(0);
  currentUserId = this.userIdSource.asObservable();

  private coursesListSource = new BehaviorSubject<any[]>([]);
  currentCoursesList = this.coursesListSource.asObservable();
  textDirection: string;
  textAlign= 'left'
  currentLang: string;
  constructor(private router: Router) {
    this.currentLang = localStorage.getItem('currentLang')!;
    if(this.currentLang == 'ar')
    { //this.isArabic = true;
      this.textDirection= 'rtl';
      this.textAlign= 'right'
      console.log(this.textDirection)
    }
    else
    { //this.isArabic = false;
      this.textDirection= 'ltr';
      this.textAlign= 'left'
      console.log(this.textDirection)
    }
   }

  onRoleIdChange(roleId: number){
    this.roleIdSource.next(roleId);
  }

  onUserIdChange(userId: number){
    this.userIdSource.next(userId);
  }

  onCoursesListChange(coursesList: any[]){
    this.coursesListSource.next(coursesList);
  }

  onLangChange(lang: string){
    if(lang == 'ar')
    { //this.isArabic = true;
      this.textDirection= 'rtl';
      this.textAlign= 'right'
      console.log(this.textDirection)
    }
    else
    { //this.isArabic = false;
      this.textDirection= 'ltr';
      this.textAlign= 'left'
      console.log(this.textDirection)
    }
  }

  
  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}

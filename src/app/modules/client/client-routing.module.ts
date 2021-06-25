import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './enrollments/course-page/course-page.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';

const routes: Routes = [
  {
    path: 'enrollments',
    component: EnrollmentsComponent
  },
  {
    path: 'course-page/:courseId',
    component: CoursePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

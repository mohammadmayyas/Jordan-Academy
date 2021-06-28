import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './enrollments/course-page/course-page.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'enrollments',
    component: EnrollmentsComponent
  },
  {
    path: 'course-page/:courseId',
    component: CoursePageComponent
  },
  {
    path: 'forgot-password/:userId',
    component: ForgotPasswordComponent
  },
  {
    path: 'user-profile/:userId',
    component: UserProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

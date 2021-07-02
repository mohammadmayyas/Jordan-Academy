import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateCoursePageGuard } from 'src/app/core/guards/can-activate-course-page.guard';
import { CanActivateEnrollmentsGuard } from 'src/app/core/guards/can-activate-enrollments.guard';
import { CanActivateProfileGuard } from 'src/app/core/guards/can-activate-profile.guard';
import { CoursePageComponent } from './enrollments/course-page/course-page.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'enrollments',
    component: EnrollmentsComponent,
    canActivate: [CanActivateEnrollmentsGuard]
  },
  {
    path: 'course-page/:courseId',
    component: CoursePageComponent,
    canActivate: [CanActivateCoursePageGuard]
  },
  {
    path: 'forgot-password/:userId',
    component: ForgotPasswordComponent
  },
  {
    path: 'user-profile/:userId',
    component: UserProfileComponent,
    canActivate: [CanActivateProfileGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

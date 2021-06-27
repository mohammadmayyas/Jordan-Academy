import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialsComponent } from '../dashboard/testimonials/testimonials.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { GetCertificatesRequestsComponent } from './certificates/get-certificates-requests/get-certificates-requests.component';
import { CourseDetialsComponent } from './courses/course-detials/course-detials.component';
import { CoursesComponent } from './courses/courses.component';
import { EnrollToCourseRequestsListComponent } from './courses/enroll-to-course-requests-list/enroll-to-course-requests-list.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'permissions',
    component: PermissionsComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'course-details/:courseId',
    component: CourseDetialsComponent
  },
  {
    path: 'enrolls',
    component: EnrollToCourseRequestsListComponent
  },
  {
    path: 'certificates',
    component: CertificatesComponent
  },
  {
    path: 'certificates-requests',
    component: GetCertificatesRequestsComponent
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

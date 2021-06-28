import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { CoursePageComponent } from './enrollments/course-page/course-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    EnrollmentsComponent,
    CoursePageComponent,
    ForgotPasswordComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    TranslateModule,
    SharedModule,
  ]
})
export class ClientModule { }

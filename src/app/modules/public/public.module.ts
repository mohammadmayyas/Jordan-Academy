import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoursesComponent } from './courses/courses.component';
import { TetimonialsComponent } from './tetimonials/tetimonials.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { CoursePageComponent } from './courses/course-page/course-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    CoursesComponent,
    TetimonialsComponent,
    AboutComponent,
    ContactComponent,
    CoursePageComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    TranslateModule,
    SharedModule,

  ]
})
export class PublicModule { }

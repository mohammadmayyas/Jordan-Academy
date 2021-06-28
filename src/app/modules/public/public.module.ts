import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoursesComponent } from './courses/courses.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { CoursePageComponent } from './courses/course-page/course-page.component';
import { AddTestimonialComponent } from './testimonials/add-testimonial/add-testimonial.component';
import { EmailComponent } from './email/email.component';


@NgModule({
  declarations: [
    HomeComponent,
    CoursesComponent,
    TestimonialsComponent,
    AboutComponent,
    ContactComponent,
    CoursePageComponent,
    AddTestimonialComponent,
    EmailComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    TranslateModule,
    SharedModule,

  ]
})
export class PublicModule { }

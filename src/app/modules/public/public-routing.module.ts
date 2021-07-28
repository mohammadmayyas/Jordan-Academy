import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursePageComponent } from './courses/course-page/course-page.component';
import { CoursesComponent } from './courses/courses.component';
import { EmailComponent } from './email/email.component';
import { HomeComponent } from './home/home.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent   
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'course-page/:courseId',
    component: CoursePageComponent
  },
  {
    path: 'email',
    component: EmailComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

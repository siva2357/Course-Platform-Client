import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Public and Shared Components
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
import { CoursePageComponent } from './views/pages/course-page/course-page.component';
import { DegreeDiplomaPageComponent } from './views/pages/degree-diploma-page/degree-diploma-page.component';
import { CareerTrackPageComponent } from './views/pages/career-track-page/career-track-page.component';
import { ShortCoursePageComponent } from './views/pages/short-course-page/short-course-page.component';

const routes: Routes = [
  // Public routes
  { path: 'landing-page', component:  LandingPageComponent, title: 'Main page' },
  { path: 'courses', component:  CoursePageComponent, title: 'Course page' },
  { path: 'degrees-diplomas', component:  DegreeDiplomaPageComponent, title: 'Degree diploma page' },
  { path: 'career-tracks', component:  CareerTrackPageComponent, title: 'Course page' },
  { path: 'short-courses', component:  ShortCoursePageComponent, title: 'Course page' },

  { path: 'courses', component:  CoursePageComponent, title: 'Course page' },


  { path: '**', redirectTo: 'landing-page' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

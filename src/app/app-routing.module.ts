import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Public and Shared Components
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
import { CoursePageComponent } from './views/pages/course-page/course-page.component';
import { CoursePageDetailsComponent } from './views/pages/course-page-details/course-page-details.component';
import { TeachingPageComponent } from './views/pages/teaching-page/teaching-page.component';
import { CourseCategoryComponent } from './views/pages/course-category/course-category.component';
import { LearningPageComponent } from './views/pages/learning-page/learning-page.component';
const routes: Routes = [
  // Public routes
  { path: 'landing-page', component:  LandingPageComponent, title: 'Main page' },
  { path: 'courses', component:  CoursePageComponent, title: 'Course page' },
  { path: 'courses/courseName', component: CoursePageDetailsComponent, title: 'Course page' },
  { path: 'courses/category', component: CourseCategoryComponent, title: 'Course page' },
  { path: 'learning', component:  LearningPageComponent, title: 'Course page' },
  { path: 'teaching', component:  TeachingPageComponent, title: 'Course page' },
  { path: '**', redirectTo: 'landing-page' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

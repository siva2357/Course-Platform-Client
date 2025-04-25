import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Public and Shared Components
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
import { CoursePageComponent } from './views/pages/course-page/course-page.component';
import { CoursePageDetailsComponent } from './views/pages/course-page-details/course-page-details.component';
import { TeachingPageComponent } from './views/pages/teaching-page/teaching-page.component';
import { EducatorRegistrationPageComponent } from './views/pages/educator/educator-registration-page/educator-registration-page.component';
import { CourseCategoryComponent } from './views/pages/course-category/course-category.component';
import { LearningPageComponent } from './views/pages/learning-page/learning-page.component';
import { LearnerRegistrationPageComponent } from './views/pages/leaner/learner-registration-page/learner-registration-page.component';
import { EducatorLoginPageComponent } from './views/pages/educator/educator-login-page/educator-login-page.component';
import { LearnerLoginPageComponent } from './views/pages/leaner/learner-login-page/learner-login-page.component';
const routes: Routes = [
  // Public routes
  { path: 'landing-page', component:  LandingPageComponent, title: 'Main page' },
  { path: 'courses', component:  CoursePageComponent, title: 'Course page' },
  { path: 'courses/courseName', component: CoursePageDetailsComponent, title: 'Course page' },
  { path: 'courses/category', component: CourseCategoryComponent, title: 'Course page' },
  { path: 'learning', component:  LearningPageComponent, title: 'Course page' },
  { path: 'teaching', component:  TeachingPageComponent, title: 'Course page' },
  { path: 'educator/registration-page', component:  EducatorRegistrationPageComponent, title: 'Course page' },
  { path: 'educator/login-page', component:  EducatorLoginPageComponent, title: 'Course page' },
  { path: 'learner/registration-page', component:  LearnerRegistrationPageComponent, title: 'Course page' },
  { path: 'learner/login-page', component:  LearnerLoginPageComponent, title: 'Course page' },
  { path: '**', redirectTo: 'landing-page' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

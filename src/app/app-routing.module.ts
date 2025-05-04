import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Public and Shared Components
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
import { CoursePageComponent } from './views/pages/course-page/course-page.component';
import { CoursePageDetailsComponent } from './views/pages/course-page-details/course-page-details.component';
import { TeachingPageComponent } from './views/pages/teaching-page/teaching-page.component';
import { CourseCategoryComponent } from './views/pages/course-category/course-category.component';
import { LearningPageComponent } from './views/pages/learning-page/learning-page.component';
import { InstructorSingupPageComponent } from './views/pages/instructor-singup-page/instructor-singup-page.component';
import { InstructorLoginPageComponent } from './views/pages/instructor-login-page/instructor-login-page.component';
const routes: Routes = [
  // Public routes
  { path: 'main', component:  LandingPageComponent, title: 'Main page' },
  { path: 'courses', component:  CoursePageComponent, title: 'Course page' },
  { path: 'courses/courseName', component: CoursePageDetailsComponent, title: 'Course page' },
  { path: 'courses/category', component: CourseCategoryComponent, title: 'Course page' },
  { path: 'learning', component:  LearningPageComponent, title: 'Course page' },
  { path: 'teaching', component:  TeachingPageComponent, title: 'Course page' },
  { path: 'instrutor/registration-page', component:  InstructorSingupPageComponent, title: 'Course page' },
  { path: 'login-page', component:  InstructorLoginPageComponent, title: 'Course page' },

  { path: 'instrutor',loadChildren: () => import('./views/pages/instructor/instructor-pages.module').then((m) => m.InstrutorPageModule)},

  { path: '**', redirectTo: 'main' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

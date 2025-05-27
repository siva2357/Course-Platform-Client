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
import { CartPageComponent } from './views/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './views/pages/checkout-page/checkout-page.component';
import { ForgotPasswordPageComponent } from './views/pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordOtpPageComponent } from './views/pages/reset-password-otp-page/reset-password-otp-page.component';
import { ResetPasswordPageComponent } from './views/pages/reset-password-page/reset-password-page.component';
import { OtpVerificationComponent } from './views/pages/otp-verification/otp-verification.component';
import { AccountConfirmationPageComponent } from './views/pages/account-confirmation-page/account-confirmation-page.component';
const routes: Routes = [
  // Public routes
  { path: 'main', component:  LandingPageComponent, title: 'Main page' },
  { path: 'courses', component:  CoursePageComponent, title: 'Course page' },
  { path: 'courses/courseName', component: CoursePageDetailsComponent, title: 'Course page' },
  { path: 'courses/category', component: CourseCategoryComponent, title: 'Course page' },
  { path: 'learning', component:  LearningPageComponent, title: 'Course page' },
  { path: 'teaching', component:  TeachingPageComponent, title: 'Course page' },
  { path: 'forgot-password', component:  ForgotPasswordPageComponent }, // Profile page route
  { path: 'forgotPassword-otp-verification', component:  ResetPasswordOtpPageComponent}, // Profile page route
  { path: 'reset-password', component:  ResetPasswordPageComponent}, // Profile page route
  { path: 'otp-verification', component:  OtpVerificationComponent }, // Profile page route
  { path: 'confirmation-page', component: AccountConfirmationPageComponent }, // Profile page route

  { path: 'instructor/registration-page', component:  InstructorSingupPageComponent, title: 'Course page' },
  { path: 'instructor/login-page', component:  InstructorLoginPageComponent, title: 'Course page' },
  { path: 'cart', component:CartPageComponent, title:"Recruiter profile page"},
  { path: 'checkout/:paymentOrderId', component:CheckoutPageComponent, title:"Recruiter profile page"},

  { path: 'instructor',loadChildren: () => import('./views/pages/instructor/instructor-pages.module').then((m) => m.InstrutorPageModule)},
  { path: 'learner',loadChildren: () => import('./views/pages/learner/learner-pages.module').then((m) => m.LearnerPageModule)},


  { path: '**', redirectTo: 'main' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

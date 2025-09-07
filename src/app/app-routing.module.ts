import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
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
import { AdminComponent } from './views/pages/admin/admin.component';
import { StudentSignupPageComponent } from './views/pages/student-signup-page/student-signup-page.component';
import { StudentLoginPageComponent } from './views/pages/student-login-page/student-login-page.component';
import { PaymentFailureComponent } from './views/pages/payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from './views/pages/payment-success/payment-success.component';
import { FindCoursesComponent } from './views/pages/find-courses/find-courses.component';
import { AboutPageComponent } from './views/pages/about-page/about-page.component';
const routes: Routes = [
  // Public routes
  { path: 'main', component:  LandingPageComponent, title: 'Main page' },
  { path: 'courses', component: FindCoursesComponent, title: 'Course page' },
  { path: 'courses/category', component: CourseCategoryComponent, title: 'Course page' },
  { path: 'learning', component:  LearningPageComponent, title: 'Course page' },
  { path: 'teaching', component:  TeachingPageComponent, title: 'Course page' },
  { path: 'about', component:  AboutPageComponent, title: 'Course page' },
  { path: 'forgot-password', component:  ForgotPasswordPageComponent },
  { path: 'forgotPassword-otp-verification', component:  ResetPasswordOtpPageComponent},
  { path: 'reset-password', component:  ResetPasswordPageComponent},
  { path: 'otp-verification', component:  OtpVerificationComponent },
  { path: 'confirmation-page', component: AccountConfirmationPageComponent },
  { path: 'instructor/registration-page', component:  InstructorSingupPageComponent, title: 'Course page' },
  { path: 'instructor/login-page', component:  InstructorLoginPageComponent, title: 'Course page' },
  { path: 'cart', component:CartPageComponent, title:"Recruiter profile page"},
  { path: 'checkout/:paymentOrderId', component:CheckoutPageComponent, title:"Recruiter profile page"},
  { path: 'paymentfailed', component:  PaymentFailureComponent },
  { path: 'paymentsuccess', component: PaymentSuccessComponent },
  { path: 'admin', component:AdminComponent, title:"Recruiter profile page"},
  { path: 'registration-page', component:  StudentSignupPageComponent, title: 'Course page' },
  { path: 'login-page', component: StudentLoginPageComponent, title: 'Course page' },
  { path: 'instructor',loadChildren: () => import('./views/pages/instructor/instructor-pages.module').then((m) => m.InstructorPageModule)},
  { path: 'student',loadChildren: () => import('./views/pages/student/student-pages.module').then((m) => m.StudentPageModule)},
  { path: '**', redirectTo: 'main' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

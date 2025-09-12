import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
import { LayoutModule } from './views/layouts/layout.module';
import { CoursePageComponent } from './views/pages/course-page/course-page.component';
import { TeachingPageComponent } from './views/pages/teaching-page/teaching-page.component';
import { LearningPageComponent } from './views/pages/learning-page/learning-page.component';
import { CourseCategoryComponent } from './views/pages/course-category/course-category.component';

import { AdminPageModule } from './views/pages/admin/admin-pages.module';
import { StudentPageModule } from './views/pages/student/student-pages.module';
import { InstructorPageModule } from './views/pages/instructor/instructor-pages.module';
import { InstructorSingupPageComponent } from './views/pages/instructor-singup-page/instructor-singup-page.component';
import { CartPageComponent } from './views/pages/cart-page/cart-page.component';
import { AccountConfirmationPageComponent } from './views/pages/account-confirmation-page/account-confirmation-page.component';
import { ForgotPasswordPageComponent } from './views/pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './views/pages/reset-password-page/reset-password-page.component';
import { ResetPasswordOtpPageComponent } from './views/pages/reset-password-otp-page/reset-password-otp-page.component';
import { OtpVerificationComponent } from './views/pages/otp-verification/otp-verification.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { StudentSignupPageComponent } from './views/pages/student-signup-page/student-signup-page.component';
import { PaymentSuccessComponent } from './views/pages/payment-success/payment-success.component';
import { PaymentFailureComponent } from './views/pages/payment-failure/payment-failure.component';
import { FindCoursesComponent } from './views/pages/find-courses/find-courses.component';
import { AboutPageComponent } from './views/pages/about-page/about-page.component';
import { CheckoutPageComponent } from './views/pages/checkout-page/checkout-page.component';
import { SignupPageComponent } from './views/pages/signup-page/signup-page.component';
import { LoginPageComponent } from './views/pages/login-page/login-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursePageComponent,
    TeachingPageComponent,
    LearningPageComponent,
    CourseCategoryComponent,
    InstructorSingupPageComponent,
    CartPageComponent,
    AccountConfirmationPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ResetPasswordOtpPageComponent,
    OtpVerificationComponent,
    StudentSignupPageComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
    FindCoursesComponent,
    AboutPageComponent,
    CheckoutPageComponent,
    SignupPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    InstructorPageModule,
    StudentPageModule,
    AdminPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Use legacy compatibility mode
    AngularFireStorageModule, // Use storage services

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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

import { StudentPageModule } from './views/pages/student/student-pages.module';
import { InstructorPageModule } from './views/pages/instructor/instructor-pages.module';
import { InstructorSingupPageComponent } from './views/pages/instructor-singup-page/instructor-singup-page.component';
import { InstructorLoginPageComponent } from './views/pages/instructor-login-page/instructor-login-page.component';
import { CartPageComponent } from './views/pages/cart-page/cart-page.component';
import { AccountConfirmationPageComponent } from './views/pages/account-confirmation-page/account-confirmation-page.component';
import { ForgotPasswordPageComponent } from './views/pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './views/pages/reset-password-page/reset-password-page.component';
import { ResetPasswordOtpPageComponent } from './views/pages/reset-password-otp-page/reset-password-otp-page.component';
import { OtpVerificationComponent } from './views/pages/otp-verification/otp-verification.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AdminComponent } from './views/pages/admin/admin.component';
import { StudentLoginPageComponent } from './views/pages/student-login-page/student-login-page.component';
import { StudentSignupPageComponent } from './views/pages/student-signup-page/student-signup-page.component';
import { PlansPricingPageComponent } from './views/pages/plans-pricing-page/plans-pricing-page.component';
import { PaymentSuccessComponent } from './views/pages/payment-success/payment-success.component';
import { PaymentFailureComponent } from './views/pages/payment-failure/payment-failure.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursePageComponent,
    TeachingPageComponent,
    LearningPageComponent,
    CourseCategoryComponent,
    InstructorSingupPageComponent,
    InstructorLoginPageComponent,
    CartPageComponent,
    AccountConfirmationPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ResetPasswordOtpPageComponent,
    OtpVerificationComponent,
    AdminComponent,
    StudentLoginPageComponent,
    StudentSignupPageComponent,
    PlansPricingPageComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    InstructorPageModule,
    StudentPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Use legacy compatibility mode
    AngularFireStorageModule, // Use storage services

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
import { LayoutModule } from './views/layouts/layout.module';
import { CoursePageComponent } from './views/pages/course-page/course-page.component';
import { CoursePageDetailsComponent } from './views/pages/course-page-details/course-page-details.component';
import { TeachingPageComponent } from './views/pages/teaching-page/teaching-page.component';
import { LearningPageComponent } from './views/pages/learning-page/learning-page.component';
import { CourseCategoryComponent } from './views/pages/course-category/course-category.component';

import { InstrutorPageModule } from './views/pages/instructor/instructor-pages.module';
import { InstructorSingupPageComponent } from './views/pages/instructor-singup-page/instructor-singup-page.component';
import { InstructorLoginPageComponent } from './views/pages/instructor-login-page/instructor-login-page.component';
import { LearnerPageModule } from './views/pages/learner/learner-pages.module';
import { CartPageComponent } from './views/pages/cart-page/cart-page.component';
import { AccountConfirmationPageComponent } from './views/pages/account-confirmation-page/account-confirmation-page.component';
import { ChangePasswordPageComponent } from './views/pages/change-password-page/change-password-page.component';
import { ForgotPasswordPageComponent } from './views/pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './views/pages/reset-password-page/reset-password-page.component';
import { ResetPasswordOtpPageComponent } from './views/pages/reset-password-otp-page/reset-password-otp-page.component';
import { OtpVerificationComponent } from './views/pages/otp-verification/otp-verification.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursePageComponent,
    CoursePageDetailsComponent,
    TeachingPageComponent,
    LearningPageComponent,
    CourseCategoryComponent,
    InstructorSingupPageComponent,
    InstructorLoginPageComponent,
    CartPageComponent,
    AccountConfirmationPageComponent,
    ChangePasswordPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ResetPasswordOtpPageComponent,
    OtpVerificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    InstrutorPageModule,
    LearnerPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Use legacy compatibility mode
    AngularFireStorageModule, // Use storage services
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

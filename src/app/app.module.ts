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
import { LearnerMainPageComponent } from './views/pages/learner-main-page/learner-main-page.component';
import { EducatorMainPageComponent } from './views/pages/educator-main-page/educator-main-page.component';
import { LearningPageComponent } from './views/pages/learning-page/learning-page.component';
import { LearnerProfileSettingsPageComponent } from './views/pages/learner-profile-settings-page/learner-profile-settings-page.component';
import { LearnerProfilePageComponent } from './views/pages/learner-profile-page/learner-profile-page.component';
import { LearnerAccountSettingsPageComponent } from './views/pages/learner-account-settings-page/learner-account-settings-page.component';
import { LearnerRegistrationPageComponent } from './views/pages/learner-registration-page/learner-registration-page.component';
import { EducatorRegistrationPageComponent } from './views/pages/educator-registration-page/educator-registration-page.component';
import { LoginPageComponent } from './views/pages/login-page/login-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursePageComponent,
    CoursePageDetailsComponent,
    TeachingPageComponent,
    LearnerMainPageComponent,
    EducatorMainPageComponent,
    LearningPageComponent,
    LearnerProfileSettingsPageComponent,
    LearnerProfilePageComponent,
    LearnerAccountSettingsPageComponent,
    LearnerRegistrationPageComponent,
    EducatorRegistrationPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

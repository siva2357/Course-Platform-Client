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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    InstrutorPageModule,
    LearnerPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

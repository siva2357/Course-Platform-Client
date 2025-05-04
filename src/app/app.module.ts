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
import { EducatorCreateCoursePageComponent } from './educator-create-course-page/educator-create-course-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursePageComponent,
    CoursePageDetailsComponent,
    TeachingPageComponent,
    LearningPageComponent,
    CourseCategoryComponent,
    EducatorCreateCoursePageComponent,

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

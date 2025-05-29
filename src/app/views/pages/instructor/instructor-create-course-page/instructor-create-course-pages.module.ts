
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CourseContentCreateComponent } from './course-content-create/course-content-create.component';
import { CourseLandingPageComponent } from './course-landing-page/course-landing-page.component';
import { CoursePublishPageComponent } from './course-publish-page/course-publish-page.component';
import { CoursePlanningPageComponent } from './course-planning-page/course-planning-page.component';
import { InstructorCoursePagesRoutingModule } from './instructor-create-course-pages-routing.module';
import { InstructorCreateCoursePageComponent } from './instructor-create-course-page.component';
@NgModule({
  declarations: [
    InstructorCreateCoursePageComponent,
CoursePlanningPageComponent,
CoursePublishPageComponent,
CourseLandingPageComponent,
CourseContentCreateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    InstructorCoursePagesRoutingModule
],
  providers: [DatePipe],
})
export class InstructorCoursePageModule { }

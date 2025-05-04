
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InstructorCoursePageComponent } from './instructor-course-page/instructor-course-page.component';
import { InstructorDashboardPageComponent } from './instructor-dashboard-page/instructor-dashboard-page.component';
import { InstructorCreateCoursePageComponent } from './instructor-create-course-page/instructor-create-course-page.component';
import { InstructorComponent } from './instructor.component';
import { InstrutorPagesRoutingModule } from './instrutor-pages-routing.module';
import { LayoutModule } from '../../layouts/layout.module';

@NgModule({
  declarations: [
    InstructorComponent,
    InstructorCoursePageComponent,
    InstructorDashboardPageComponent,
    InstructorCreateCoursePageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InstrutorPagesRoutingModule,
    LayoutModule

],
  providers: [DatePipe],
})
export class InstrutorPageModule { }

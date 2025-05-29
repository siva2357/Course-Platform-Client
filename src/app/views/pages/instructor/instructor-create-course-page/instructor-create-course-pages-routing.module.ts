import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseContentCreateComponent } from './course-content-create/course-content-create.component';
import { CourseLandingPageComponent } from './course-landing-page/course-landing-page.component';
import { CoursePublishPageComponent } from './course-publish-page/course-publish-page.component';
import { CoursePlanningPageComponent } from './course-planning-page/course-planning-page.component';
import { InstructorCreateCoursePageComponent } from './instructor-create-course-page.component';

const routes: Routes = [
  // Default path for recruiter redirects to 'recruiter/dashboard'
  { path: '', redirectTo: 'course-landing-page', pathMatch: 'full' },
  { path: '', component: InstructorCreateCoursePageComponent,
    children: [
    { path: 'course-landing-page', component: CourseLandingPageComponent, title: 'Post Jobpost Page'  },
    { path: 'plan-your-course', component:CoursePlanningPageComponent , title:"Recruiter profile page"},
    { path: 'create-your-content', component:CourseContentCreateComponent, title:"Recruiter profile page"},
    { path: 'publish-your-page', component:CoursePublishPageComponent , title:"Recruiter profile page"},
    ]
  },
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorCoursePagesRoutingModule { }

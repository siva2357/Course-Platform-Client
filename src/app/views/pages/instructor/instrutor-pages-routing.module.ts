import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorCoursePageComponent } from './instructor-course-page/instructor-course-page.component';
import { InstructorDashboardPageComponent } from './instructor-dashboard-page/instructor-dashboard-page.component';
import { InstructorCreateCoursePageComponent } from './instructor-create-course-page/instructor-create-course-page.component';
import { ManageYourCourseComponent } from './manage-your-course/manage-your-course.component';
import { EditYourCourseComponent } from './edit-your-course/edit-your-course.component';
import { InstructorCourseLearnersComponent } from './instructor-course-learners/instructor-course-learners.component';
const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

	// { path: 'profile-form', component: RecruiterProfileFormComponent, title: 'Recruiter Fill Profile Page' },


	{ path: '', component: InstructorComponent, // Main layout component with sidebar
	  children: [
    { path: 'dashboard', component: InstructorDashboardPageComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
		{ path: 'course', component:InstructorCoursePageComponent, title:"Recruiter profile page"},
    { path: 'manage-courses', component:ManageYourCourseComponent, title:"Recruiter profile page"},
    { path: 'course-learners', component:InstructorCourseLearnersComponent, title:"Recruiter profile page"},


	  ]
	},
  { path: 'course/create', component:InstructorCreateCoursePageComponent, title:"Recruiter profile page"},
  { path: 'edit-course/:id', component:EditYourCourseComponent, title:"Recruiter profile page"},

  ];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InstrutorPagesRoutingModule { }

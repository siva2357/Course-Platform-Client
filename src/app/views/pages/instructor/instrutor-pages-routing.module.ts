import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorCoursePageComponent } from './instructor-course-page/instructor-course-page.component';
import { InstructorDashboardPageComponent } from './instructor-dashboard-page/instructor-dashboard-page.component';
import { InstructorCreateCoursePageComponent } from './instructor-create-course-page/instructor-create-course-page.component';
const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

	// { path: 'profile-form', component: RecruiterProfileFormComponent, title: 'Recruiter Fill Profile Page' },


	{ path: '', component: InstructorComponent, // Main layout component with sidebar
	  children: [
    { path: 'dashboard', component: InstructorDashboardPageComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
		{ path: 'course', component:InstructorCoursePageComponent, title:"Recruiter profile page"},
	  ]
	},
  { path: 'course/create', component:InstructorCreateCoursePageComponent, title:"Recruiter profile page"},

  ];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InstrutorPagesRoutingModule { }

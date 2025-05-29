import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorCoursePageComponent } from './instructor-course-page/instructor-course-page.component';
import { InstructorDashboardPageComponent } from './instructor-dashboard-page/instructor-dashboard-page.component';
import { InstructorCreateCoursePageComponent } from './instructor-create-course-page/instructor-create-course-page.component';
import { ManageYourCourseComponent } from './manage-your-course/manage-your-course.component';
import { EditYourCourseComponent } from './edit-your-course/edit-your-course.component';
import { InstructorCourseLearnersComponent } from './instructor-course-learners/instructor-course-learners.component';
import { InstructorTransactionPageComponent } from './instructor-transaction-page/instructor-transaction-page.component';
import { InstructorProfilePageComponent } from './instructor-profile-page/instructor-profile-page.component';
import { InstructorAccountSettingsPageComponent } from './instructor-account-settings-page/instructor-account-settings-page.component';
import { InstructorProfileformPageComponent } from './instructor-profileform-page/instructor-profileform-page.component';



const routes: Routes = [
	// Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'profile-form-page', component:InstructorProfileformPageComponent, title:"Instructor profile page"},
  { path: 'account-settings/:id/profile-settings', component: InstructorAccountSettingsPageComponent , title: 'Recruiter account-settings page' },
	{ path: '', component: InstructorComponent,
	  children: [
    { path: 'dashboard', component: InstructorDashboardPageComponent, title: 'Post Jobpost Page'  },
		{ path: 'course', component:InstructorCoursePageComponent, title:"Recruiter profile page"},
    { path: 'manage-courses', component:ManageYourCourseComponent, title:"Recruiter profile page"},
    { path: 'course-learners', component:InstructorCourseLearnersComponent, title:"Recruiter profile page"},
    { path: 'payments', component:InstructorTransactionPageComponent, title:"Recruiter profile page"},
    { path: 'profile-page/:id', component:InstructorProfilePageComponent, title:"Instructor profile page"},
	  ]
	},
  { path: 'course/create',loadChildren: () => import('./instructor-create-course-page/instructor-create-course-pages.module').then((m) => m.InstructorCoursePageModule)},

  { path: 'course/create', component:InstructorCreateCoursePageComponent, title:"Recruiter profile page"},
  { path: 'edit-course/:id', component:EditYourCourseComponent, title:"Recruiter profile page"},
  ];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InstructorPagesRoutingModule { }

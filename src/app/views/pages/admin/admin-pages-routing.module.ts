


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  // Default path for recruiter redirects to 'recruiter/dashboard'
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // { path: 'profile-form', component: RecruiterProfileFormComponent, title: 'Recruiter Fill Profile Page' },


  { path: '', component: AdminComponent, // Main layout component with sidebar
    children: [
    { path: 'dashboard', component: AdminDashboardComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
    ]
  },
  // { path: 'course/create', component:InstructorCreateCoursePageComponent, title:"Recruiter profile page"},
  // { path: 'edit-course/:id', component:EditYourCourseComponent, title:"Recruiter profile page"},

  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule { }

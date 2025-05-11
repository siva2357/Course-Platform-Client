


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnerComponent } from './learner.component';
import { LearnerHomePageComponent } from './learner-home-page/learner-home-page.component';
import { LearnerMyCoursesComponent } from './learner-my-courses/learner-my-courses.component';
import { LearnerWishlistComponent } from './learner-wishlist/learner-wishlist.component';
import { LearnerCertificationsComponent } from './learner-certifications/learner-certifications.component';
import { LearnerPurchasesComponent } from './learner-purchases/learner-purchases.component';


const routes: Routes = [
  // Default path for recruiter redirects to 'recruiter/dashboard'
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // { path: 'profile-form', component: RecruiterProfileFormComponent, title: 'Recruiter Fill Profile Page' },


  { path: '', component: LearnerComponent, // Main layout component with sidebar
    children: [
    { path: 'home', component: LearnerHomePageComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
    { path: 'my-courses', component: LearnerMyCoursesComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
    { path: 'my-wishlist', component: LearnerWishlistComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
    { path: 'my-certifications', component: LearnerCertificationsComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route
    { path: 'my-purchases', component: LearnerPurchasesComponent, title: 'Post Jobpost Page'  } ,// Hire Seeker page route

    ]
  },
  // { path: 'course/create', component:InstructorCreateCoursePageComponent, title:"Recruiter profile page"},
  // { path: 'edit-course/:id', component:EditYourCourseComponent, title:"Recruiter profile page"},

  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerPagesRoutingModule { }

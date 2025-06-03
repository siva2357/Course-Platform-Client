


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { StudentWishlistComponent } from './student-wishlist/student-wishlist.component';
import { StudentCertificationsComponent } from './student-certifications/student-certifications.component';
import { StudentPurchasesComponent } from './student-purchases/student-purchases.component';
import { StudentMyCoursesComponent } from './student-my-courses/student-my-courses.component';

const routes: Routes = [
  // Default path for recruiter redirects to 'recruiter/dashboard'
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: StudentComponent,
    children: [
    { path: 'home', component: StudentHomePageComponent, title: 'Post Jobpost Page'},
    { path: 'my-courses', component: StudentMyCoursesComponent, title: 'Post Jobpost Page'},
    { path: 'my-wishlist', component: StudentWishlistComponent, title: 'Post Jobpost Page'},
    { path: 'my-certifications', component: StudentCertificationsComponent , title: 'Post Jobpost Page'},
    { path: 'my-purchases', component: StudentPurchasesComponent, title: 'Post Jobpost Page'  },
    ]
  },
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPagesRoutingModule { }

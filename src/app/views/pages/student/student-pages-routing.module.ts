


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { StudentWishlistComponent } from './student-wishlist/student-wishlist.component';
import { StudentCertificationsComponent } from './student-certifications/student-certifications.component';
import { StudentPurchasesComponent } from './student-purchases/student-purchases.component';
import { StudentMyCoursesComponent } from './student-my-courses/student-my-courses.component';
import { StudentAccountSettingsPageComponent } from './student-account-settings-page/student-account-settings-page.component';
import { StudentProfilePageComponent } from './student-profile-page/student-profile-page.component';
import { StudentProfileformPageComponent } from './student-profileform-page/student-profileform-page.component';
import { CoursePageDetailsComponent } from './course-page-details/course-page-details.component';
import { StudentAccomplishmentsComponent } from './student-accomplishments/student-accomplishments.component';


const routes: Routes = [
  // Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profile-form-page', component: StudentProfileformPageComponent , title: 'Post Jobpost Page'},
  { path: 'account-settings/:id/profile-settings', component: StudentAccountSettingsPageComponent, title: 'Post Jobpost Page'},
  { path: 'accomplishments/certificate/:certId', component: StudentAccomplishmentsComponent, title: 'Post Jobpost Page'},

  { path: '', component: StudentComponent,
    children: [
    { path: 'home', component: StudentHomePageComponent, title: 'Post Jobpost Page'},
    { path: 'my-courses', component: StudentMyCoursesComponent, title: 'Post Jobpost Page'},
      { path: 'course/:id/:courseName', component: CoursePageDetailsComponent, title: 'Course page' },

    { path: 'my-wishlist', component: StudentWishlistComponent, title: 'Post Jobpost Page'},
    { path: 'my-certifications', component: StudentCertificationsComponent , title: 'Post Jobpost Page'},
    { path: 'my-purchases', component: StudentPurchasesComponent, title: 'Post Jobpost Page'  },
    { path: 'profile-page/:id', component: StudentProfilePageComponent, title: 'Post Jobpost Page'},
    ]
  },
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPagesRoutingModule { }

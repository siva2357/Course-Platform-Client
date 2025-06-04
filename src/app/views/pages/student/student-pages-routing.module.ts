


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
import { StudentDashboardPageComponent } from './student-dashboard-page/student-dashboard-page.component';
import { StudentSocialMediaComponent } from './student-social-media/student-social-media.component';
import { StudentProfileUpdateComponent } from './student-profile-update/student-profile-update.component';

const routes: Routes = [
  // Default path for recruiter redirects to 'recruiter/dashboard'
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: StudentComponent,
    children: [
    { path: 'home', component: StudentHomePageComponent, title: 'Post Jobpost Page'},
    { path: 'my-courses', component: StudentMyCoursesComponent, title: 'Post Jobpost Page'},
    { path: 'my-wishlist', component: StudentWishlistComponent, title: 'Post Jobpost Page'},
    { path: 'my-certifications', component: StudentCertificationsComponent , title: 'Post Jobpost Page'},
    { path: 'my-purchases', component: StudentPurchasesComponent, title: 'Post Jobpost Page'  },
    { path: 'account-settings/:id/profile-settings', component: StudentAccountSettingsPageComponent, title: 'Post Jobpost Page'},
    { path: 'profile-page/:id', component: StudentProfilePageComponent, title: 'Post Jobpost Page'},
    { path: 'profile-form-page', component: StudentProfileformPageComponent , title: 'Post Jobpost Page'},
    { path: 'dashboard', component: StudentDashboardPageComponent, title: 'Post Jobpost Page'  },

    ]
  },
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPagesRoutingModule { }

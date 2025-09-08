
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentProfileDetailsComponent } from './student-profile-details/student-profile-details.component';

import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { InstructorProfileDetailsComponent } from './instructor-profile-details/instructor-profile-details.component';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailsPageComponent } from './course-details-page/course-details-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [

  { path: '', component:  AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component:  DashboardPageComponent , title: 'Freelancer Dashboard' },
      { path: 'instructor-list', component: InstructorListComponent, title: 'Freelancer Dashboard' },
      { path: 'instructor/:id/profile', component: InstructorProfileDetailsComponent, title: 'Freelancer Dashboard' },
      { path: 'student-list', component: StudentListComponent, title: 'Freelancer Dashboard' },
      { path: 'student/:id/profile', component: StudentProfileDetailsComponent, title: 'Freelancer Dashboard' },
      { path: 'course-list', component: CourseListComponent, title: 'Freelancer Dashboard' },
      { path: 'course-list/:id/course-details', component: CourseDetailsPageComponent, title: 'Freelancer Dashboard' },
     { path: 'transactions', component: TransactionsPageComponent, title: 'Freelancer Dashboard' },

      { path: '**', redirectTo: 'dashboard' },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}

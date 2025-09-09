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
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard
      { path: 'dashboard', component: DashboardPageComponent, title: 'Admin Dashboard' },

      // Instructors
      { path: 'instructor-list', component: InstructorListComponent, title: 'Instructors' },
      { path: 'instructor/:instructorId/profile', component: InstructorProfileDetailsComponent, title: 'Instructor Profile' },

      // Students
      { path: 'student-list', component: StudentListComponent, title: 'Students' },
      { path: 'student/:studentId/profile', component: StudentProfileDetailsComponent, title: 'Student Profile' },

      // Courses
      { path: 'course-list', component: CourseListComponent, title: 'Courses' },
      { path: 'course-list/:courseId/course-details', component: CourseDetailsPageComponent, title: 'Course Details' },

      // Transactions
      { path: 'transactions', component: TransactionsPageComponent, title: 'Transactions' },

      // Admin profile
      { path: 'profile-page/:id', component: AdminProfileComponent, title: 'Admin Profile' },

      // Fallback
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}

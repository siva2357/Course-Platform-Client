
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule,} from '@angular/forms';
import { LayoutModule } from '../../layouts/layout.module';
import { NgChartsModule } from 'ng2-charts';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';
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
@NgModule({
  declarations: [
    AdminComponent,
    DashboardPageComponent,
    StudentListComponent,
    StudentProfileDetailsComponent,
    InstructorListComponent,
    InstructorProfileDetailsComponent,
    CourseListComponent,
    CourseDetailsPageComponent,
    TransactionsPageComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NgChartsModule,
],
  providers: [DatePipe],
})

export class AdminPageModule { }

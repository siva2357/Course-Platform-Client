
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InstructorCoursePageComponent } from './instructor-course-page/instructor-course-page.component';
import { InstructorDashboardPageComponent } from './instructor-dashboard-page/instructor-dashboard-page.component';
import { InstructorCreateCoursePageComponent } from './instructor-create-course-page/instructor-create-course-page.component';
import { InstructorComponent } from './instructor.component';
import { InstrutorPagesRoutingModule } from './instrutor-pages-routing.module';
import { LayoutModule } from '../../layouts/layout.module';
import { EditYourCourseComponent } from './edit-your-course/edit-your-course.component';
import { ManageYourCourseComponent } from './manage-your-course/manage-your-course.component';
import { InstructorCourseLearnersComponent } from './instructor-course-learners/instructor-course-learners.component';
import { InstructorTransactionPageComponent } from './instructor-transaction-page/instructor-transaction-page.component';
import { InstructorProfilePageComponent } from './instructor-profile-page/instructor-profile-page.component';
import { InstructorAccountSettingsPageComponent } from './instructor-account-settings-page/instructor-account-settings-page.component';
import { InstructorProfileformPageComponent } from './instructor-profileform-page/instructor-profileform-page.component';
import { InstructorBasicDetailsComponent } from './instructor-basic-details/instructor-basic-details.component';
import { InstructorProfileUpdateComponent } from './instructor-profile-update/instructor-profile-update.component';
import { InstructorSocialMediaComponent } from './instructor-social-media/instructor-social-media.component';

@NgModule({
  declarations: [
    InstructorComponent,
    InstructorCoursePageComponent,
    InstructorDashboardPageComponent,
    InstructorCreateCoursePageComponent,
    EditYourCourseComponent,
    ManageYourCourseComponent,
    InstructorCourseLearnersComponent,
    InstructorTransactionPageComponent,
    InstructorProfilePageComponent,
    InstructorAccountSettingsPageComponent,
    InstructorProfileformPageComponent,
    InstructorBasicDetailsComponent,
    InstructorProfileUpdateComponent,
    InstructorSocialMediaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InstrutorPagesRoutingModule,
    LayoutModule,
    NgxEditorModule,
    NgChartsModule

],
  providers: [DatePipe],
})
export class InstrutorPageModule { }

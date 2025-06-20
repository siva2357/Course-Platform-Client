
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layouts/layout.module';
import { StudentComponent } from './student.component';
import { StudentWishlistComponent } from './student-wishlist/student-wishlist.component';
import { StudentCertificationsComponent } from './student-certifications/student-certifications.component';
import { StudentPurchasesComponent } from './student-purchases/student-purchases.component';
import { StudentMyCoursesComponent } from './student-my-courses/student-my-courses.component';
import { StudentPagesRoutingModule } from './student-pages-routing.module';
import { StudentAccountSettingsPageComponent } from './student-account-settings-page/student-account-settings-page.component';
import { StudentProfilePageComponent } from './student-profile-page/student-profile-page.component';
import { StudentProfileformPageComponent } from './student-profileform-page/student-profileform-page.component';
import { StudentSocialMediaComponent } from './student-social-media/student-social-media.component';
import { StudentProfileUpdateComponent } from './student-profile-update/student-profile-update.component';
import { StudentBasicDetailsComponent } from './student-basic-details/student-basic-details.component';
import { StudentDeleteAccountComponent } from './student-delete-account/student-delete-account.component';
import { StudentPasswordPageComponent } from './student-password-page/student-password-page.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { CoursePageDetailsComponent } from './course-page-details/course-page-details.component';
import { StudentAccomplishmentsComponent } from './student-accomplishments/student-accomplishments.component';
import { StudentCourseLearningComponent } from './student-course-learning/student-course-learning.component';
@NgModule({
  declarations: [
    StudentComponent,
    StudentCertificationsComponent,
    StudentMyCoursesComponent,
    StudentWishlistComponent,
    StudentPurchasesComponent,
    StudentProfileUpdateComponent,
    StudentSocialMediaComponent,
    StudentProfileformPageComponent,
    StudentProfilePageComponent,
    StudentAccountSettingsPageComponent ,
    StudentBasicDetailsComponent,
    StudentDeleteAccountComponent,
    StudentPasswordPageComponent,
    StudentHomePageComponent,
    CoursePageDetailsComponent,
    StudentAccomplishmentsComponent,
    StudentCourseLearningComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StudentPagesRoutingModule,
    LayoutModule,
        LayoutModule,
    NgxEditorModule,
    NgChartsModule,




],
  providers: [DatePipe],
})
export class StudentPageModule { }

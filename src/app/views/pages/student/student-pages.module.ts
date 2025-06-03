
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layouts/layout.module';
import { StudentComponent } from './student.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { StudentWishlistComponent } from './student-wishlist/student-wishlist.component';
import { StudentCertificationsComponent } from './student-certifications/student-certifications.component';
import { StudentPurchasesComponent } from './student-purchases/student-purchases.component';
import { StudentMyCoursesComponent } from './student-my-courses/student-my-courses.component';
import { StudentPagesRoutingModule } from './student-pages-routing.module';

@NgModule({
  declarations: [
    StudentComponent,
    StudentHomePageComponent,
    StudentCertificationsComponent,
    StudentMyCoursesComponent,
    StudentWishlistComponent,
     StudentPurchasesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StudentPagesRoutingModule,
    LayoutModule




],
  providers: [DatePipe],
})
export class StudentPageModule { }

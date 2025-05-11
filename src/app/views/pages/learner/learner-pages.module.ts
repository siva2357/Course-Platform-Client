
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LearnerComponent } from './learner.component';
import { LearnerHomePageComponent } from './learner-home-page/learner-home-page.component';
import { LayoutModule } from '../../layouts/layout.module';
import { LearnerPagesRoutingModule } from './learner-pages-routing.module';
import { LearnerMyCoursesComponent } from './learner-my-courses/learner-my-courses.component';
import { LearnerWishlistComponent } from './learner-wishlist/learner-wishlist.component';
import { LearnerCertificationsComponent } from './learner-certifications/learner-certifications.component';
import { LearnerPurchasesComponent } from './learner-purchases/learner-purchases.component';
@NgModule({
  declarations: [
    LearnerComponent,
    LearnerHomePageComponent,
    LearnerCertificationsComponent,
    LearnerMyCoursesComponent,
    LearnerWishlistComponent,
    LearnerPurchasesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LearnerPagesRoutingModule,
    LayoutModule




],
  providers: [DatePipe],
})
export class LearnerPageModule { }

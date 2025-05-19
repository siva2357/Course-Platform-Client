
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../../layouts/layout.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AdminPagesRoutingModule




],
  providers: [DatePipe],
})
export class AdminPageModule { }

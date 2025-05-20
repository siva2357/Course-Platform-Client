import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';

import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CourseHeaderComponent } from './course-header/course-header.component';
@NgModule({
  declarations: [

    AppHeaderComponent,
    AppFooterComponent,
    SidebarComponent,
    CourseHeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
 exports: [
    AppHeaderComponent,
    AppFooterComponent,
    SidebarComponent,
    CourseHeaderComponent
  ],
  providers: [DatePipe],
})
export class LayoutModule { }

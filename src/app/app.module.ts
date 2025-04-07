import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';
import { LayoutModule } from './views/layouts/layout.module';
import { CoursePageComponent } from './views/pages/course-page/course-page.component';
import { DegreeDiplomaPageComponent } from './views/pages/degree-diploma-page/degree-diploma-page.component';
import { CareerTrackPageComponent } from './views/pages/career-track-page/career-track-page.component';
import { ShortCoursePageComponent } from './views/pages/short-course-page/short-course-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CoursePageComponent,
    DegreeDiplomaPageComponent,
    CareerTrackPageComponent,
    ShortCoursePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

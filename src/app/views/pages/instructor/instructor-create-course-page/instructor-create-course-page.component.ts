import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-create-course-page',
  templateUrl: './instructor-create-course-page.component.html',
  styleUrls: ['./instructor-create-course-page.component.css']
})
export class InstructorCreateCoursePageComponent {

  constructor( public router:Router){}

  goToCoursePage(){
    this.router.navigate(['instructor/course'])
  }

     menuItems: any[] = [
      // { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' },
      { label: 'Course landing page', link: 'course-landing-page'},
      { label: 'Plan your course', link: 'plan-your-course'},
      { label: 'Create your content', link: 'create-your-content'},
      { label: 'Publish your course', link: 'publish-your-page'},

    ];

}

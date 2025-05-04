import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-create-course-page',
  templateUrl: './instructor-create-course-page.component.html',
  styleUrls: ['./instructor-create-course-page.component.css']
})
export class InstructorCreateCoursePageComponent {

  activeTab: string = 'Plan your course';

  constructor( public router:Router){}

  setActiveTab(tab: string): void {
		this.activeTab = tab;
	}

  goToCoursePage(){
    this.router.navigate(['instrutor/course'])
  }


}

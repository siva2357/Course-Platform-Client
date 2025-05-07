import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-your-course',
  templateUrl: './edit-your-course.component.html',
  styleUrls: ['./edit-your-course.component.css']
})
export class EditYourCourseComponent {


    activeTab: string = 'Course landing page';

    constructor( public router:Router){}

    setActiveTab(tab: string): void {
      this.activeTab = tab;
    }

    goToCoursePage(){
      this.router.navigate(['instrutor/course'])
    }


}

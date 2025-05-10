import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-course-page',
  templateUrl: './instructor-course-page.component.html',
  styleUrls: ['./instructor-course-page.component.css']
})
export class InstructorCoursePageComponent {

  constructor( public router:Router){

  }

  goToCreateCourse()
  {
    this.router.navigate(['instructor/course/create'])
  }

}

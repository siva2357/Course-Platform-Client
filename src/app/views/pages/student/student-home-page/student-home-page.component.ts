import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent {

  constructor(public router:Router){

  }



goToCourseDetails() {
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['/student/course/courseName'])
  );
  window.open(url, '_blank');
}


}

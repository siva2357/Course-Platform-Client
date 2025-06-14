import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-page-details',
  templateUrl: './course-page-details.component.html',
  styleUrls: ['./course-page-details.component.css']
})
export class CoursePageDetailsComponent {


      constructor(private router: Router,) {}

      goToDashboard(){
        this.router.navigate([`/student`]);
      }

}

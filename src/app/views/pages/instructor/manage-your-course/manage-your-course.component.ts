import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-your-course',
  templateUrl: './manage-your-course.component.html',
  styleUrls: ['./manage-your-course.component.css']
})
export class ManageYourCourseComponent {

  constructor(private router:Router){

  }

  goToEditCourse(){
    this.router.navigate(['instructor/edit-course/:id'])
  }

}

import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/models/course.model';


@Component({
  selector: 'app-student-certifications',
  templateUrl: './student-certifications.component.html',
  styleUrls: ['./student-certifications.component.css']
})
export class StudentCertificationsComponent {

    constructor(public router:Router, public courseService:CourseService){}

  courses: Course[] = []; // Make sure this is defined

    ngOnInit() {
    this.loadCertifications();
  }

  loadCertifications() {
    this.courseService.getAllCertifiedCourses().subscribe((res) => {
      this.courses = res.courses; // or res.items depending on your API
    });
  }



  viewCertificate(){
  this.router.navigateByUrl('/student/accomplishments/certificate/:certid');

  }

}

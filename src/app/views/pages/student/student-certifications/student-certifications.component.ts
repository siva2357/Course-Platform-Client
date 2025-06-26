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

  courses: any[] = []; // Make sure this is defined

    ngOnInit() {
    this.loadCertifications();
  }

loadCertifications() {
  this.courseService.getAllCertifiedCourses().subscribe((res) => {
    this.courses = res.data; // ✅ Corrected
  });
}




viewCertificate(courseId: string): void {
  this.router.navigate(['/student/accomplishments/certificate', courseId]);
}


}




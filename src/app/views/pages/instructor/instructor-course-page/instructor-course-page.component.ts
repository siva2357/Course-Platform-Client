import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-instructor-course-page',
  templateUrl: './instructor-course-page.component.html',
  styleUrls: ['./instructor-course-page.component.css']
})
export class InstructorCoursePageComponent {
  public course!:Course

  constructor( public router:Router, public courseService:CourseService){}

    createNewCourse() {
    this.courseService.createCourse(this.course).subscribe({
      next: (course: Course) => {
        const courseId = course._id;
        this.router.navigate([`instructor/course/${courseId}/create`]);
      },
      error: err => console.error('Course creation failed', err)
    });
  }


}

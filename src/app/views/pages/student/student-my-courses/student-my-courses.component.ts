import { Component} from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Purchase } from 'src/app/core/models/purchase.model';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { Course, CourseIntro, CoursePreview, CoursesResponse } from 'src/app/core/models/course.model';


@Component({
  selector: 'app-student-my-courses',
  templateUrl: './student-my-courses.component.html',
  styleUrls: ['./student-my-courses.component.css']
})

export class StudentMyCoursesComponent  {
  courses:  CourseIntro[] = [];
  studentId!: string;
    errorMessage: string | null = null;
      loading = true;
  constructor(
    public router: Router,
    public courseService: CourseService
  ) {}



    ngOnInit() {
    this.studentId = localStorage.getItem('userId') || '';
    if (this.studentId) {
      this.loadCourses();
    } else {
      this.errorMessage = 'Admin ID is missing. Please log in again.';
      this.loading = false;
    }
  }

  loadCourses() {
    this.courseService.getPurchasedCourses().subscribe((res) => {
      console.log('📦 API response:', res);
      this.courses = res.myCourses; // ✅ fixed here
    });
  }

goToCourse(course: CourseIntro): void {
  if (!course?.title || !course?.courseId) {
    console.error('Course title or ID missing');
    return;
  }

  const slug = this.slugify(course.title);
  this.router.navigate(['/student/course/learning', slug, 'home'], {
    queryParams: { courseId: course.courseId } // ✅ use courseId here
  });
}

// Optional slugify function (basic)
slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, '');   // remove leading/trailing hyphens
}

}

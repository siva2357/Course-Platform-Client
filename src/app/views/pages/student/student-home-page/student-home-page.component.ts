import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent {

  constructor(public router:Router, public courseService:CourseService){

  }

courses: Course[] = []; // Make sure this is defined


ngOnInit() {
  this.loadCourses();
}

loadCourses() {
  this.courseService.getAllCourses().subscribe((res) => {
    this.courses = res.courses; // or res.items depending on your API
  });
}

goToCourseDetails(course: Course) {
  const encodedName = encodeURIComponent(course.landingPage.courseTitle);
  const urlTree = this.router.createUrlTree(['/student/course', course._id, encodedName]);
  const fullUrl = this.router.serializeUrl(urlTree);
  window.open(fullUrl, '_blank'); // ✅ Open in new tab
}




handleAddToCart(courseId: string): void {
  this.courseService.addToCart(courseId).subscribe({
    next: (res) => {
      console.log('Cart add response:', res);
      // 🔔 Notify header to refresh cart count
      this.courseService.triggerCartUpdate(); // << ADD THIS LINE
    },
    error: (err) => {
      console.error('Add to cart error:', err);
    }
  });
}


}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent {

  constructor(public router:Router, public courseService:CourseService){}

courses: Course[] = []; // Make sure this is defined


ngOnInit() {
  this.loadCourses();
    this.splitCoursesIntoChunks();
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

  categories: Category[] = [
    'Angular', 'React', 'Vue', 'Node.js', 'Python', 'Java', 'Django', 'MongoDB', 'DevOps', 'Full Stack'
  ].map(name => ({
    name,
    courses: Array.from({ length: 20 }).map((_, i) => ({
      title: `${name} Course ${i + 1}`,
      description: `Description for ${name} Course ${i + 1}`,
      image: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744000400/all-courses-header-01_1_vcgijc.webp'
    })),
    courseChunks: [] // will be filled below
  }));



    // ✅ Utility: Split into chunks of 6

  splitCoursesIntoChunks() {
    for (const category of this.categories) {
      category.courseChunks = [];
      for (let i = 0; i < category.courses.length; i += 4) {
        category.courseChunks.push(category.courses.slice(i, i + 4));
      }
    }
  }

  getCarouselId(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-') + '-carousel';
  }


}

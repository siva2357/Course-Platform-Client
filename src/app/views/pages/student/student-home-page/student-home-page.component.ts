import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Course, CoursePreview } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent {

  constructor(public router:Router, public courseService:CourseService){}

categories: Category[] = [];


ngOnInit() {
  this.loadCourses();
}

loadCourses() {
  this.courseService.getPublishedCourses().subscribe((res: any) => {
    const categorized = res.categorizedCourses;

    this.categories = Object.keys(categorized).map((categoryName) => {
      const courses: CoursePreview[] = categorized[categoryName].map((course: any) => ({
        _id: course._id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        preview: course.preview,
        createdByName: course.createdByName,
        createdAt: course.createdAt,
        purchased: course.purchased // ✅ set purchased flag
      }));

      return {
        name: categoryName,
        courses,
        courseChunks: this.chunkCourses(courses, 4)
      };
    });
  });
}




chunkCourses(courses: CoursePreview[], size: number): CoursePreview[][] {
  const chunks: CoursePreview[][] = [];
  for (let i = 0; i < courses.length; i += size) {
    chunks.push(courses.slice(i, i + size));
  }
  return chunks;
}


  getCarouselId(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-') + '-carousel';
  }



goToCourseDetails(course: CoursePreview) {
  const slug = this.slugify(course.title);

  const urlTree = this.router.createUrlTree(['/student/course', course._id, slug]);
  const fullUrl = this.router.serializeUrl(urlTree);

  window.open(fullUrl, '_blank');
}

slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // replace spaces and special chars with hyphen
    .replace(/(^-|-$)+/g, '');    // trim leading/trailing hyphens
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



    // ✅ Utility: Split into chunks of 6




}

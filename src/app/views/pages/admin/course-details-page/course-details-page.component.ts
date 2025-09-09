import { CourseService } from 'src/app/core/services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details-page',
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.css']
})
export class CourseDetailsPageComponent implements OnInit {
  courseId: string = '';
  courseDetails: any;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('courseId');
      if (id) {
        this.courseId = id;
        this.loadCourseDetails(id);
      }
    });
  }

  getSafeId(i: number, lectureTitle: string): string {
  if (!lectureTitle) return 'video' + i;
  return 'video' + i + lectureTitle.replace(/\s+/g, '');
}


  loadCourseDetails(id: string): void {
    this.courseService.getCourseDetails(id).subscribe({
      next: (response: any) => {
        if (response.success && response.courseDetails) {
          this.courseDetails = response.courseDetails;
          console.log('Course details loaded:', this.courseDetails);
        } else {
          this.errorMessage = 'Course details not found';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
        this.errorMessage = 'Error fetching course details';
        this.loading = false;
      }
    });
  }
}

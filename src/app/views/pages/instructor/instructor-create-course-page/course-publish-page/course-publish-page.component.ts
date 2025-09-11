import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-publish-page',
  templateUrl: './course-publish-page.component.html',
  styleUrls: ['./course-publish-page.component.css']
})
export class CoursePublishPageComponent {
  isUpdating: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  courseId!: string;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
  }


    submitReview() {
      this.courseService.SubmitCourseReview(this.courseId).subscribe({
        next: () => {
          this.successMessage = 'Profile submitted  successfully.';

          this.isUpdating = false;
          this.router.navigate([`instructor/course`,]);
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.errorMessage = 'Failed to update profile. Please try again later.';
          this.isUpdating = false;
        },
      });
    }



      previous() {
      this.router.navigate([`instructor/course/${this.courseId}/create/course-pricing-page`]);
    }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_TOOLBAR, Editor, Toolbar} from 'ngx-editor';
import { Course, LandingPage } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';
import { Validators } from '@angular/forms'; // ✅ Correct Angular Validators


@Component({
  selector: 'app-course-landing-page',
  templateUrl: './course-landing-page.component.html',
  styleUrls: ['./course-landing-page.component.css'],
})
export class CourseLandingPageComponent implements OnInit, OnDestroy {
  landingPageDetails!: FormGroup;
  public editor!: Editor;
  toolbar: Toolbar = DEFAULT_TOOLBAR;
  isUpdating: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  courseId!: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private storage: AngularFireStorage,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.editor = new Editor();
     this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
  if (this.courseId) {
    this.loadLandingPage();
  }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  initializeForm() {
    this.landingPageDetails = this.fb.group({
      courseTitle: ['', Validators.required],
      courseCategory: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseThumbnail: ['', Validators.required],
      coursePreview: ['', [Validators.required]],
    });
  }


  loadLandingPage() {
  this.courseService.getCourseLanding(this.courseId).subscribe({
    next: (landingPage) => {
      this.landingPageDetails.patchValue({
        courseTitle: landingPage.courseTitle,
        courseCategory: landingPage.courseCategory,
        courseDescription: landingPage.courseDescription,
        courseThumbnail: landingPage.courseThumbnail,
        coursePreview: landingPage.coursePreview
      });
    },
    error: (err) => {
      console.error('Failed to load landing page', err);
      this.errorMessage = 'Failed to load landing page data.';
    }
  });
}


  postLandingPage() {
  this.submitted = true;

  if (this.landingPageDetails.invalid) {
    this.landingPageDetails.markAllAsTouched();
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

    const formValue = this.landingPageDetails.getRawValue();
    const courseData: LandingPage = {
      courseTitle: formValue.courseTitle,
      courseCategory: formValue.courseCategory,
      courseDescription: formValue.courseDescription,
      courseThumbnail: formValue.courseThumbnail,
      coursePreview: formValue.coursePreview,
    };
    this.isUpdating = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.courseService.postCourseLanding(this.courseId, courseData).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully.';
        setTimeout(() => {
          this.landingPageDetails.markAsPristine();
          this.landingPageDetails.markAsUntouched();
        });
        this.isUpdating = false;
        this.router.navigate([
          `instructor/course/${this.courseId}/create/plan-your-course`,
        ]);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.errorMessage = 'Failed to update profile. Please try again later.';
        this.isUpdating = false;
      },
    });
  }
}

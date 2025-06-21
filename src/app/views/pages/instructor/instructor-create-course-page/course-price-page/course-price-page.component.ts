import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Price } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-price-page',
  templateUrl: './course-price-page.component.html',
  styleUrls: ['./course-price-page.component.css']
})
export class CoursePricePageComponent implements OnInit{
  coursePriceDetails!: FormGroup;
  isUpdating: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  courseId!: string;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
      if (this.courseId) {
    this.loadCoursePrice();
  }  }


  initializeForm() {
    this.coursePriceDetails = this.fb.group({
      currency: ['', Validators.required],
      pricingTier: ['', Validators.required],
  amount: ['', [Validators.required, Validators.min(1)]] // ✅ this is essential
    });
  }

postCoursePrice() {
  if (this.coursePriceDetails.invalid) {
    this.coursePriceDetails.markAllAsTouched();
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

  const formValue = this.coursePriceDetails.getRawValue();

  const courseData: Price = {
    currency: formValue.currency,
    pricingTier: formValue.pricingTier,
    amount: formValue.amount,
  };

  this.isUpdating = true;
  this.isLoading = true; // 👈 add this
  this.errorMessage = '';
  this.successMessage = '';

  this.courseService.postCoursePrice(this.courseId, courseData).subscribe({
    next: () => {
      this.successMessage = 'Profile updated successfully.';
      setTimeout(() => {
        this.coursePriceDetails.markAsPristine();
        this.coursePriceDetails.markAsUntouched();
      });
      this.isUpdating = false;
      this.isLoading = false; // 👈 stop spinner
      this.router.navigate([`instructor/course/${this.courseId}/create/publish-your-page`]);
    },
    error: (err) => {
      console.error('Update failed:', err);
      this.errorMessage = 'Failed to update profile. Please try again later.';
      this.isUpdating = false;
      this.isLoading = false; // 👈 stop spinner
    },
  });
}

  loadCoursePrice() {
  this.courseService.getCoursePrice(this.courseId).subscribe({
    next: (coursePlan) => {
      this.coursePriceDetails.patchValue({
        currency: coursePlan.currency,
        pricingTier: coursePlan.pricingTier,
         amount: coursePlan. amount
      });
    },
    error: (err) => {
      console.error('Failed to load course plan', err);
      this.errorMessage = 'Failed to load course plan data.';
    }
  });
}



      previous() {
      this.router.navigate([`instructor/course/${this.courseId}/create/create-your-content`]);
    }



}

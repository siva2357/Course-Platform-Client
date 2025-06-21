import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePlan } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-planning-page',
  templateUrl: './course-planning-page.component.html',
  styleUrls: ['./course-planning-page.component.css'],
})
export class CoursePlanningPageComponent implements OnInit {
  coursePlanDetails!: FormGroup;
  isUpdating = false;
  errorMessage = '';
  isLoading = false;
  successMessage = '';
  courseId!: string;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;
      if (this.courseId) {
    this.loadCoursePlan();
  }
  }

  initializeForm(): void {
    this.coursePlanDetails = this.fb.group({
      learningObjectives: this.fb.array([
        this.fb.control('', Validators.required),
      ]),
      courseRequirements: this.fb.array([
        this.fb.control('', Validators.required),
      ]),
      courseLevel: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  // Getters for form arrays
get learningObjectives(): FormArray {
  return this.coursePlanDetails?.get('learningObjectives') as FormArray;
}

get courseRequirements(): FormArray {
  return this.coursePlanDetails?.get('courseRequirements') as FormArray;
}

get courseLevel(): FormArray {
  return this.coursePlanDetails?.get('courseLevel') as FormArray;
}


  // Add controls
  addObjectives(): void {
    this.learningObjectives.push(this.fb.control('', Validators.required));
  }

  addRequirements(): void {
    this.courseRequirements.push(this.fb.control('', Validators.required));
  }

  addCourseLevel(): void {
    this.courseLevel.push(this.fb.control('', Validators.required));
  }

  // Remove controls
  removeObjectives(index: number): void {
    if (this.learningObjectives.length > 1) {
      this.learningObjectives.removeAt(index);
    }
  }

  removeRequirements(index: number): void {
    if (this.courseRequirements.length > 1) {
      this.courseRequirements.removeAt(index);
    }
  }

  removeCourseLevel(index: number): void {
    if (this.courseLevel.length > 1) {
      this.courseLevel.removeAt(index);
    }
  }


loadCoursePlan() {
  this.courseService.getCoursePlan(this.courseId).subscribe({
    next: (coursePlan) => {
      // Clear existing controls
      this.setFormArray(this.learningObjectives, coursePlan.learningObjectives);
      this.setFormArray(this.courseRequirements, coursePlan.courseRequirements);
      this.setFormArray(this.courseLevel, coursePlan.courseLevel);
    },
    error: (err) => {
      console.error('Failed to load course plan', err);
      this.errorMessage = 'Failed to load course plan data.';
    }
  });
}

// Utility to reset and populate a FormArray
private setFormArray(formArray: FormArray, values: string[]): void {
  formArray.clear();  // remove existing controls

  if (values && values.length > 0) {
    values.forEach(value => formArray.push(this.fb.control(value, Validators.required)));
  } else {
    // 👇 Ensure at least one control exists
    formArray.push(this.fb.control('', Validators.required));
  }
}


  // Submit logic
  postPlanPage(): void {
  this.submitted = true; // ⬅️ mark that user tried to submit

  if (this.coursePlanDetails.invalid) {
    this.coursePlanDetails.markAllAsTouched();
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }
    const formValue = this.coursePlanDetails.getRawValue();
    const courseData: CoursePlan = {
      learningObjectives: formValue.learningObjectives,
      courseRequirements: formValue.courseRequirements,
      courseLevel: formValue.courseLevel,
    };

    this.isUpdating = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.courseService.postCoursePlan(this.courseId, courseData).subscribe({
      next: () => {
        this.successMessage = 'Course plan updated successfully.';
        setTimeout(() => {
          this.coursePlanDetails.markAsPristine();
          this.coursePlanDetails.markAsUntouched();
        });
        this.isUpdating = false;
        this.router.navigate([ `instructor/course/${this.courseId}/create/create-your-content` ]);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.errorMessage =
          'Failed to update course plan. Please try again later.';
        this.isUpdating = false;
      },
    });
  }

  previous() {
    this.router.navigate([`instructor/course/${this.courseId}/create/course-landing-page`]);
  }



  submitted = false;




}

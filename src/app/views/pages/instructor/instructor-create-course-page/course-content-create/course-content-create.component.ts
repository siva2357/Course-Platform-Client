import { Section, Lecture } from './../../../../../core/models/course.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculum } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-content-create',
  templateUrl: './course-content-create.component.html',
  styleUrls: ['./course-content-create.component.css']
})
export class CourseContentCreateComponent implements OnInit{
  courseContentDetails!: FormGroup;
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
    this.loadCurriculum();
  }
  }



    initializeForm(): void {
      this.courseContentDetails = this.fb.group({
  sections: this.fb.array([
    this.fb.group({
      sectionTitle: ['', Validators.required],
      lectures: this.fb.array([
        this.fb.group({
          lectureTitle: ['', Validators.required],
          lectureDescription: ['', Validators.required],
          lectureContent: ['', Validators.required],
          lectureResources: ['', Validators.required],
        })
      ])
    })
  ])
});

    }





  get sections(): FormArray {
    return this.courseContentDetails.get('sections') as FormArray;
  }

    // Add controls
addSections(): void {
  this.sections.push(
    this.fb.group({
      sectionTitle: ['', Validators.required],
      lectures: this.fb.array([
        this.fb.group({
          lectureTitle: ['', Validators.required],
          lectureDescription: ['', Validators.required],
          lectureContent: ['', Validators.required],
          lectureResources: ['', Validators.required],
        })
      ])
    })
  );
}



      // Remove controls
removeSections(index: number): void {
  if (this.sections.length > 1) {
    this.sections.removeAt(index);
  }
}



lectures(sectionIndex: number): FormArray {
  return this.sections.at(sectionIndex).get('lectures') as FormArray;
}


addLectures(sectionIndex: number): void {
  this.lectures(sectionIndex).push(
    this.fb.group({
      lectureTitle: ['', Validators.required],
      lectureDescription: ['', Validators.required],
      lectureContent: ['', Validators.required],
      lectureResources: ['', Validators.required],
    })
  );
}

removeLectures(sectionIndex: number, lectureIndex: number): void {
  const lecturesArray = this.lectures(sectionIndex);
  if (lecturesArray.length > 1) {
    lecturesArray.removeAt(lectureIndex);
  }
}


    // Submit logic
postContentPage(): void {
  if (this.courseContentDetails.invalid) {
    this.courseContentDetails.markAllAsTouched();
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

  const formValue = this.courseContentDetails.getRawValue();
  const courseData: Curriculum = {
    sections: formValue.sections
  };

  this.isUpdating = true;
  this.errorMessage = '';
  this.successMessage = '';

  this.courseService.postCourseContent(this.courseId, courseData).subscribe({
    next: () => {
      this.successMessage = 'Course plan updated successfully.';
      setTimeout(() => {
        this.courseContentDetails.markAsPristine();
        this.courseContentDetails.markAsUntouched();
      });
      this.isUpdating = false;
      this.router.navigate([`instructor/course/${this.courseId}/create/course-pricing-page`]);
    },
    error: (err) => {
      console.error('Update failed:', err);
      this.errorMessage = 'Failed to update course plan. Please try again later.';
      this.isUpdating = false;
    },
  });
}


loadCurriculum() {
  this.courseService.getCourseContent(this.courseId).subscribe({
    next: (curriculum) => {
      this.sections.clear(); // clear existing form arrays

      curriculum.sections.forEach(section => {
        this.sections.push(this.createSectionGroup(section));
      });
    },
    error: (err) => {
      console.error('Failed to load curriculum', err);
      this.errorMessage = 'Failed to load curriculum data.';
    }
  });
}

createSectionGroup(section: Section): FormGroup {
  return this.fb.group({
    sectionTitle: [section.sectionTitle, Validators.required],
    lectures: this.fb.array(
      section.lectures.map(lecture => this.createLectureGroup(lecture))
    )
  });
}

createLectureGroup(lecture: Lecture): FormGroup {
  return this.fb.group({
    lectureTitle: [lecture.lectureTitle, Validators.required],
    lectureDescription: [lecture.lectureDescription, Validators.required],
    lectureContent: [lecture.lectureContent, Validators.required],
    lectureResources: [lecture.lectureResources, Validators.required],
  });
}




    previous() {
      this.router.navigate([`instructor/course/${this.courseId}/create/plan-your-course`]);
    }





}

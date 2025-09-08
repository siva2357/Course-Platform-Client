import { Section, Lecture, Curriculum } from './../../../../../core/models/course.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/core/services/course.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Folder } from 'src/app/core/enums/folder.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-course-content-create',
  templateUrl: './course-content-create.component.html',
  styleUrls: ['./course-content-create.component.css']
})
export class CourseContentCreateComponent implements OnInit {
  courseContentDetails!: FormGroup;
  courseId!: string;
  courseTitle!: string;
  fullName!: string;
  instructorId!: string;

  isUpdating = false;
  errorMessage = '';
  successMessage = '';

  // File previews and upload tracking
  lectureFiles: { [sectionIndex: number]: { [lectureIndex: number]: { fileName: string; url: string; filePath: string } } } = {};

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.instructorId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    this.fullName = this.authService.getFullName() || '';
    this.courseId = this.route.parent?.snapshot.paramMap.get('id')!;

    this.initializeForm();
    if (this.courseId) {
      this.loadLandingPage();
      this.loadCurriculum();
    }
  }

  // ------------------- Form Handling -------------------
  initializeForm(): void {
    this.courseContentDetails = this.fb.group({
      sections: this.fb.array([this.createSectionGroup()])
    });
  }

  get sections(): FormArray {
    return this.courseContentDetails.get('sections') as FormArray;
  }

  lectures(sectionIndex: number): FormArray {
    return this.sections.at(sectionIndex).get('lectures') as FormArray;
  }

  addSections(): void {
    this.sections.push(this.createSectionGroup());
  }

  removeSections(index: number): void {
    if (this.sections.length > 1) this.sections.removeAt(index);
  }

  addLectures(sectionIndex: number): void {
    this.lectures(sectionIndex).push(this.createLectureGroup());
  }

  removeLectures(sectionIndex: number, lectureIndex: number): void {
    const lecturesArray = this.lectures(sectionIndex);
    if (lecturesArray.length > 1) lecturesArray.removeAt(lectureIndex);
  }

  private createSectionGroup(section?: Section): FormGroup {
    return this.fb.group({
      sectionTitle: [section?.sectionTitle || '', Validators.required],
      lectures: this.fb.array(
        section?.lectures?.map(l => this.createLectureGroup(l)) || [this.createLectureGroup()]
      )
    });
  }

  private createLectureGroup(lecture?: Lecture): FormGroup {
    return this.fb.group({
      lectureTitle: [lecture?.lectureTitle || '', Validators.required],
      lectureDescription: [lecture?.lectureDescription || '', Validators.required],
      lectureContent: [lecture?.lectureContent || '', Validators.required],
    });
  }

  // ------------------- Course Title & Slug -------------------
  private getSanitizedCourseTitle(): string {
    const title = this.courseTitle || 'untitled';
    return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  private getSanitizedSectionTitle(section: FormGroup): string {
    const title = section.get('sectionTitle')?.value || 'untitled';
    return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  // ------------------- Load Landing & Curriculum -------------------
  loadLandingPage() {
    this.courseService.getCourseLanding(this.courseId).subscribe({
      next: (landingPage: any) => {
        this.courseTitle = landingPage.courseTitle;
        console.log('Loaded course title:', this.courseTitle);
      },
      error: (err) => {
        console.error('Failed to load landing page', err);
        this.errorMessage = 'Failed to load landing page data.';
      }
    });
  }

loadCurriculum() {
  this.courseService.getCourseContent(this.courseId).subscribe({
    next: (curriculum: Curriculum) => {
      this.sections.clear();

      if (curriculum.sections?.length) {
        curriculum.sections.forEach((section, sIdx) => {
          const sectionGroup = this.createSectionGroup(section);
          this.sections.push(sectionGroup);

          // Pre-populate lectureFiles
          section.lectures.forEach((lecture, lIdx) => {
            if (lecture.lectureContent?.length) {
              const firstContent = lecture.lectureContent[0]; // ✅ string URL
              if (!this.lectureFiles[sIdx]) this.lectureFiles[sIdx] = {};

              this.lectureFiles[sIdx][lIdx] = {
                fileName: this.extractFileName(firstContent), // ✅ pass string
                url: firstContent,                            // ✅ directly string
                filePath: '' // optional
              };
            }
          });

        });
      } else {
        this.addSections();
      }
    },
    error: (err) => {
      console.error('Failed to load curriculum', err);
      this.errorMessage = 'Failed to load curriculum data.';
    }
  });
}



  // ------------------- File Upload -------------------
  uploadLectureFile(event: any, sectionIndex: number, lectureIndex: number) {
    const file = event.target.files?.[0];
    if (!file) return;

    const courseFolder = this.getSanitizedCourseTitle();
    const sectionGroup = this.sections.at(sectionIndex) as FormGroup;
    const sectionSlug = this.getSanitizedSectionTitle(sectionGroup);

    const filePath = `${Folder.Main_Folder}/${Folder.Instructor_Folder}/${this.fullName}/${Folder.Instructor_Sub_Folder_2}/${courseFolder}/${sectionSlug}/lectures/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().subscribe({
      next: (snapshot) => {
        if (snapshot?.state === 'success') {
          fileRef.getDownloadURL().subscribe(url => {
            if (!this.lectureFiles[sectionIndex]) this.lectureFiles[sectionIndex] = {};
            this.lectureFiles[sectionIndex][lectureIndex] = { fileName: file.name, url, filePath };
            // Patch lectureContent field with uploaded URL
            this.lectures(sectionIndex).at(lectureIndex).get('lectureContent')?.setValue(url);
          });
        }
      },
      error: (err) => console.error('Upload error:', err)
    });
  }

  deleteLectureFile(sectionIndex: number, lectureIndex: number) {
    const lectureFile = this.lectureFiles[sectionIndex]?.[lectureIndex];
    if (!lectureFile) return;

    this.storage.ref(lectureFile.filePath).delete().subscribe({
      next: () => {
        delete this.lectureFiles[sectionIndex][lectureIndex];
        this.lectures(sectionIndex).at(lectureIndex).get('lectureContent')?.setValue('');
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

  // ------------------- Submit -------------------
  postContentPage(): void {
    if (this.courseContentDetails.invalid) {
      this.courseContentDetails.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const formValue = this.courseContentDetails.getRawValue();
    const courseData: Curriculum = { sections: formValue.sections };

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

  // ------------------- Helpers -------------------
  private extractFileName(url: string): string {
    try {
      const decoded = decodeURIComponent(url);
      return decoded.substring(decoded.lastIndexOf('/') + 1).split('?')[0];
    } catch {
      return 'unknown-file';
    }
  }

  previous() {
    this.router.navigate([`instructor/course/${this.courseId}/create/plan-your-course`]);
  }
}

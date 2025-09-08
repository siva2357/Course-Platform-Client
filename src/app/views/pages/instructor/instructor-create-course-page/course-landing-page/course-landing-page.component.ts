import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_TOOLBAR, Editor, Toolbar} from 'ngx-editor';
import { Course, LandingPage } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';
import { Validators } from '@angular/forms'; // ✅ Correct Angular Validators
import { Folder } from 'src/app/core/enums/folder.enum';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';


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
  public ifPreview = false;
  public uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;
  public previewURL: SafeResourceUrl | null = null;
  public fileRef: any;
  public fileType: string | null = null;
  public fileUploadProgress: Observable<number | undefined> | undefined;
  public uploadComplete = false;
  public fullName!:string;
  public instructorId!: string;
  public thumbnailFileData: { fileName: string; url: string; filePath: string } | null = null;
public previewFileData: { fileName: string; url: string; filePath: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private storage: AngularFireStorage,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {

  this.instructorId = localStorage.getItem('userId') || this.authService.getUserId() || '';
  const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
  this.fullName = this.authService.getFullName() || '';

  console.log("User ID:", this.instructorId);
  console.log("User Role:", role);


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



/** Delete Thumbnail */
deleteThumbnail(): void {
  if (this.thumbnailFileData) {
    const { filePath } = this.thumbnailFileData;
    this.storage.ref(filePath).delete().subscribe({
      next: () => {
        console.log('Thumbnail deleted from Firebase Storage');
        this.thumbnailFileData = null;
        this.landingPageDetails.patchValue({ courseThumbnail: '' });
      },
      error: (error) => {
        console.error('Failed to delete thumbnail:', error);
        this.errorMessage = 'Failed to delete thumbnail. Please try again.';
      }
    });
  }
}

/** Delete Preview Video */
deletePreview(): void {
  if (this.previewFileData) {
    const { filePath } = this.previewFileData;
    this.storage.ref(filePath).delete().subscribe({
      next: () => {
        console.log('Preview video deleted from Firebase Storage');
        this.previewFileData = null;
        this.landingPageDetails.patchValue({ coursePreview: '' });
      },
      error: (error) => {
        console.error('Failed to delete preview video:', error);
        this.errorMessage = 'Failed to delete promo video. Please try again.';
      }
    });
  }
}


private getSanitizedCourseTitle(): string {
  const title = this.landingPageDetails.get('courseTitle')?.value || 'untitled';
  return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'); // slugify
}

/** Upload Thumbnail */
uploadThumbnail(event: any) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const courseFolder = this.getSanitizedCourseTitle();
  const filePath = `${Folder.Main_Folder}/${Folder.Instructor_Folder}/${this.fullName}/${Folder.Instructor_Sub_Folder_2}/${courseFolder}/thumbnails/${file.name}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

  this.fileUploadProgress = task.percentageChanges();

  task.snapshotChanges().subscribe({
    next: (snapshot) => {
      if (snapshot?.state === 'success') {
        fileRef.getDownloadURL().subscribe((url) => {
          this.thumbnailFileData = { fileName: file.name, url, filePath };
          this.landingPageDetails.patchValue({ courseThumbnail: url });
        });
      }
    },
    error: (err) => {
      console.error('Thumbnail upload failed', err);
      this.errorMessage = 'Failed to upload thumbnail.';
    }
  });
}

/** Upload Promo Video */
uploadPreview(event: any) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const courseFolder = this.getSanitizedCourseTitle();
  const filePath = `${Folder.Main_Folder}/${Folder.Instructor_Folder}/${this.fullName}/${Folder.Instructor_Sub_Folder_2}/${courseFolder}/previews/${file.name}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

  this.fileUploadProgress = task.percentageChanges();

  task.snapshotChanges().subscribe({
    next: (snapshot) => {
      if (snapshot?.state === 'success') {
        fileRef.getDownloadURL().subscribe((url) => {
          this.previewFileData = { fileName: file.name, url, filePath };
          this.landingPageDetails.patchValue({ coursePreview: url });
        });
      }
    },
    error: (err) => {
      console.error('Preview video upload failed', err);
      this.errorMessage = 'Failed to upload promo video.';
    }
  });
}





     getFileType(file: File): string {
    const mimeType = file.type;
    if (mimeType.startsWith('image/')) {
      return 'image';
    } else if (mimeType.startsWith('video/')) {
      return 'video';
    } else if (mimeType === 'application/pdf') {
      return 'pdf';
    } else if (mimeType.startsWith('audio/')) {
      return 'audio';
    } else {
      return 'unknown';
    }
  }





loadLandingPage() {
  this.courseService.getCourseLanding(this.courseId).subscribe({
    next: (landingPage) => {
      // Patch form values
      this.landingPageDetails.patchValue({
        courseTitle: landingPage.courseTitle,
        courseCategory: landingPage.courseCategory,
        courseDescription: landingPage.courseDescription,
        courseThumbnail: landingPage.courseThumbnail,
        coursePreview: landingPage.coursePreview
      });

      // ✅ Also restore thumbnail + preview objects
      if (landingPage.courseThumbnail) {
        this.thumbnailFileData = {
          fileName: this.extractFileName(landingPage.courseThumbnail),
          url: landingPage.courseThumbnail,
          filePath: this.buildFilePath(
            'thumbnails',
            this.extractFileName(landingPage.courseThumbnail)
          )
        };
      }

      if (landingPage.coursePreview) {
        this.previewFileData = {
          fileName: this.extractFileName(landingPage.coursePreview),
          url: landingPage.coursePreview,
          filePath: this.buildFilePath(
            'previews',
            this.extractFileName(landingPage.coursePreview)
          )
        };
      }
    },
    error: (err) => {
      console.error('Failed to load landing page', err);
      this.errorMessage = 'Failed to load landing page data.';
    }
  });
}

// Extract filename from Firebase URL
private extractFileName(url: string): string {
  try {
    const decoded = decodeURIComponent(url);
    return decoded.substring(decoded.lastIndexOf('/') + 1).split('?')[0];
  } catch {
    return 'unknown-file';
  }
}

// Build filePath (to match delete logic)
private buildFilePath(folder: 'thumbnails' | 'previews', fileName: string): string {
  const courseFolder = this.getSanitizedCourseTitle();
  return `${Folder.Main_Folder}/${Folder.Instructor_Folder}/${this.fullName}/${courseFolder}/${folder}/${fileName}`;
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
      this.successMessage = 'Landing page saved successfully!'; // 🔄 better msg
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
      this.errorMessage = 'Failed to save landing page. Please try again later.';
      this.isUpdating = false;
    },
  });
}

}

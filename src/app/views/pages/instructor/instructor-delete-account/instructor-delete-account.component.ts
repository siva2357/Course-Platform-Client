import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Course, Curriculum, LandingPage } from 'src/app/core/models/course.model';
import { InstructorProfileHeader } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-instructor-delete-account',
  templateUrl: './instructor-delete-account.component.html',
  styleUrls: ['./instructor-delete-account.component.css']
})
export class InstructorDeleteAccountComponent implements OnInit {
  instructorId!: string;
  loading: boolean = true;
  errorMessage: string | null = null;

  userProfile!: InstructorProfileHeader;
  profile: string = '';
uploadedFileData: { fileName: string; url: string; filePath: string }[] = [];

  previewURL: SafeResourceUrl | null = null;
  fileType: string | null = null;
  ifPreview: boolean = false;
   fetchedURL: string | null = null;
  courses: Course[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private profileService: ProfileService,
    private storage: AngularFireStorage,
    private courseService: CourseService
  ) {}


    ngOnInit(): void {
    this.instructorId = localStorage.getItem('userId') || '';
    if (this.instructorId) {
      this.getInstructorDetails();
      this.getInstructorCourseFiles();
    }
  }



getInstructorDetails() {
  if (!this.instructorId) return;

  this.profileService.getInstructorProfileById(this.instructorId).subscribe({
    next: (data: InstructorProfileHeader) => {
      this.userProfile = data;
      const profilePic = this.userProfile?.profilePicture;

      if (profilePic && profilePic.url) {
        this.profile = profilePic.url;
        // Store file metadata as an array for deletion
        this.uploadedFileData = [{
          fileName: profilePic.fileName,
          url: profilePic.url,
          filePath: decodeURIComponent(profilePic.url.split('/o/')[1].split('?alt=media')[0])
        }];
      }

      this.loading = false;
    },
    error: (error) => this.handleError(error)
  });
}


getInstructorCourseFiles() {
  if (!this.instructorId) return;

  this.loading = true;
  this.errorMessage = null;

  this.courseService.getInstructorCourseFiles().subscribe({
    next: (response) => {
      this.courses = response.courses || [];   // ✅ backend sends "courses"
      console.log('All instructor courses:', this.courses);
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching instructor course files:', err);
      this.errorMessage = 'Could not load course files.';
      this.loading = false;
    }
  });
}





deleteProfilePicture(): Observable<void> {
  return new Observable((observer) => {
    if (!this.profile) {
      observer.next();
      observer.complete();
      return;
    }

    const filePath = decodeURIComponent(this.profile.split('/o/')[1].split('?alt=media')[0]);
    this.storage.ref(filePath).delete().subscribe({
      next: () => {
        console.log("Profile picture deleted");
        this.profile = '';
        observer.next();
        observer.complete();
      },
      error: (err) => {
        console.error("Failed to delete profile picture:", err);
        observer.error(err);
      }
    });
  });
}



deleteAllCourseFiles(files: { filePath: string }[]): Observable<void> {
  return new Observable((observer) => {
    if (!files || !files.length) {
      observer.next();
      observer.complete();
      return;
    }

    let completed = 0;

    files.forEach((file) => {
      if (!file.filePath) {
        completed++;
        this.checkComplete(completed, files.length, observer);
        return;
      }

      this.storage.ref(file.filePath).delete().subscribe({
        next: () => {
          completed++;
          this.checkComplete(completed, files.length, observer);
        },
        error: (err) => {
          console.error('Failed to delete file:', file.filePath, err);
          completed++;
          this.checkComplete(completed, files.length, observer);
        }
      });
    });
  });
}




private checkComplete(completed: number, total: number, observer: any) {
  if (completed === total) {
    observer.next();
    observer.complete();
  }
}


private extractFilePaths(courses: any[]): { filePath: string }[] {
  const files: { filePath: string }[] = [];

  courses.forEach(course => {
    // Thumbnail
    if (course.courseThumbnail) {
      files.push({ filePath: this.extractPathFromUrl(course.courseThumbnail) });
    }

    // Preview
    if (course.coursePreview) {
      files.push({ filePath: this.extractPathFromUrl(course.coursePreview) });
    }

    // Lecture contents
    if (Array.isArray(course.lectureContents)) {
      course.lectureContents.forEach((lecUrl: string) => {
        files.push({ filePath: this.extractPathFromUrl(lecUrl) });
      });
    }
  });

  return files;
}

private extractPathFromUrl(url: string): string {
  try {
    return decodeURIComponent(url.split('/o/')[1].split('?alt=media')[0]);
  } catch (err) {
    console.error("Invalid Firebase URL:", url);
    return '';
  }
}




deleteAccount() {
  if (!this.instructorId) return;
  if (!confirm("Deleting your account is permanent. Continue?")) return;

  this.deleteProfilePicture().subscribe({
    next: () => {
      const allFiles = this.extractFilePaths(this.courses); // ✅ now works
      this.deleteAllCourseFiles(allFiles).subscribe({
        next: () => {
          this.userService.deleteInstructorById(this.instructorId).subscribe({
            next: () => {
              localStorage.clear();
              sessionStorage.clear();
              alert('Account, profile picture, and course files deleted successfully.');
              this.router.navigate(['/login']);
            },
            error: () => alert('Failed to delete account from server.'),
          });
        },
        error: () => alert('Failed to delete course files.'),
      });
    },
    error: () => {
      if (confirm('Failed to delete profile picture. Delete course files and account anyway?')) {
        const allFiles = this.extractFilePaths(this.courses); // ✅ same here
        this.deleteAllCourseFiles(allFiles).subscribe({
          next: () => {
            this.userService.deleteInstructorById(this.instructorId).subscribe({
              next: () => {
                localStorage.clear();
                sessionStorage.clear();
                alert('Account and course files deleted.');
                this.router.navigate(['/login']);
              },
              error: () => alert('Failed to delete account from server.'),
            });
          },
          error: () => alert('Failed to delete course files. Account not deleted.'),
        });
      }
    }
  });
}






  handleError(error: any) {
    console.error('Error fetching instructor details:', error);
    if (error.status === 401) {
      this.errorMessage = 'Unauthorized access. Please log in again.';
    } else {
      this.errorMessage = 'An error occurred while fetching recruiter details.';
    }
    this.loading = false;
  }


}

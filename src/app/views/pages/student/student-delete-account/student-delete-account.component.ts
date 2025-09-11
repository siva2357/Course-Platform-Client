import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { StudentProfileHeader } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-student-delete-account',
  templateUrl: './student-delete-account.component.html',
  styleUrls: ['./student-delete-account.component.css']
})
export class StudentDeleteAccountComponent implements OnInit {
 studentId!: string;
  public errorMessage: string | null = null;
  loading: boolean = true;
  public userDetails: any;
     fetchedURL: string | null = null;


  userProfile!: StudentProfileHeader;
  profile: string = '';
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;
  previewURL: SafeResourceUrl | null = null;
  fileType: string | null = null;
  ifPreview: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.studentId = localStorage.getItem('userId') || '';
    console.log('Student ID:', this.studentId);
     if (this.studentId) {
      this.getStudentDetails();

    }
  }


  getStudentDetails() {
  if (!this.studentId) return;

  this.profileService.getStudentProfileById(this.studentId).subscribe({
    next: (data: StudentProfileHeader) => {
      this.userProfile = data;
      const profilePic = this.userProfile?.profilePicture;

      if (profilePic && profilePic.url) {
        this.profile = profilePic.url;
        // Store file metadata for deletion
        this.uploadedFileData = {
          fileName: profilePic.fileName,
          url: profilePic.url,
          // Extract path from Firebase URL
          filePath: decodeURIComponent(profilePic.url.split('/o/')[1].split('?alt=media')[0])
        };
      }

      this.loading = false;
    },
    error: (error) => this.handleError(error)
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
        return 'unknown'; // For other file types (could be handled further)
      }
    }

    deletePreviewWrapper(): Observable<void> {
  return new Observable((observer) => {
    this.previewURL = null;
    this.fileType = null;


    if (!this.uploadedFileData?.filePath) {
      observer.next(); // nothing to delete, continue
      observer.complete();
      return;
    }

    this.storage.ref(this.uploadedFileData.filePath).delete().subscribe({
      next: () => {
        console.log("File deleted from Firebase Storage");
        this.uploadedFileData = null;
        this.ifPreview = false;
        this.profile = ''; // clear profile URL
        observer.next();
        observer.complete();
      },
      error: (error) => {
        console.error("Error deleting file from Firebase Storage:", error);
        this.errorMessage = "Failed to delete the file. Please try again.";
        observer.error(error);
      }
    });
  });
}







deleteAccount() {
  if (!this.studentId) return;

  if (!confirm("Deleting your account is permanent. Continue?")) return;

  this.loading = true; // show loader

  this.deletePreviewWrapper().pipe(
    switchMap(() =>
      this.userService.deleteStudentById(this.studentId)
    ),
    catchError((err) => {
      // If profile pic deletion fails, confirm to continue
      if (confirm('Failed to delete profile picture. Delete projects and account anyway?')) {
        return this.userService.deleteStudentById(this.studentId);
      }
      return of(null); // stop chain if canceled
    })
  ).subscribe({
    next: () => {
      localStorage.clear();
      sessionStorage.clear();
      this.loading = false;
      alert('Account, profile picture, and portfolio deleted successfully.');
      this.router.navigate(['/login']);
    },
    error: () => {
      this.loading = false;
      alert('Failed to delete account from server.');
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

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Folder } from 'src/app/core/enums/folder.enum';
import { ProfileUpload } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-student-profile-update',
  templateUrl: './student-profile-update.component.html',
  styleUrls: ['./student-profile-update.component.css']
})
export class StudentProfileUpdateComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileUploadForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
 studentId!: string;
  fullName!: string;

  public profile!: ProfileUpload;

  ifPreview: boolean = false;
  ifFetched: boolean = false;
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;
  fetchedURL: string | null = null;
  previewURL: SafeResourceUrl | null = null;
  fileType: string | null = null;
  isUpdating = false;
  fileUploadProgress: Observable<number | undefined> | undefined;
  uploadComplete = false;
  fileRef: any;
  isEditMode: boolean = false;

  profileActive: boolean = true;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService:ProfileService,
    private storage: AngularFireStorage,  // CRUD Service
    private domSanitizer: DomSanitizer,
    private authService: AuthService,

  ) {
  }

  ngOnInit() {
    this. studentId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
        this.fullName = this.authService.getFullName() ||''  // e.g. "Jane Doe"

    if (this. studentId && role === 'student') {
      this.loadStudentProfile();
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }
  }


initializeForm() {
  this.profileUploadForm = this.fb.group({
     profilePicture: [null, Validators.required], // must be a file object or null
  });

  // Set fetchedURL for preview only, do not patch the form control
  if (this.profile && this.profile.profilePicture && this.profile.profilePicture.url) {
    this.fetchedURL = this.profile.profilePicture.url;
    this.ifFetched = true;
  }
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


onFileChange(event: any, filePath: string): void {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const newFilePath = `${Folder.Main_Folder}/${Folder.Student_Folder}/${this.fullName}/${Folder.Student_Sub_Folder_1}/${file.name}`;
  const newFileRef = this.storage.ref(newFilePath);

  if (filePath) {
    console.log("Deleting old file:", filePath);

    this.deleteprojectFile(filePath).subscribe({
      next: () => {
        console.log("Old file deleted successfully. Proceeding with new file upload.");

        // Patch form control here before upload to enable Update button
        this.profileUploadForm.patchValue({ profilePicture: file });
        this.profileUploadForm.get('profilePicture')?.markAsDirty();
        this.profileUploadForm.get('profilePicture')?.updateValueAndValidity();

        // Update preview URL so the UI updates
        const reader = new FileReader();
        reader.onload = () => {
          this.previewURL = reader.result as string;
          this.ifPreview = true;
          this.fetchedURL = null;  // Clear old fetched URL
        };
        reader.readAsDataURL(file);

        this.uploadNewFile(newFilePath, newFileRef, file);
      },
      error: (error) => {
        console.error("Error deleting old file. New file upload aborted.", error);
        return;
      }
    });
  } else {
    // Patch form control here before upload to enable Update button
    this.profileUploadForm.patchValue({ profilePicture: file });
    this.profileUploadForm.get('profilePicture')?.markAsDirty();
    this.profileUploadForm.get('profilePicture')?.updateValueAndValidity();

    // Update preview URL so the UI updates
    const reader = new FileReader();
    reader.onload = () => {
      this.previewURL = reader.result as string;
      this.ifPreview = true;
      this.fetchedURL = null;  // Clear old fetched URL
    };
    reader.readAsDataURL(file);

    // If no old file, directly upload the new file
    this.uploadNewFile(newFilePath, newFileRef, file);
  }
}


      uploadNewFile(filePath: string, fileRef: any, file: File) {
        const task = this.storage.upload(filePath, file);
        this.fileUploadProgress = task.percentageChanges();
        this.ifPreview = true;

        // Show file preview
        this.previewURL = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
        this.fileType = this.getFileType(file);

        task.snapshotChanges().subscribe({
          next: (snapshot) => {
            if (snapshot?.state === 'success') {
              fileRef.getDownloadURL().subscribe((url: string) => {
                console.log('New file uploaded successfully. URL:', url);
                this.uploadedFileData = { fileName: file.name, url: `${url}?t=${new Date().getTime()}`, filePath: filePath };
                this.uploadComplete = true;
              });
            }
          },
          error: (error) => {
            console.error('Upload error:', error);
            this.errorMessage = 'File upload failed. Please try again.';
          }
        });
      }

      deleteprojectFile(filePath: string): Observable<void> {
        if (!filePath) {
          console.error("No file path provided for deletion.");
          return throwError(() => new Error("No file path provided for deletion."));
        }

        const correctedFilePath = `${Folder.Main_Folder}/${Folder.Student_Folder}/${this.fullName}/${Folder.Student_Sub_Folder_1}/${filePath}`;

        return this.storage.ref(correctedFilePath).delete();
      }



loadStudentProfile(): void {
  this.isLoading = true;

  this.profileService.getStudentProfilePicture(this.studentId).subscribe({
    next: (data) => {
      this.isLoading = false;
      this.profile = data;
      this.fetchedURL =data.profilePicture.url;
      this.initializeForm();
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = 'Error loading profile.';
      console.error(err);
    }
  });
}


private hasValidExtension(url: string, validExtensions: string[]): boolean {
  const ext = url.split('?')[0].toLowerCase();
  const extension = ext.split('.').pop() || '';
  return validExtensions.includes(extension);
}


isImage(url: string): boolean {
  return this.hasValidExtension(url, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
}

isVideo(url: string): boolean {
  return this.hasValidExtension(url, ['mp4', 'webm', 'ogg']);
}

isAudio(url: string): boolean {
  return this.hasValidExtension(url, ['mp3']);
}

isPDF(url: string): boolean {
  return this.hasValidExtension(url, ['pdf']);
}

getFileExtension(url: string): string {
  const ext = url.split('?')[0].toLowerCase();
  return ext.split('.').pop() || 'unknown';
}

updateProfileImage()  {
    if (this.profileUploadForm.valid) {
      const formValue = this.profileUploadForm.getRawValue();
      console.log('Raw Form Data:', formValue);

      const updatedProfileData: ProfileUpload = {
          profilePicture: this.uploadedFileData
            ? this.uploadedFileData
            : this.profile.profilePicture,
      };

      this.isUpdating = true;
      this.profileService.updateStudentProfilePicture(this.studentId, updatedProfileData).subscribe({
  next: (response: any) => {  // <-- Add response param here
          this.resetState();
          console.log('Profile updated successfully!');
          this.uploadedFileData = null;
          this.isUpdating = false;
          this.previewURL = null;
          this.ifPreview = false;
          this.uploadComplete = false;
          this.fileUploadProgress = undefined;
          this.loadStudentProfile();
          this.profileUploadForm.reset();
         setTimeout(() => {
          this.loadStudentProfile();
         }, 500);
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.errorMessage = 'Submission failed. Please try again.';
          this.isUpdating = false;
        },
      });
    } else {
      console.error('Form is invalid:', this.profileUploadForm.errors);
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }

    resetState(): void {
      if (this.fileInput) {
  this.fileInput.nativeElement.value = '';
}
    this.profileUploadForm.get('profilePicture')?.reset();
this.uploadedFileData = null;
this.previewURL = null;
this.ifPreview = false;

  }


  discard() {
    this.profileUploadForm.reset();
    this.uploadedFileData = null;
    this.previewURL = null;
    this.ifPreview = false;
  }


}

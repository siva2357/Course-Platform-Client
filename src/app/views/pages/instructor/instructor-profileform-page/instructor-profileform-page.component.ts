import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SOCIAL_URL_PATTERNS, SocialPlatform } from 'src/app/core/enums/socialMedia.enum';
import { Instructor, InstructorProfile } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserService } from 'src/app/core/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Folder } from 'src/app/core/enums/folder.enum';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DEFAULT_TOOLBAR, Editor, Toolbar } from 'ngx-editor';
@Component({
  selector: 'app-instructor-profileform-page',
  templateUrl: './instructor-profileform-page.component.html',
  styleUrls: ['./instructor-profileform-page.component.css']
})
export class InstructorProfileformPageComponent implements  OnInit, OnDestroy{
  profileDetailsForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  instructorId!: string;
  public instructorDetails! :Instructor;
  public fullName!:string;

  ifPreview = false;
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;
  previewURL: SafeResourceUrl | null = null;
  fileRef: any;
  fileType: string | null = null;
  uploadComplete = false;
  fileUploadProgress: Observable<number | undefined> | undefined;


  public editor!: Editor;
  toolbar: Toolbar = DEFAULT_TOOLBAR;

  platforms = Object.values(SocialPlatform);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private profileService:ProfileService,
    private userService:UserService,
    private storage: AngularFireStorage,  // CRUD Service
    private domSanitizer: DomSanitizer

  ) {
  }

  ngOnInit() {
        // Get the userId and role from localStorage or AuthService
        this.instructorId = localStorage.getItem('userId') || this.authService.getUserId() || '';
        const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
        this.fullName = this.authService.getFullName() ||''  // e.g. "Jane Doe"


        console.log("User ID:", this.instructorId);
        console.log("User Role:", role); // Log the user role for debugging

        if (this.instructorId && role) {
            this.loadInstructorProfile();
          }else {
            this.errorMessage = 'User ID or Role is not available.';
          }
          this.initializeForm();
          this.editor = new Editor();

        }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  initializeForm() {
    this.profileDetailsForm = this.fb.group({
      _id: [null],
      fullName: [{ value: '', disabled: true }],
      userName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      gender: ['', Validators.required],
      bioDescription: ['', [Validators.required]],
      profilePicture: [null, Validators.required], // Consider handling file upload separately
      socialLinks: this.fb.array([ this.createSocialLink()])
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

onFileChange(event: any): void {
  const file = event.target.files && event.target.files[0];
  if (file) {
    const filePath = `${Folder.Main_Folder}/${Folder.Instructor_Folder}/${this.fullName}/${Folder.Instructor_Sub_Folder_1}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.previewURL = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
    this.fileType = this.getFileType(file);
    this.fileUploadProgress = task.percentageChanges();
    this.ifPreview = true;

    task.snapshotChanges().subscribe({
      next: (snapshot) => {
        if (snapshot?.state === 'success') {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded successfully. URL:', url);
            this.uploadedFileData = { fileName: file.name, url: url, filePath: filePath };
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
}


  deletePreview(): void {
    this.previewURL = null;
    this.fileType = null;
    this.fileUploadProgress = undefined;
    this.uploadComplete =false;

    if (this.uploadedFileData) {
      const { filePath } = this.uploadedFileData;

      this.storage.ref(filePath).delete().subscribe({
        next: () => {
          console.log('File deleted from Firebase Storage');
          this.uploadedFileData = null;
          this.ifPreview = false;
        },
        error: (error) => {
          console.error('Error deleting file from Firebase Storage:', error);
          this.errorMessage = 'Failed to delete the file. Please try again.';
        }
      });
    }
  }

  loadInstructorProfile() {
    this.isLoading = true;
    this.userService.getInstructorById(this.instructorId).subscribe(
      (data:Instructor) => {
        console.log('Recruiter profile details:', data);
        if (data) {
          this.instructorDetails = data;
          this.profileDetailsForm.patchValue({
            email: data.registrationDetails?.email || '',
            fullName: data.registrationDetails?.fullName || '',
            userName: data.registrationDetails?.userName || '',

          });
        } else {
          this.errorMessage = 'No profile data found';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching profile data', error);
        this.errorMessage = 'Error fetching profile details.';
        this.isLoading = false;
      }
    );
  }


submitProfile() {
  if (this.profileDetailsForm.invalid) {
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

  const formValue = this.profileDetailsForm.value;
  const email = this.profileDetailsForm.get('email')?.value;
  const fullName = this.profileDetailsForm.get('fullName')?.value;
  const userName = this.profileDetailsForm.get('userName')?.value;

  const profileData: InstructorProfile = {
    profileDetails: {
      fullName: fullName,
      userName: userName,
      email: email,
      gender: formValue.gender,
      socialMedia: formValue.socialLinks,
      bioDescription: formValue.bioDescription,
      profilePicture: this.uploadedFileData || { fileName: '', url: '' },
    }
  };

  this.isSubmitting = true;
  this.errorMessage = '';
  this.successMessage = '';

  this.profileService.postInstructorProfile(profileData).subscribe({
    next: () => {
      this.profileDetailsForm.reset();
      this.uploadedFileData = null;
      this.isSubmitting = false;
      this.previewURL = null;
      this.ifPreview = false;
      this.uploadComplete = false;
      this.fileUploadProgress = undefined;
      this.router.navigate(['instructor']);
    },
    error: (error) => {
      console.error('Error updating profile', error);
      this.errorMessage = 'Failed to update profile. Please try again.';
      this.isSubmitting = false;
    }
  });
}



  confirmDiscard() {
    if (confirm("Are you sure you want to discard the changes?")) {
      this.discard();
    }
  }

  // Reset the form and uploaded data
  discard() {
    this.profileDetailsForm.reset();
    this.uploadedFileData = null;
    this.previewURL = null;
  }


get socialLinks(): FormArray {
  return this.profileDetailsForm.get('socialLinks') as FormArray;
}


createSocialLink(): FormGroup {
  return this.fb.group({
    platform: ['', [Validators.required]],
    url: ['', [Validators.required]]
  });
}


addSocialLink(): void {
  this.socialLinks.push(this.createSocialLink());
}

removeSocialLink(index: number): void {
  this.socialLinks.removeAt(index);
}


validateUrl(index: number): void {
  const controlGroup = this.socialLinks.at(index);
  const platform = controlGroup.get('platform')?.value;
  const url = controlGroup.get('url')?.value;

  if (platform && url && SOCIAL_URL_PATTERNS[platform as SocialPlatform]) {
    const pattern = SOCIAL_URL_PATTERNS[platform as SocialPlatform];
    const isValid = pattern.test(url);
    controlGroup.get('url')?.setErrors(isValid ? null : { invalidUrl: true });
  }
}



}

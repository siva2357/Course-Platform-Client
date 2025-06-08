import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicProfile} from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserService } from 'src/app/core/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer} from '@angular/platform-browser';
import { DEFAULT_TOOLBAR, Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-student-basic-details',
  templateUrl: './student-basic-details.component.html',
  styleUrls: ['./student-basic-details.component.css']
})
export class StudentBasicDetailsComponent implements OnInit, OnDestroy {
  basicDetailsForm!: FormGroup;
  isUpdating: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  studentId!: string;
  public studentDetails!: BasicProfile;
  public fullName!: string;

  public editor!: Editor;
  toolbar: Toolbar = DEFAULT_TOOLBAR;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService,
    private storage: AngularFireStorage, // CRUD Service
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Get the userId and role from localStorage or AuthService
    this.studentId =
      localStorage.getItem('userId') || this.authService.getUserId() || '';
    const role =
      localStorage.getItem('userRole') || this.authService.getRole() || '';
    this.fullName = this.authService.getFullName() || ''; // e.g. "Jane Doe"

    console.log('User ID:', this.studentId);
    console.log('User Role:', role); // Log the user role for debugging

    if (this.studentId && role) {
      this.loadStudentProfile();
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }
    this.initializeForm();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  initializeForm() {
    this.basicDetailsForm = this.fb.group({
      _id: [null],
      fullName: [{ value: '', disabled: true }],
      userName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      gender: ['', Validators.required],
      bioDescription: ['', [Validators.required]],
    });
  }

loadStudentProfile() {
  this.isLoading = true;
  this.profileService.getStudentBasicDetails(this.studentId).subscribe({
    next: (data: BasicProfile) => {
      console.log('Recruiter profile details:', data);
      if (data) {
        this.studentDetails = data;

        // Temporarily enable disabled fields to allow patching
        this.basicDetailsForm.get('fullName')?.enable({ emitEvent: false });
        this.basicDetailsForm.get('email')?.enable({ emitEvent: false });

        // Populate form values
        this.basicDetailsForm.patchValue({
          fullName: data.fullName,
          userName: data.userName,
          email: data.email,
          gender: data.gender,
          bioDescription: data.bioDescription,
        });

        // Disable readonly fields after patching
        this.basicDetailsForm.get('fullName')?.disable({ emitEvent: false });
        this.basicDetailsForm.get('email')?.disable({ emitEvent: false });
      } else {
        this.errorMessage = 'No profile data found';
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error fetching profile data', error);
      this.errorMessage = 'Error fetching profile details.';
      this.isLoading = false;
    }
  });
}


 updateProfile() {
  if (this.basicDetailsForm.invalid) {
    this.basicDetailsForm.markAllAsTouched();
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

  // Get all form values including disabled fields
  const formValue = this.basicDetailsForm.getRawValue();

  const profileData: BasicProfile = {
    fullName: formValue.fullName,
    userName: formValue.userName,
    email: formValue.email,
    gender: formValue.gender,
    bioDescription: formValue.bioDescription,
  };

  this.isUpdating = true;
  this.errorMessage = '';
  this.successMessage = '';

  this.profileService.updateStudentBasicDetails(this.studentId, profileData).subscribe({
    next: () => {
      this.successMessage = 'Profile updated successfully.';
         this.loadStudentProfile(); // Reloads and patches form

      // ✅ Delay form reset to allow form patching to complete
      setTimeout(() => {
        this.basicDetailsForm.markAsPristine();
        this.basicDetailsForm.markAsUntouched();
      });

      this.isUpdating = false;
    },
    error: (err) => {
      console.error('Update failed:', err);
      this.errorMessage = 'Failed to update profile. Please try again later.';
      this.isUpdating = false;
    }
  });
}

  // Reset the form and uploaded data
discard() {
  if (this.studentDetails) {
    // Temporarily enable readonly fields to update form values
    this.basicDetailsForm.get('fullName')?.enable({ emitEvent: false });
    this.basicDetailsForm.get('email')?.enable({ emitEvent: false });

    // Patch values from the original loaded data
    this.basicDetailsForm.patchValue({
      fullName: this.studentDetails.fullName,
      userName: this.studentDetails.userName,
      email: this.studentDetails.email,
      gender: this.studentDetails.gender,
      bioDescription: this.studentDetails.bioDescription,
    });

    // Disable readonly fields again
    this.basicDetailsForm.get('fullName')?.disable({ emitEvent: false });
    this.basicDetailsForm.get('email')?.disable({ emitEvent: false });

    // Reset form state
    this.basicDetailsForm.markAsPristine();  // Important!
    this.basicDetailsForm.markAsUntouched(); // Important!

    // Clear messages
    this.errorMessage = '';
    this.successMessage = '';
  }
}


}







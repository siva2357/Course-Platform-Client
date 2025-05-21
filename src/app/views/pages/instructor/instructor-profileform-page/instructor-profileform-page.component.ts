import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Instructor, InstructorProfile } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-instructor-profileform-page',
  templateUrl: './instructor-profileform-page.component.html',
  styleUrls: ['./instructor-profileform-page.component.css']
})
export class InstructorProfileformPageComponent implements OnInit{
  profileDetailsForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  instructorId!: string;
  public instructorDetails! :Instructor;

  ifPreview = false;
  uploadedFileData: { fileName: string; url: string; filePath: string } | null = null;
  previewURL: SafeResourceUrl | null = null;
  fileRef: any;
  fileType: string | null = null;
  uploadComplete = false;
  fileUploadProgress: Observable<number | undefined> | undefined;





  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private profileService:ProfileService,
    private userService:UserService,

  ) {}

  ngOnInit() {
        // Get the userId and role from localStorage or AuthService
        this.instructorId = localStorage.getItem('userId') || this.authService.getUserId() || '';
        const role = localStorage.getItem('userRole') || this.authService.getRole() || '';

        console.log("User ID:", this.instructorId);
        console.log("User Role:", role); // Log the user role for debugging

        if (this.instructorId && role) {
            this.loadInstructorProfile();
          }else {
            this.errorMessage = 'User ID or Role is not available.';
          }
          this.initializeForm();


        }


  initializeForm() {
    this.profileDetailsForm = this.fb.group({
      _id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required]],
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      experience: ['', [Validators.required]],
      employeeCode: ['', Validators.required],
      bioDescription: ['', [Validators.required]],
      profilePicture: [null, Validators.required] // Consider handling file upload separately
    });
  }


      onFileChange(event: any): void {

    }


  deletePreview(){

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
          console.log("Form is invalid:", this.profileDetailsForm.value);
          this.errorMessage = 'Please fill in all required fields correctly.';
          return;
      }

      // Construct the profile data correctly
      const profileData: InstructorProfile = {
          profileDetails: {
                  firstName: this.profileDetailsForm.value.firstName,
                  lastName: this.profileDetailsForm.value.lastName,
                  userName: this.profileDetailsForm.value.userName,
                  email: this.profileDetailsForm.value.email,
                  gender: this.profileDetailsForm.value.gender,
                  dateOfBirth: this.profileDetailsForm.value.dateOfBirth,
                  phoneNumber: this.profileDetailsForm.value.phoneNumber,
                  city: this.profileDetailsForm.value.city,
                  state: this.profileDetailsForm.value.state,
                  country: this.profileDetailsForm.value.country,
                  pincode: this.profileDetailsForm.value.pincode,
                  bioDescription: this.profileDetailsForm.value.bioDescription,
                  profilePicture: this.uploadedFileData || { fileName: '', url: ''}, // Provide a default value when null
            }
      };

      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.profileService.postInstructorProfile(profileData).subscribe({
          next: () => {
              this.profileDetailsForm.reset();
              this.uploadedFileData = null;
              this.isSubmitting = false;
              this.previewURL = null;
              this.ifPreview = false;
              this.uploadComplete = false;
              this.fileUploadProgress = undefined;
              this.router.navigate(['talent-page/recruiter']);
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

}

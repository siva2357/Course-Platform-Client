import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SOCIAL_URL_PATTERNS, SocialPlatform } from 'src/app/core/enums/socialMedia.enum';
import { StudentProfile, SocialMedia } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';


@Component({
  selector: 'app-student-social-media',
  templateUrl: './student-social-media.component.html',
  styleUrls: ['./student-social-media.component.css']
})
export class StudentSocialMediaComponent implements OnInit {
  socialMediaUpdateForm!: FormGroup;
  isUpdating = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  studentId = '';
  originalSocialLinks: any[] = [];

  platforms = Object.values(SocialPlatform);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const role = localStorage.getItem('userRole') || this.authService.getRole() || '';

    if (this.studentId && role === 'student') {
      this.initializeForm();
      this.loadStudentSocialMedia();
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }
  }

initializeForm(): void {
  this.socialMediaUpdateForm = this.fb.group({
   socialLinks: this.fb.array([ this.createSocialLink()])
  });
}


loadStudentSocialMedia(): void {
  this.isLoading = true;

  this.profileService.getStudentSocialMedia(this.studentId).subscribe({
    next: (data) => {
      this.isLoading = false;

      // Directly use the 'socialMedia' array from response
      const socialLinks = data?.socialMedia || [];
      this.originalSocialLinks = JSON.parse(JSON.stringify(socialLinks)); // deep copy

      const formArray = this.fb.array<FormGroup>([]);
      socialLinks.forEach(link => {
        formArray.push(this.fb.group({
          platform: [link.platform, Validators.required],
          url: [link.url, Validators.required]
        }));
      });

      if (formArray.length === 0) {
        formArray.push(this.createSocialLink());
      }

      this.socialMediaUpdateForm.setControl('socialLinks', formArray);
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = 'Error loading profile.';
      console.error(err);
    }
  });
}




get socialLinks(): FormArray {
  return this.socialMediaUpdateForm.get('socialLinks') as FormArray;
}


  createSocialLink(): FormGroup {
    return this.fb.group({
      platform: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  addSocialLink(): void {
    this.socialLinks.push(this.createSocialLink());
  }

  removeSocialLink(index: number): void {
    if (this.socialLinks.length > 1) {
      this.socialLinks.removeAt(index);
    }
  }

updateSocialMediaForm(): void {
  if (this.socialMediaUpdateForm.invalid) {
    this.errorMessage = 'Please correct errors before saving.';
    this.successMessage = '';
    return;
  }

  const updatedLinks = this.socialMediaUpdateForm.value.socialLinks;

  // Only send update if changes detected:
  if (JSON.stringify(updatedLinks) === JSON.stringify(this.originalSocialLinks)) {
    this.errorMessage = 'No changes detected to update.';
    this.successMessage = '';
    return;
  }

  const payload: SocialMedia = {
    socialMedia: updatedLinks
  };

  this.isUpdating = true;
  this.errorMessage = '';
  this.successMessage = '';

  this.profileService.updateStudentSocialMedia(this.studentId, payload).subscribe({
    next: () => {
      this.successMessage = 'Social links updated successfully!';
      this.isUpdating = false;
      // Update originalSocialLinks to current value to keep in sync
      this.originalSocialLinks = JSON.parse(JSON.stringify(updatedLinks));
    },
    error: (error) => {
      this.errorMessage = 'Error updating links.';
      console.error(error);
      this.isUpdating = false;
      this.successMessage = '';
    }
  });
}

confirmDiscard(): void {
  const currentLinks = this.socialMediaUpdateForm.value.socialLinks;
  if (JSON.stringify(currentLinks) === JSON.stringify(this.originalSocialLinks)) {
    // No changes, just reset silently
    this.resetToOriginal();
  } else if (confirm("Are you sure you want to discard changes?")) {
    this.resetToOriginal();
  }
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


resetToOriginal(): void {
  // Create FormArray explicitly typed with FormGroup
  const formArray = this.fb.array<FormGroup>([]);

  this.originalSocialLinks.forEach(link => {
    formArray.push(this.fb.group({
      platform: [link.platform, Validators.required],
      url: [link.url, Validators.required]
    }));
  });

  if (formArray.length === 0) {
    formArray.push(this.createSocialLink());
  }

  this.socialMediaUpdateForm.setControl('socialLinks', formArray);
  this.errorMessage = '';
  this.successMessage = '';
}
}

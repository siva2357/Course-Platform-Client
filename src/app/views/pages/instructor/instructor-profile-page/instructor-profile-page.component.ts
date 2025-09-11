import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-instructor-profile-page',
  templateUrl: './instructor-profile-page.component.html',
  styleUrls: ['./instructor-profile-page.component.css']
})
export class InstructorProfilePageComponent implements OnInit {

  public instructorProfile: any;
  public userId!: string;
  public userRole: string | null = null;
  public loading = true;
  public errorMessage: string | null = null;

  public showOverlay = true; // For course video thumbnail overlay

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    this.userRole = localStorage.getItem('userRole') || this.authService.getRole() || '';

    if (!this.userId || !this.userRole) {
      this.errorMessage = 'User ID or Role is not available.';
      this.loading = false;
      return;
    }

    if (this.userRole !== 'instructor') {
      this.errorMessage = 'Invalid role.';
      this.loading = false;
      return;
    }

    this.getInstructorDetails();
  }

  getInstructorDetails() {
    this.profileService.getInstructorProfile(this.userId).subscribe({
      next: (data: any) => {
        this.instructorProfile = data.profile; // ✅ use 'profile' from API response
        this.loading = false;
      },
      error: (err) => this.handleError(err)
    });
  }

  handleError(error: any) {
    console.error('Error fetching profile:', error);
    if (error.status === 401) {
      this.errorMessage = 'Unauthorized access. Please log in again.';
    } else {
      this.errorMessage = 'An error occurred while fetching profile details.';
    }
    this.loading = false;
  }

  // Play course video and hide overlay
  playVideo() {
    this.showOverlay = false;
  }

  getSocialIcon(platform: string) {
    switch(platform.toLowerCase()) {
      case 'github': return 'bi bi-github';
      case 'linkedin': return 'bi bi-linkedin';
      case 'twitter': return 'bi bi-twitter';
      default: return 'bi bi-globe';
    }
  }

}

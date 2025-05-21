import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-instructor-account-settings-page',
  templateUrl: './instructor-account-settings-page.component.html',
  styleUrls: ['./instructor-account-settings-page.component.css'],
})
export class InstructorAccountSettingsPageComponent {
  instructorId!: string;
  public errorMessage: string | null = null;
  loading: boolean = true;
  public userDetails: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.instructorId = localStorage.getItem('userId') || '';
    console.log('Instructor ID:', this.instructorId);
    if (this.instructorId) {
      this.getInstructorDetails();
    } else {
      this.errorMessage = 'Recruiter ID is not available.';
    }
  }

  getInstructorDetails() {
    this.userService.getInstructorById(this.instructorId).subscribe(
      (data: any) => {
        console.log('Instructor Details:', data);
        this.userDetails = data;
        this.loading = false;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  deleteAccount() {
    const confirmation = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmation) {
      if (!this.userDetails || this.userDetails.role !== 'instructor') {
        alert('Invalid user role. Only recruiters can delete their accounts.');
        return;
      }

      this.userService.deleteInstructorById(this.instructorId).subscribe(
        () => {
          alert('Account deleted successfully.');
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['instructor/login-page']);
        },
        (error) => {
          console.error('Error deleting account:', error);
          alert('Failed to delete account. Please try again.');
        }
      );
    }
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

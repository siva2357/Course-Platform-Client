import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorProfile, InstructorProfileHeader, StudentProfile } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-course-header',
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseHeaderComponent implements OnInit {

  public userDetails! :InstructorProfile | StudentProfile;
  public userProfile! :InstructorProfileHeader;

  public fullName! :string;
  public profile! :string;
  userId!: string;
  public errorMessage: string | null = null;
  loading: boolean = true;  // For managing loading state

public userRole: string | null = null;

  @Input() sidebarOpen: boolean = true; // Receives sidebar state
  @Output() toggleSidebar = new EventEmitter<void>(); // Emits toggle event

  toggle() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleSidebar.emit(); // Emit event to parent to toggle sidebar

  }

  constructor(
    private router: Router,
    private authService: AuthService,
     private profileService:ProfileService
  ) {}

  ngOnInit(): void {
    // Get the userId and role from localStorage or AuthService
    this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
  this.userRole = localStorage.getItem('userRole');
    if (this.userId && role) {
      if (role === 'student') {
        this.getStudentDetails();
      } else if (role === 'instructor') {
        this.getInstructorDetails();

      }else {
        this.errorMessage = 'Invalid role.';
      }
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }
  }



getStudentDetails() {
    this.profileService.getStudentIdProfileById(this.userId).subscribe(
      (data: any) => {
        this.userDetails = data;
        this.loading = false;
        this.fullName = this.userDetails?.profileDetails?.userName ?? '';
        this.profile = this.userDetails.profileDetails.profilePicture.url

      },
      (error) => {
        this.handleError(error);
      }
    );
}

getInstructorDetails() {
  this.profileService.getInstructorProfileById(this.userId).subscribe(
    (data:any) => {
      this.userProfile = data;
      this.fullName = this.userProfile.profile.fullName;
      this.profile = this.userProfile.profile.profilePicture.url
      this.loading = false;
    },
    (error) => {
      this.handleError(error);
    }
  );
}


handleError(error: any) {
    console.error('Error fetching user details:', error);
    if (error.status === 401) {
      this.errorMessage = 'Unauthorized access. Please log in again.';
    } else {
      this.errorMessage = 'An error occurred while fetching user details.';
    }
    this.loading = false;
}


goToProfilePage(){
      const userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const userRole = localStorage.getItem('userRole') || this.authService.getRole() || '';
    if (!userId || !userRole) {
      console.error('User ID or role is missing');
      return;
    }
    const rolePath = userRole.toLowerCase(); // Ensure lowercase for consistency
    this.router.navigate([`instructor/profile-page/${userId}`]); // Redirect to change-password page
}


  goToAccountSettingsPage(): void {
    const userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const userRole = localStorage.getItem('userRole') || this.authService.getRole() || '';
    if (!userId || !userRole) {
      console.error('User ID or role is missing');
      return;
    }
    const rolePath = userRole.toLowerCase(); // Ensure lowercase for consistency
    this.router.navigate([`/${rolePath}/account-settings/${userId}/profile-settings`]);
  }


onLogout(): void {
  const role = localStorage.getItem('userRole');
  this.authService.logout();
  if (role === 'instructor') {
    this.router.navigate(['/instructor/login-page']);
  } else if (role === 'student') {
    this.router.navigate(['/student/login-page']);
  }
}

}

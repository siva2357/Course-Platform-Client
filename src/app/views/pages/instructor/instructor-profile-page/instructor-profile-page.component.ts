import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorProfile } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-instructor-profile-page',
  templateUrl: './instructor-profile-page.component.html',
  styleUrls: ['./instructor-profile-page.component.css']
})
export class InstructorProfilePageComponent implements OnInit{

    public userDetails! :InstructorProfile;
    public  userId!: string;
   public errorMessage: string | null = null;
public userRole: string | null = null;
public   loading: boolean = true;  // For managing loading state

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
           if (role === 'instructor') {
            this.getInstructorDetails();

          }else {
            this.errorMessage = 'Invalid role.';
          }
        } else {
          this.errorMessage = 'User ID or Role is not available.';
        }
      }



      getInstructorDetails() {
  this.profileService.getInstructorProfile(this.userId).subscribe(
    (data:any) => {
      this.userDetails = data;
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


goToDashboardPage(){
  this.router.navigate(['/instructor']);
}



}

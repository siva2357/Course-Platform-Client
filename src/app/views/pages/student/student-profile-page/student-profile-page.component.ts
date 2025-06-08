import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentProfile } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
@Component({
  selector: 'app-student-profile-page',
  templateUrl: './student-profile-page.component.html',
  styleUrls: ['./student-profile-page.component.css']
})
export class StudentProfilePageComponent implements OnInit{

    public userDetails! :StudentProfile;
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
           if (role === 'student') {
            this.getStudentDetails();

          }else {
            this.errorMessage = 'Invalid role.';
          }
        } else {
          this.errorMessage = 'User ID or Role is not available.';
        }
      }



      getStudentDetails() {
  this.profileService.getStudentProfile(this.userId).subscribe(
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



}

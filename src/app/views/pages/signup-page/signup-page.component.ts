import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  isUserTypeSelected = false;
  selectedUserType: string | null = null;

  constructor(private router: Router) {}

  selectUserType(userType: string) {
    this.selectedUserType = userType;
    this.isUserTypeSelected = true;
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  navigateToRegistration() {
    if (this.selectedUserType === 'student') {
      this.router.navigate(['student/registration-page']); // ✅ Student registration
    } else if (this.selectedUserType === 'instructor') {
      this.router.navigate(['instructor/registration-page']); // ✅ Instructor registration
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/models/cart.model';
import { InstructorProfile, InstructorProfileHeader, StudentProfile, StudentProfileHeader } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-course-header',
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseHeaderComponent implements OnInit {

  public userDetails! :InstructorProfile | StudentProfile;
  public userProfile! :InstructorProfileHeader|StudentProfileHeader;

  public fullName! :string;
  public profile! :string;
  userId!: string;
  public errorMessage: string | null = null;
  loading: boolean = true;  // For managing loading state

public userRole: string | null = null;
cartCount: number = 0;
cartItems: CartItem[] = [];
  @Input() sidebarOpen: boolean = true; // Receives sidebar state
  @Output() toggleSidebar = new EventEmitter<void>(); // Emits toggle event

  toggle() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleSidebar.emit(); // Emit event to parent to toggle sidebar

  }

  constructor(
    private router: Router,
    private authService: AuthService,
     private profileService:ProfileService,
     private courseService:CourseService
  ) {}

ngOnInit(): void {
  this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
  const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
  this.userRole = role;

  if (this.userId && role) {
    if (role === 'student') {
      this.getStudentDetails();
      this.loadCartItems(); // 🔁 Only students need this
    } else if (role === 'instructor') {
      this.getInstructorDetails();
    } else {
      this.errorMessage = 'Invalid role.';
    }
  } else {
    this.errorMessage = 'User ID or Role is not available.';
  }

  // 🔁 Listen for route changes
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      if (this.userRole === 'student') {
        this.loadCartItems();
      }
    });

  // 🔔 Manual cart refresh trigger
  this.courseService.cartUpdated$.subscribe(() => {
    if (this.userRole === 'student') {
      this.loadCartItems();
    }
  });
}





getStudentDetails() {
    this.profileService.getStudentProfileById(this.userId).subscribe(
      (data: any) => {
        this.userProfile = data;
        this.fullName = this.userProfile.profile.fullName;
        this.profile =  this.userProfile.profile.profilePicture.url
        this.loading = false;

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


goToProfilePage(): void {
  const userId = this.authService.getUserId() || localStorage.getItem('userId') || '';
  const userRole = this.authService.getRole() || localStorage.getItem('userRole') || '';

  if (!userId || !userRole) {
    console.error('User ID or role is missing');
    return;
  }

  const rolePath = userRole.toLowerCase();  // Ensures route path is consistent
  this.router.navigate([`/${rolePath}/profile-page/${userId}`]);
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

goToCartPage(){
  this.router.navigate(['/cart']);

}


loadCartItems(): void {
  this.courseService.getFromCart().subscribe(cart => {
    console.log('🧾 Cart response:', cart);
    this.cartItems = cart.items || []; // fallback to avoid crash
    this.cartCount = this.cartItems.length;
  });
}



}

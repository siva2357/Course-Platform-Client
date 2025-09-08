import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { CartItem } from 'src/app/core/models/cart.model';
import { InstructorProfile, InstructorProfileHeader, StudentProfile, StudentProfileHeader } from 'src/app/core/models/user.model';

import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-course-header',
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseHeaderComponent implements OnInit {
  // ✅ User Data
  userDetails!: InstructorProfile | StudentProfile;
  userProfile!: InstructorProfileHeader | StudentProfileHeader;
  userId!: string;
  userRole: string | null = null;

  // ✅ UI State
  userName!: string;
  fullName!: string;
  profile!: string;
  errorMessage: string | null = null;
  loading = true;

  // ✅ Sidebar
  @Input() sidebarOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  // ✅ Cart
  cartItems: CartItem[] = [];
  cartCount = 0;

  // ✅ Notifications
  notifications: any[] = [];
  showAll = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    this.userRole = localStorage.getItem('userRole') || this.authService.getRole() || '';

    if (this.userId && this.userRole) {
      this.loadNotifications();

      switch (this.userRole) {
        case 'admin':
          this.getAdminDetails();
          break;
        case 'student':
          this.getStudentDetails();
          this.loadCartItems();
          break;
        case 'instructor': // fixed spelling
          this.getInstructorDetails();
          break;
        default:
          this.errorMessage = 'Invalid role.';
      }
    } else {
      this.errorMessage = 'User ID or Role is not available.';
    }

    // ✅ Refresh cart on route change (only for students)
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      if (this.userRole === 'student') this.loadCartItems();
    });

    // ✅ Manual cart refresh trigger
    this.courseService.cartUpdated$.subscribe(() => {
      if (this.userRole === 'student') this.loadCartItems();
    });
  }

  // 🔹 Sidebar
  toggle(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleSidebar.emit();
  }

  // 🔹 Profile fetch
  private getAdminDetails() {
    // TODO: Implement admin profile API when ready
  }

  private getStudentDetails() {
    this.profileService.getStudentProfileById(this.userId).subscribe({
      next: (data: StudentProfileHeader) => {
        this.userProfile = data;
        this.setUserData();
      },
      error: err => this.handleError(err)
    });
  }



  private getInstructorDetails() {
    this.profileService.getInstructorProfileById(this.userId).subscribe({
      next: (data: InstructorProfileHeader) => {
        this.userProfile = data;
        this.setUserData();
      },
      error: err => this.handleError(err)
    });
  }

  private setUserData(): void {
    this.userName = this.userProfile.userName;
    this.fullName = this.userProfile.fullName;
    this.profile = this.userProfile.profilePicture.url;
    this.loading = false;
  }

  private handleError(error: any): void {
    console.error('Error fetching user details:', error);
    this.errorMessage = error.status === 401
      ? 'Unauthorized access. Please log in again.'
      : 'An error occurred while fetching user details.';
    this.loading = false;
  }

  // 🔹 Navigation
  goToProfilePage(): void {
    if (!this.userId || !this.userRole) return;
    this.router.navigate([`/${this.userRole.toLowerCase()}/profile-page/${this.userId}`]);
  }

  goToAccountSettingsPage(): void {
    if (!this.userId || !this.userRole) return;
    this.router.navigate([`/${this.userRole.toLowerCase()}/account-settings/${this.userId}/profile-settings`]);
  }

  goToPurchasePage(): void {
    this.router.navigate(['freelancer/your-offers']);
  }

  goToCartPage(): void {
    this.router.navigate(['/cart']);
  }

  onLogout(): void {
    const role = this.userRole;
    this.authService.logout();
    if (role === 'instructor') {
      this.router.navigate(['/instructor/login-page']);
    } else if (role === 'student') {
      this.router.navigate(['/student/login-page']);
    }
  }

  // 🔹 Cart
  private loadCartItems(): void {
    this.courseService.getFromCart().subscribe({
      next: cart => {
        this.cartItems = cart.items || [];
        this.cartCount = this.cartItems.length;
      },
      error: () => {
        this.cartItems = [];
        this.cartCount = 0;
      }
    });
  }

  // 🔹 Notifications (stubs to implement later)
  private loadNotifications(): void {}
  getNotificationCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
  deleteNotification(id: string): void {}
  markAllRead(): void {}
  clearAll(): void {}
  markAsRead(id: string): void {}

  hasUnread(): boolean {
    return this.getNotificationCount() > 0;
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  get visibleNotifications() {
    return this.showAll ? this.notifications : this.notifications.slice(0, 3);
  }
}

import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/sidebar-menu.model';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent {


  menu: MenuItem[] = [
    // { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' },
    { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' },
    { label: 'Courses', link: 'course', icon: 'bi bi-play-btn' },
    { label: 'Manage Courses', link: 'manage-courses', icon: 'bi bi-pencil-square' },
    { label: 'Course learners', link: 'course-learners', icon: 'bi bi-people-fill' },
    { label: 'Earnings', link: 'payments', icon: 'bi bi-cash-stack' },

  ];

  sidebarOpen: boolean = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  toggle() {
    this.sidebarOpen = !this.sidebarOpen;

  }


}

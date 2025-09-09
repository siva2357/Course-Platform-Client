import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/sidebar-menu.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

    menu: MenuItem[] = [
    { label: 'Dashboard', icon: 'bi bi-grid', link: 'dashboard'},
    { label: 'Instructors', link: 'instructor-list',icon: 'bi bi-person-fill'},
    { label: 'Students', link: 'student-list',icon: 'bi bi-person-workspace'},
    { label: 'Courses', link: 'course-list',icon: 'bi bi-briefcase'},
    { label: 'Transactions', link: 'transactions',icon: 'bi bi-people-fill'},
  ];


    sidebarOpen: boolean = true;

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }

}

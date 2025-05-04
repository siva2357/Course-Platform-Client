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
    { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-person-circle' },
    { label: 'Courses', link: 'course', icon: 'bi bi-plus-square' },
  ];

  sidebarOpen: boolean = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  toggle() {
    this.sidebarOpen = !this.sidebarOpen;

  }


}

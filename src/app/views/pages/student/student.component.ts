import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/sidebar-menu.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

      menu: MenuItem[] = [
        // { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' },
        { label: 'Home', link: 'home', icon: 'bi bi-grid' },
        { label: 'My Courses', link: 'my-courses', icon: 'bi bi-play-btn' },
        { label: 'My Wishlist', link: 'my-wishlist', icon: 'bi bi-pencil-square' },
        { label: 'My Certifications', link: 'my-certifications', icon: 'bi bi-people-fill' },
        { label: 'My Purchases', link: 'my-purchases', icon: 'bi bi-cash-stack' },

      ];

      sidebarOpen: boolean = true;

      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      }


      toggle() {
        this.sidebarOpen = !this.sidebarOpen;

      }


}

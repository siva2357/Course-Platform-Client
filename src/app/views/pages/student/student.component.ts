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
        { label: 'Home', link: 'home', icon: '"bi bi-house' },
        { label: 'My Courses', link: 'my-courses', icon: 'bi bi-book' },
        { label: 'My Wishlist', link: 'my-wishlist', icon: 'bi bi-heart' },
        { label: 'My Certifications', link: 'my-certifications', icon: 'bi bi-person-badge' },
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

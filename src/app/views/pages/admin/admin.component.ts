import { Component } from '@angular/core';
import { MenuItem } from 'src/app/core/models/sidebar-menu.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
      menu: MenuItem[] = [
        { label: 'Dashboard', link: 'dashboard', icon: 'bi bi-grid' },
      ];

      sidebarOpen: boolean = true;

      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      }


      toggle() {
        this.sidebarOpen = !this.sidebarOpen;

      }


}

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
    { label: 'Clients', link: 'user-client',icon: 'bi bi-person-fill'},
    { label: 'Freelancers', link: 'user-freelancer',icon: 'bi bi-person-workspace'},
    { label: 'Job Posts', link: 'job-list',icon: 'bi bi-briefcase'},
    { label: 'Applicants', link: 'applicant-list',icon: 'bi bi-people-fill'},
    { label: 'Meetings', link: 'meetings',icon: 'bi bi-laptop'},
  ];


    sidebarOpen: boolean = true;

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }

}

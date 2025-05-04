import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'src/app/core/models/sidebar-menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() menu = new EventEmitter <MenuItem>; // Event emitter for job selection
  @Input() menuItems: MenuItem[] = []; // Receives the menu items array

  @Output() toggleSidebar = new EventEmitter<boolean>();
  @Input() sidebarOpen: boolean = true; // Receives sidebar state from parent



  toggle() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleSidebar.emit(); // Emit event to parent to toggle sidebar

  }

}

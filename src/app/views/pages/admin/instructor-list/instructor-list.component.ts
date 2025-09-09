import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {
  instructors: any[] = [];
  filteredInstructors: any[] = [];
  paginatedInstructors: any[] = [];
  errorMessage: string | null = null;
  loading = false;
  adminId!: string;

  /** Pagination */
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  totalEntries = 0;
  pageNumbers: number[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.adminId = localStorage.getItem('userId') || '';
    if (this.adminId) {
      this.fetchInstructors();
    } else {
      this.errorMessage = 'Admin ID is missing. Please log in again.';
    }
  }

  /** Fetch all instructors */
  fetchInstructors(): void {
    this.loading = true;
    this.userService.getAllInstructors().subscribe({
      next: (res) => {
        this.instructors = res.instructors || [];
        this.filteredInstructors = [...this.instructors]; // Initialize filtering
        this.updatePagination();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load instructors.';
        this.loading = false;
      }
    });
  }

  /** Navigate to instructor profile */
  viewInstructorProfile(instructorId: string): void {
    this.router.navigate([`admin/instructor/${instructorId}/profile`]);
  }

  /** Pagination Methods */
  updatePagination(): void {
    this.totalEntries = this.filteredInstructors.length;
    this.totalPages = Math.max(Math.ceil(this.totalEntries / this.itemsPerPage), 1);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.paginateInstructors();
  }

  paginateInstructors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedInstructors = this.filteredInstructors.slice(startIndex, startIndex + this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateInstructors();
  }

  getStartIndex(): number {
    return this.totalEntries ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }
}

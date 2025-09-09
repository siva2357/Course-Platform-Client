import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  paginatedStudents: any[] = [];
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
      this.fetchStudents();
    } else {
      this.errorMessage = 'Admin ID is missing. Please log in again.';
    }
  }

  /** Fetch all students */
  fetchStudents(): void {
    this.loading = true;
    this.userService.getAllStudents().subscribe({
      next: (res: any) => {
        this.students = res.students || [];
        this.filteredStudents = [...this.students]; // Initialize filtering
        this.updatePagination();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load students.';
        this.loading = false;
      }
    });
  }

  /** Navigate to student profile */
  viewStudentProfile(studentId: string): void {
    this.router.navigate([`admin/student/${studentId}/profile`]);
  }

  /** Pagination Methods */
  updatePagination(): void {
    this.totalEntries = this.filteredStudents.length;
    this.totalPages = Math.max(Math.ceil(this.totalEntries / this.itemsPerPage), 1);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.paginateStudents();
  }

  paginateStudents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateStudents();
  }

  getStartIndex(): number {
    return this.totalEntries ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }
}

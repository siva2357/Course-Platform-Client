import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseReport, FlattenedLearner, Learner } from 'src/app/core/models/purchase.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';


@Component({
  selector: 'app-instructor-course-learners',
  templateUrl: './instructor-course-learners.component.html',
  styleUrls: ['./instructor-course-learners.component.css']
})
export class InstructorCourseLearnersComponent {

  searchTerm = '';
  itemsPerPage = 10;
  currentPage = 1;
  totalEntries = 0;
  totalPages = 1;

  pageNumbers: number[] = [];
  allPayments: FlattenedLearner[] = [];
  paginatedData: FlattenedLearner[] = [];

  userId!: string;
  userRole: string | null = null;
  errorMessage: string | null = null;

  constructor(
    public router: Router,
    public courseService: CourseService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
    this.userRole = role;

    if (this.userId && role === 'instructor') {
      this.fetchInstructorLearnerReport();
    } else {
      this.errorMessage = 'User ID or Role is not available or invalid.';
    }
  }

  fetchInstructorLearnerReport(): void {
    this.courseService.getInstructorLearnerReport().subscribe({
      next: (response: { report: CourseReport[] }) => {
        // Flatten learners
        this.allPayments = response.report.flatMap((course: CourseReport) =>
          course.learners.map((learner: Learner) => ({
            courseTitle: course.courseTitle,
            ...learner
          }))
        );
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching instructor learners:', error);
        this.errorMessage = error.message || 'Failed to load learner data.';
      }
    });
  }

  filterData(): FlattenedLearner[] {
    return this.allPayments.filter(student =>
      student.studentName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

updatePagination() {
  const filtered = this.filterData();
  this.totalEntries = filtered.length;
  this.pageNumbers = Array.from({ length: Math.ceil(this.totalEntries / this.itemsPerPage) }, (_, i) => i + 1);

  // Update totalPages
  this.totalPages = this.pageNumbers.length;

  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  this.paginatedData = filtered.slice(start, end);
}


  getEndIndex() {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.totalEntries ? this.totalEntries : end;
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.pageNumbers.length) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  resetSearch() {
    this.searchTerm = '';
    this.updatePagination();
  }
}

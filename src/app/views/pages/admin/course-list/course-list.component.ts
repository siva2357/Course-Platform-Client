import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseResponse, Course} from 'src/app/core/models/courseResponse';
import { CourseService } from 'src/app/core/services/course.service';

type FilterKeys = 'selectedCategories' | 'selectedStatuses';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  /** Predefined filters */
  private readonly predefinedCategories = ['Design', 'Development', 'Marketing', 'Writing'];
  private readonly predefinedStatuses = ['Draft', 'Pending', 'Published', 'Rejected'];

  /** Filter options for UI */
  courseCategories: string[] = [];
  courseStatuses: string[] = [];

  /** Active filters */
  selectedFilters: Record<FilterKeys, string[]> = {
    selectedCategories: [],
    selectedStatuses: [],
  };

  /** Data + UI state */
  adminId!: string;
  courses: Course[] = [];             // ✅ use Course[]
  filteredCourses: Course[] = [];
  paginatedCourses: Course[] = [];
  errorMessage: string | null = null;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  totalEntries: number = 0;

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit() {
    this.adminId = localStorage.getItem('userId') || '';
    if (this.adminId) {
      this.courseCategories = [...this.predefinedCategories];
      this.courseStatuses = [...this.predefinedStatuses];
      this.fetchCourses();
    } else {
      this.errorMessage = 'Admin ID is missing. Please log in again.';
    }
  }

  get hasCourses(): boolean {
    return this.courses.length > 0;
  }

  /** Fetch all courses */
  fetchCourses() {
    this.courseService.getCourses().subscribe(
      (response: CourseResponse) => {     // ✅ use CourseResponse
        this.courses = response.courses || [];
        this.filteredCourses = [...this.courses];
        this.totalEntries = this.filteredCourses.length;
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching courses:', error);
        this.errorMessage = error.message || 'Failed to load courses. Please try again later.';
      }
    );
  }

  /** Apply filters */
  applyFilter() {
    const { selectedCategories, selectedStatuses } = this.selectedFilters;
    this.filteredCourses = this.courses.filter(course =>
      (selectedCategories.length === 0 || selectedCategories.includes(course.courseCategory)) &&
      (selectedStatuses.length === 0 || selectedStatuses.includes(course.status))
    );
    this.currentPage = 1;
    this.totalEntries = this.filteredCourses.length;
    this.updatePagination();
  }

  /** Reset filters */
  resetFilter() {
    this.selectedFilters = {
      selectedCategories: [],
      selectedStatuses: [],
    };
    this.filteredCourses = [...this.courses];
    this.currentPage = 1;
    this.totalEntries = this.filteredCourses.length;
    this.updatePagination();
  }

  /** Pagination */
  updatePagination() {
    this.totalEntries = this.filteredCourses.length;
    this.totalPages = Math.max(Math.ceil(this.totalEntries / this.itemsPerPage), 1);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.paginateCourses();
  }

  paginateCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedCourses = this.filteredCourses.slice(startIndex, startIndex + this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateCourses();
  }

  getStartIndex(): number {
    return this.totalEntries ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }

/** Approve course */
approveCourse(courseData: Course) {
  if (!courseData._id || !this.adminId) return;
  if (courseData.status !== 'Pending') return;

  const confirmApprove = confirm('Are you sure you want to approve this course?');
  if (!confirmApprove) return;

  this.courseService.approveCourse(courseData._id, this.adminId).subscribe(
    () => this.fetchCourses(),
    (error) => console.error('Error approving course:', error)
  );
}

/** Reject course */
rejectCourse(courseData: Course) {
  if (!courseData._id || !this.adminId) return;
  if (courseData.status !== 'Pending') return;

  const confirmReject = confirm('Are you sure you want to reject this course?');
  if (!confirmReject) return;

  this.courseService.rejectCourse(courseData._id, this.adminId).subscribe(
    () => this.fetchCourses(),
    (error) => console.error('Error rejecting course:', error)
  );
}


  /** Navigate to course details */
  viewCourseDetails(courseData: Course): void {
    this.router.navigate([`admin/course-list/${courseData._id}/course-details`]);
  }
}

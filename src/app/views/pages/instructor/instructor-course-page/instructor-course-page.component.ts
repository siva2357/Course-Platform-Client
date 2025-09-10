import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/course.model';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-instructor-course-page',
  templateUrl: './instructor-course-page.component.html',
  styleUrls: ['./instructor-course-page.component.css']
})
export class InstructorCoursePageComponent  implements OnInit {
  public course!:Course
  courses: Course[] = [];
  errorMessage: string = '';
  searchTerm: string = '';
  filteredData: Course[] = [];
  paginatedData: Course[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  totalEntries = 0;
selectedCategory: string = '';
availableCategories: string[] = ['Development', 'Design', 'Marketing', 'Business'];
  constructor( public router:Router, public courseService:CourseService){}
  ngOnInit(): void {
    this.fetchCourses();
  }

    get hasCourses(): boolean {
    return this.courses.length > 0;
  }

  fetchCourses(): void {
this.courseService.getAllCourses().subscribe({
  next: (response: { total: number; courses: Course[] }) => {
    this.courses = response.courses.map((course: any) => ({
      ...course,
      id: course._id || course.id
    }));
    this.applyFilters();
  },
  error: (error) => {
    console.error('Error fetching courses:', error);
    this.errorMessage = error.message || 'Failed to load courses. Please try again later.';
  }
});

  }

performSearch() {
  this.currentPage = 1;

  this.filteredData = this.courses.filter(course => {
    const matchesTitle =
      !this.searchTerm ||
      course.landingPage?.courseTitle?.toLowerCase().includes(this.searchTerm.toLowerCase());

    const matchesCategory =
      !this.selectedCategory ||
      course.landingPage?.courseCategory === this.selectedCategory;

    return matchesTitle && matchesCategory;
  });

  this.totalEntries = this.filteredData.length;
  this.updatePagination();
}



  applyFilters(): void {
    this.filteredData = this.filteredCourses();
    this.totalEntries = this.filteredData.length;
    this.updatePagination();
  }

filteredCourses(): Course[] {
  return this.courses.filter(course =>
    course._id?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    course.landingPage?.courseTitle?.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

resetSearch(): void {
  this.searchTerm = '';
  this.selectedCategory = '';
  this.filteredData = [...this.courses];
  this.totalEntries = this.filteredData.length;
  this.updatePagination();
}


  updatePagination(): void {
    this.totalPages = Math.max(Math.ceil(this.totalEntries / this.itemsPerPage), 1);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginateData();
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateData();
    }
  }

 goToEditCourse(courseId: string): void {
  this.router.navigate([`/instructor/course/${courseId}/create`]);
}


  deleteCourse(courseId: string): void {
    if (!courseId) {
      console.error("Course ID is missing or invalid.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    const originalCourses = [...this.courses];
    this.courses = this.courses.filter(course => course._id !== courseId);
    this.applyFilters();

    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        console.log("Course deleted successfully!");
        this.fetchCourses(); // Refresh list after delete
      },
      error: (error) => {
        console.error("Error deleting course:", error);
        alert("Failed to delete the course. Please try again.");
        this.courses = originalCourses;
        this.applyFilters();
      }
    });
  }

  getStartIndex(): number {
    if (this.totalEntries === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }

    createNewCourse() {
    this.courseService.createCourse(this.course).subscribe({
      next: (course: Course) => {
        const courseId = course._id;
        this.router.navigate([`instructor/course/${courseId}/create`]);
      },
      error: err => console.error('Course creation failed', err)
    });
  }





}

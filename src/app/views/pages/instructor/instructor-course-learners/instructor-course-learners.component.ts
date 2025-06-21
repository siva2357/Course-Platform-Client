import { Component } from '@angular/core';

@Component({
  selector: 'app-instructor-course-learners',
  templateUrl: './instructor-course-learners.component.html',
  styleUrls: ['./instructor-course-learners.component.css']
})
export class InstructorCourseLearnersComponent {

  searchTerm = '';
itemsPerPage = 10;
currentPage = 1;
totalPages = 1;
totalEntries = 0;
pageNumbers: number[] = [];
allPayments: any[] = []; // Replace with your actual data type

paginatedData: any[] = []; // Replace with your actual data type

updatePagination() {
  // slice logic to calculate paginatedData based on itemsPerPage and currentPage
  const filtered = this.filterData(); // Optional filter based on searchTerm
  this.totalEntries = filtered.length;
  this.pageNumbers = Array.from({ length: Math.ceil(this.totalEntries / this.itemsPerPage) }, (_, i) => i + 1);

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

filterData() {
  // Apply filtering logic
  return this.allPayments.filter(payment =>
    payment.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


}

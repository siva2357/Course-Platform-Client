import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/core/models/purchase.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-instructor-transaction-page',
  templateUrl: './instructor-transaction-page.component.html',
  styleUrls: ['./instructor-transaction-page.component.css']
})
export class InstructorTransactionPageComponent {
searchTerm = '';
itemsPerPage = 10;
currentPage = 1;
totalPages = 1;
totalEntries = 0;
pageNumbers: number[] = [];
allPayments: any[] = []; // Replace with your actual data type

paginatedData: any[] = []; // Replace with your actual data type
    public  userId!: string;
public userRole: string | null = null;

   public errorMessage: string | null = null;


  constructor( public router:Router, public paymentService:PaymentService, private authService: AuthService,){

  }


        ngOnInit(): void {
        // Get the userId and role from localStorage or AuthService
        this.userId = localStorage.getItem('userId') || this.authService.getUserId() || '';
        const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
         this.userRole = localStorage.getItem('userRole');
        if (this.userId && role) {
           if (role === 'instructor') {
               this.fetchCoursePayments();


          }else {
            this.errorMessage = 'Invalid role.';
          }
        } else {
          this.errorMessage = 'User ID or Role is not available.';
        }
      }





fetchCoursePayments(): void {
  this.paymentService.getInstructorCoursesRevenue().subscribe({
    next: (response: { total: number; data: any[] }) => {
      this.allPayments = response.data.map((item: any) => ({
        courseName: item.courseTitle,
        collections: item.totalPayments,
        refunds: item.totalRefunds,
        revenue: item.netRevenue,
        orders: item.totalOrders
      }));
      this.updatePagination(); // If you're using pagination logic
    },
    error: (error) => {
      console.error('Error fetching instructor revenue:', error);
      this.errorMessage = error.message || 'Failed to load revenue data.';
    }
  });
}





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

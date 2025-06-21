import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

type RangeType = 'Weekly' | 'Monthly' | 'Yearly';

type CourseCategory =
  | 'React'
  | 'Angular'
  | 'Vue'
  | 'Node.js'
  | 'Django'
  | 'Flask'
  | 'Spring'
  | 'Laravel'
  | 'Java'
  | 'Python';

interface CourseCategoryStats {
  category: CourseCategory;
  count: number;
}

interface CoursePerformance {
  title: string;
  revenue: number;
  students: number;
}


// models/student-payment.model.ts
export interface StudentPayment {
  id: number;
  courseId: string;
  purchaseDate: string;
  status: 'Paid' | 'Refunded';
  customerName: string;
  courseName: string;
  amount: number;
}


@Component({
  selector: 'app-instructor-dashboard-page',
  templateUrl: './instructor-dashboard-page.component.html',
  styleUrls: ['./instructor-dashboard-page.component.css']
})
export class InstructorDashboardPageComponent {

  public categoryStats: CourseCategoryStats[] = [
  { category: 'React', count: 3 },
  { category: 'Angular', count: 2 },
  { category: 'Django', count: 4 },
  { category: 'Flask', count: 1 },
  { category: 'Node.js', count: 0 },
  { category: 'Spring', count: 0 },
  { category: 'Laravel', count: 0 },
  { category: 'Java', count: 2 },
  { category: 'Python', count: 5 },
  { category: 'Vue', count: 1 }
];

public performanceStats: CoursePerformance[] = [
  { title: 'React for Beginners', revenue: 1200, students: 30 },
  { title: 'Advanced Angular', revenue: 900, students: 22 },
  { title: 'Django Bootcamp', revenue: 1400, students: 36 },
  { title: 'Python Basics', revenue: 800, students: 18 }
];


students: StudentPayment[] = [
  {
    id: 1,
    courseId: '#C12345',
    purchaseDate: '06-05-2025',
    status: 'Paid',
    customerName: 'John Walker',
    courseName: 'Wireframing Kit for Figma',
    amount: 2000
  },
  {
    id: 2,
    courseId: '#C98765',
    purchaseDate: '04-05-2025',
    status: 'Refunded',
    customerName: 'Sarah Khan',
    courseName: 'Angular 16 Advanced',
    amount: 1500
  },
  {
    id: 3,
    courseId: '#C56789',
    purchaseDate: '02-05-2025',
    status: 'Paid',
    customerName: 'David Kim',
    courseName: 'React Dashboard Template',
    amount: 1800
  },
  {
    id: 4,
    courseId: '#C22334',
    purchaseDate: '01-05-2025',
    status: 'Paid',
    customerName: 'Emily Brown',
    courseName: 'Django REST Framework Mastery',
    amount: 2200
  },
  {
    id: 5,
    courseId: '#C99887',
    purchaseDate: '30-04-2025',
    status: 'Refunded',
    customerName: 'Michael Lee',
    courseName: 'Node.js APIs with Express',
    amount: 1400
  },
  {
    id: 6,
    courseId: '#C33445',
    purchaseDate: '29-04-2025',
    status: 'Paid',
    customerName: 'Priya Singh',
    courseName: 'Vue.js Full Course',
    amount: 1600
  },
  {
    id: 7,
    courseId: '#C77889',
    purchaseDate: '28-04-2025',
    status: 'Paid',
    customerName: 'Ahmed Farhan',
    courseName: 'Flutter Mobile Development',
    amount: 2500
  },
  {
    id: 8,
    courseId: '#C45678',
    purchaseDate: '27-04-2025',
    status: 'Refunded',
    customerName: 'Lisa Wong',
    courseName: 'Fullstack MERN Project Bootcamp',
    amount: 2800
  },
  {
    id: 9,
    courseId: '#C11122',
    purchaseDate: '26-04-2025',
    status: 'Paid',
    customerName: 'Ravi Sharma',
    courseName: 'Data Structures in JavaScript',
    amount: 1900
  },
  {
    id: 10,
    courseId: '#C88877',
    purchaseDate: '25-04-2025',
    status: 'Paid',
    customerName: 'Anna Bell',
    courseName: 'UI/UX Design with Adobe XD',
    amount: 2100
  }
];


  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;


  // Revenue
  selectedRevenueRange: RangeType = 'Weekly';
  revenueData: Record<RangeType, string> = {
    Weekly: '$10.12k',
    Monthly: '$46.34k',
    Yearly: '$562.50k'
  };
  get revenueAmount(): string {
    return this.revenueData[this.selectedRevenueRange];
  }
  updateRevenueRange(range: RangeType): void {
    this.selectedRevenueRange = range;
  }

  // Refund
  selectedRefundRange: RangeType = 'Weekly';
  refundData: Record<RangeType, string> = {
    Weekly: '$2.45k',
    Monthly: '$9.87k',
    Yearly: '$88.40k'
  };
  get refundAmount(): string {
    return this.refundData[this.selectedRefundRange];
  }
  updateRefundRange(range: RangeType): void {
    this.selectedRefundRange = range;
  }

  // Students
  selectedStudentRange: RangeType = 'Weekly';
  studentCountData: Record<RangeType, string> = {
    Weekly: '112',
    Monthly: '520',
    Yearly: '6,301'
  };
  get studentCount(): string {
    return this.studentCountData[this.selectedStudentRange];
  }
  updateStudentRange(range: RangeType): void {
    this.selectedStudentRange = range;
  }

  // Orders
  selectedOrderRange: RangeType = 'Weekly';
  orderCountData: Record<RangeType, string> = {
    Weekly: '45',
    Monthly: '182',
    Yearly: '2,140'
  };
  get orderCount(): string {
    return this.orderCountData[this.selectedOrderRange];
  }
  updateOrderRange(range: RangeType): void {
    this.selectedOrderRange = range;
  }




  public courseCategoryChartData: ChartData<'pie'> = {
  labels: this.categoryStats.map(cat => cat.category),
  datasets: [
    {
      data: this.categoryStats.map(cat => cat.count),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#8E44AD', '#00B894', '#E84393', '#2ECC71'
      ],
      borderColor: '#fff',
      borderWidth: 1
    }
  ]
};


public courseCategoryChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.label}: ${context.raw} courses`;
        }
      }
    }
  }
};




public coursePerformanceChartData: ChartData<'bar'> = {
  labels: this.performanceStats.map(item => item.title),
  datasets: [
    {
      label: 'Students',
      data: this.performanceStats.map(item => item.students),
      backgroundColor: '#36A2EB'
    },
    {
      label: 'Revenue (₹)',
      data: this.performanceStats.map(item => item.revenue),
      backgroundColor: '#FF6384'
    }
  ]
};

public coursePerformanceChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      mode: 'index',
      intersect: false
    },
    legend: {
      position: 'top'
    }
  },
  scales: {
    x: {},
    y: {
      beginAtZero: true
    }
  }
};



}

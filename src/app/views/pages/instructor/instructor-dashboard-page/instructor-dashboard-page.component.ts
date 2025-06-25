import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CourseService } from 'src/app/core/services/course.service';

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
  category: string;
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
}

interface CoursePerformance {
  title: string;
  revenue: number;
  students: number;
}


// models/student-payment.model.ts
export interface StudentPayment {
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  amount: number;
  purchasedAt: string; // ISO string
  status:string;
}


interface InstructorSummary {
  totalRevenue: number;
  totalRefunds: number;
  totalOrders: number;
  totalStudents: number;
  weekly: {
    revenue: number;
    refunds: number;
    orders: number;
    students: number;
  };
  monthly: {
    revenue: number;
    refunds: number;
    orders: number;
    students: number;
  };
  yearly: {
    revenue: number;
    refunds: number;
    orders: number;
    students: number;
  };
}


interface StatCardConfig {
  title: string;
  getValue: () => string;
  getRange: () => RangeType;            // ✅ NEW
  updateRange: (range: RangeType) => void;
}


@Component({
  selector: 'app-instructor-dashboard-page',
  templateUrl: './instructor-dashboard-page.component.html',
  styleUrls: ['./instructor-dashboard-page.component.css']
})
export class InstructorDashboardPageComponent {

 summaryStats: { label: string; value: string | number }[] = [];
  categoryStats: CourseCategoryStats[] = [];
  performanceStats: CoursePerformance[] = [];
  recentPurchases: StudentPayment[] = [];

selectedRevenueRange: RangeType = 'Weekly';
selectedOrderRange: RangeType = 'Weekly';
selectedRefundRange: RangeType = 'Weekly';
selectedStudentRange: RangeType = 'Weekly';




revenueData: Record<RangeType, string> = { Weekly: '₹0', Monthly: '₹0', Yearly: '₹0' };
orderCountData: Record<RangeType, string> = { Weekly: '0', Monthly: '0', Yearly: '0' };
refundData: Record<RangeType, string> = { Weekly: '₹0', Monthly: '₹0', Yearly: '₹0' }; // Currently all 0
studentCountData: Record<RangeType, string> = { Weekly: '0', Monthly: '0', Yearly: '0' }; // Use if API supports it

get revenueAmount(): string {
  return this.revenueData[this.selectedRevenueRange];
}
get refundAmount(): string {
  return this.refundData[this.selectedRefundRange];
}
get studentCount(): string {
  return this.studentCountData[this.selectedStudentRange];
}
get orderCount(): string {
  return this.orderCountData[this.selectedOrderRange];
}

updateRevenueRange(range: RangeType): void {
  this.selectedRevenueRange = range;
}
updateRefundRange(range: RangeType): void {
  this.selectedRefundRange = range;
}
updateStudentRange(range: RangeType): void {
  this.selectedStudentRange = range;
}
updateOrderRange(range: RangeType): void {
  this.selectedOrderRange = range;
}


getCardLabel(title: string, range: RangeType): string {
  const rangeText = range.toLowerCase();

  switch (title) {
    case 'TOTAL REVENUE':
      return `Earning this ${rangeText}`;
    case 'TOTAL REFUNDS':
      return `Refunds this ${rangeText}`;
    case 'ALL TIME ORDERS':
      return `Orders this ${rangeText}`;
    case 'ACTIVE STUDENTS':
      return `Students joined this ${rangeText}`;
    default:
      return '';
  }
}



cards: StatCardConfig[] = [];
    constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadSummary();
    this.loadCharts();
    this.loadRecentPurchases();

this.cards = [
  {
    title: 'TOTAL REVENUE',
    getValue: () => this.revenueAmount,
    getRange: () => this.selectedRevenueRange, // ✅ Reference live value
    updateRange: this.updateRevenueRange.bind(this)
  },
  {
    title: 'TOTAL REFUNDS',
    getValue: () => this.refundAmount,
    getRange: () => this.selectedRefundRange,
    updateRange: this.updateRefundRange.bind(this)
  },
  {
    title: 'ACTIVE STUDENTS',
    getValue: () => this.studentCount,
    getRange: () => this.selectedStudentRange,
    updateRange: this.updateStudentRange.bind(this)
  },
  {
    title: 'ALL TIME ORDERS',
    getValue: () => this.orderCount,
    getRange: () => this.selectedOrderRange,
    updateRange: this.updateOrderRange.bind(this)
  }
];


  }


loadSummary() {
  this.courseService.getInstructorSummaryAnalytics().subscribe((data: InstructorSummary) => {
    this.summaryStats = [
      { label: 'Total Revenue', value: `₹${data.totalRevenue}` },
      { label: 'Total Refunds', value: `₹${data.totalRefunds}` },
      { label: 'Total Orders', value: data.totalOrders },
      { label: 'Total Students', value: data.totalStudents }
    ];

    this.revenueData = {
      Weekly: `₹${data.weekly.revenue}`,
      Monthly: `₹${data.monthly.revenue}`,
      Yearly: `₹${data.yearly.revenue}`
    };

    this.orderCountData = {
      Weekly: `${data.weekly.orders}`,
      Monthly: `${data.monthly.orders}`,
      Yearly: `${data.yearly.orders}`
    };

this.refundData = {
  Weekly: `₹${data.weekly.refunds}`,
  Monthly: `₹${data.monthly.refunds}`,
  Yearly: `₹${data.yearly.refunds}`
};

this.studentCountData = {
  Weekly: `${data.weekly.students}`,
  Monthly: `${data.monthly.students}`,
  Yearly: `${data.yearly.students}`
};

  });
}


loadCharts() {
  this.courseService.getInstructorChartAnalytics().subscribe(data => {
    this.categoryStats = data.categoryStats || [];
    this.performanceStats = data.performanceStats || [];

    this.courseCategoryChartData.labels = this.categoryStats.map(cat => cat.category);
    this.courseCategoryChartData.datasets[0].data = this.categoryStats.map(cat => cat.totalCourses);

    this.coursePerformanceChartData.labels = this.performanceStats.map(item => item.title);
    this.coursePerformanceChartData.datasets[0].data = this.performanceStats.map(item => item.students);
    this.coursePerformanceChartData.datasets[1].data = this.performanceStats.map(item => item.revenue);

    this.chart?.update?.();
  });
}



loadRecentPurchases(): void {
  this.courseService.getInstructorPurchaseSummary().subscribe({
    next: (response) => {
      this.recentPurchases = response.purchases;
    },
    error: (err) => {
      console.error("Recent Purchases Error:", err);
      this.recentPurchases = [];
    }
  });
}


  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;





public courseCategoryChartData: ChartData<'pie'> = {
  labels: this.categoryStats.map(cat => cat.category),
  datasets: [
    {
      data: this.categoryStats.map(cat => cat.totalCourses),
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

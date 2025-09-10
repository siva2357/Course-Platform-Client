export interface CourseStatusStats {
  Draft: number;
  Pending: number;
  Published: number;
  Rejected: number;
}

export interface RevenueStats {
  totalSales: number;
  totalRevenueForAdmin: number;
  totalInstructorEarnings: number;
}

export interface TopCourse {
  _id: string;
  courseTitle: string;
  purchaseCount: number;
  revenue: number;
}

export interface AdminDashboardStats {
  totalInstructors: number;
  totalStudents: number;
  totalCourses: number;
  courseStatus: CourseStatusStats;
  totalPurchases: number;
  revenueStats: RevenueStats;
  topCourses: TopCourse[];
}

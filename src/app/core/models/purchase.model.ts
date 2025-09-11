export interface Purchase {
  courseId: string | string[];
  courseTitle: string;
  courseThumbnail?: string;          // optional frontend-only thumbnail
  amount: number;
  status: 'purchased' | 'refunded' | 'non-refundable';  // enum matches backend
  platformFee: number;               // always sent by backend, default 0
  revenueForInstructor: number;      // default 0
  revenueForAdmin: number;           // default 0
  refundCharges: number;             // default 0
  taxCharges: number;                // default 0
  purchasedAt: string;               // ISO date from backend
  refundableUntil?: string;          // optional
  paymentId?: string;                // optional
  orderId?: string;                  // optional
  purchasedById?: string;            // optional
}





export interface InstructorPurchase {
  purchaseId: string;
  courseTitle: string;
  sellingPrice: number;
  taxCharges: number;
  platformFee: number;
  revenueForInstructor: number;
  purchasedAt: string;
  status: string;
}



export interface Learner {
  studentName: string;
  studentEmail: string;
  status: 'Certified' | 'Completed' | 'In Progress';
  startedOn: string;
  completedOn: string;
}

export interface CourseReport {
  courseTitle: string;
  totalLearners: number;
  learners: Learner[];
}

export interface FlattenedLearner extends Learner {
  courseTitle: string; // include course info
}

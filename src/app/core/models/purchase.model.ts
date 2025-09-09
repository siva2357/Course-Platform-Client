export interface Purchase {
  _id?: string;
  courseId: string;
  courseTitle: string; // 🟢 Match backend addition
  orderId?: string;
  paymentId?: string;
  amount: number;
  status?: 'purchased' | 'refunded' | 'non-refundable';
  purchasedAt?: Date;
}



export interface InstructorPurchase {
  _id: string;
  purchasedAt: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  amount: number;
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

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

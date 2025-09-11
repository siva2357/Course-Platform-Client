export interface CartItem {
  _id: string;
  courseId: string; // 👈 add this
  courseTitle: string;
  courseCategory: string;
  courseThumbnail: string;
  courseDescription: string;
  amount: number;
    purchaseStatus?: 'in-cart' | 'purchased' | 'refunded'; // ✅ Add this

}


export interface WishList {
  _id: string;
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  courseThumbnail: string;
  courseDescription: string;
  amount: number;
  isPurchased:boolean;
}


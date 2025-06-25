export interface CartItem {
  _id: string;
  courseId: string; // 👈 add this
  courseTitle: string;
  courseCategory: string;
  courseThumbnail: string;
  courseDescription: string;
  amount: number;
}


export interface WishList {
  _id: string;
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  courseThumbnail: string;
  courseDescription: string;
  amount: number;
}


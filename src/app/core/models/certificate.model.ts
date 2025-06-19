export interface Certificate {
  _id: string;
  courseId: string; // 👈 add this
  studentName: string;
  courseTitle: string;
 issueDate: string;
  certificateUrl: string;
}

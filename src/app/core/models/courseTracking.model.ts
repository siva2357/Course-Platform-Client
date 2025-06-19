export interface CourseTracking {
  _id: string;
  courseId: string; // 👈 add this
  completedLectures: string;
  completedSections: string;
 progressPercentage: string;
  isCourseCompleted: string;
  certificateIssued: string;
}

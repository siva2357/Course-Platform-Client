export interface CourseTracking {
  _id: string;
  courseId: string;
  completedLectures: string[];     // should be array of lecture IDs
  completedSections: string[];     // should be array of section IDs
  progressPercentage: number;      // ✅ not string
  isCourseCompleted: boolean;      // ✅ not string
  certificateIssued: boolean;      // ✅ not string
}

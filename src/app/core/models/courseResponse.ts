// src/app/core/models/course.model.ts
export interface CourseResponse {
  success: boolean;
  courses: Course[];
}

export interface Course {
  _id: string;
  courseTitle: string;
  courseCategory: string;
  courseDescription: string; // contains HTML string
  courseThumbnail: string;
  coursePreview: string;
  createdBy: CreatedBy;
  status: 'Draft' | 'Pending' | 'Published' | 'Rejected'; // restricts allowed values
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreatedBy {
  name: string;
  email: string;

}

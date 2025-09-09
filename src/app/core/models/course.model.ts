export interface Course {
  _id?: string;
  createdById: string;          // ObjectId as string
  createdByName: string;

  landingPage: LandingPage;
  coursePlan: CoursePlan;
  curriculum: Curriculum;
  price: Price;

  status: "Pending" | "Published" | "Rejected" | "Draft";

  totalDuration?: string;       // "0m" default

  createdAt?: Date;
  updatedAt?: Date;
}

// Landing Page
export interface LandingPage {
  courseTitle: string;
  courseCategory: string;
  courseDescription: string;
  courseThumbnail: string;
  coursePreview: string;
}

// Course Plan
export interface CoursePlan {
  learningObjectives: string[];
  courseRequirements: string[];
  courseLevel: string[];
}

// Curriculum
export interface Curriculum {
  sections: Section[];
}

export interface Section {
  _id?: string;
  sectionTitle: string;
  sectionDuration?: string; // optional, default "0m"
  lectures: Lecture[];
}

export interface Lecture {
  _id?: string;
  lectureTitle: string;
  lectureDescription: string;
  lectureDuration?: string;  // optional, default "0m"
  lectureContent: string[];
}

export interface ContentItem {
  title: string;
  url?: string;        // required unless type==='text' (can be optional here)
}

export interface Resource {
  fileName: string;
  url: string;
}

// Price
export interface Price {
  currency: string;
  pricingTier: string;
  amount: number;
}






export interface CoursesResponse {
  total: number;
myCourses: CourseIntro[]}






export interface CourseIntro {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  preview?: string;
  createdByName: string;
  createdAt: string;
  progressPercentage: number;
  isCourseCompleted: boolean;
}























// ✅ Interface for individual course item
export interface CoursePreview {
  _id: string;
  title: string;
  description: string;  // Can contain HTML
  thumbnail: string;    // Direct match to API
  preview?: string;     // Optional (not used in card but part of API)
  createdByName?: string;
  createdAt?: string;
}

export interface Category {
  name: string;
  courses: CoursePreview[];
  courseChunks: CoursePreview[][];
}









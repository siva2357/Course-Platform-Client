export interface Course {
  _id?: string;
    landingPage: LandingPage;
    coursePlan: CoursePlan;
    curriculum: Curriculum;
    price: Price;
    status?: string;       // e.g., 'draft', 'published'
    createdAt?: Date;
     updatedAt?: Date;
}

export interface Curriculum {
  sections: Section[];
}

export interface Section {
    _id?: string;
  sectionTitle: string;
  lectures: Lecture[];
}

export interface Lecture {
    _id?: string;

  lectureTitle: string;
  lectureDescription: string;
  lectureContent: string;
  lectureResources: string;
}

export interface Price{
    currency: string;
    pricingTier: string;
    amount:string;
}

export interface LandingPage{
      courseTitle: string;
    courseCategory: string;
    courseDescription: string;
    courseThumbnail: string;
    coursePreview: string;
}


export interface CoursePlan {
  learningObjectives: string[];     // ✅ was []
  courseRequirements: string[];     // ✅ was []
  courseLevel: string[];            // ✅ was []
}

export interface CoursesResponse {
  total: number;
  courses: Course[];
}



export interface  CoursePreview {
    _id?: string;
  title: string;
  description: string;
  image: string;
}

export interface  Category {
  name: string;
  courses: CoursePreview[];
  courseChunks: CoursePreview[][];
}


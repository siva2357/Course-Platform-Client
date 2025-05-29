export interface Course {
  _id?: string;
  courseDetails: {
    courseTitle: string;
    courseCategory: string;
    courseDescription: string;
    courseThumbnail: string;
    coursePreview: string;
    learningObjectives: string[];
    courseRequirements: string[];
    courseLevel: string;
    forgotPasswordCodeValidation?: number;
    curriculum: Curriculum[];
    price: string;
    discountPrice: string;
  };
  status?: string;       // e.g., 'draft', 'published'
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Curriculum {
  sections: Section[];
}

export interface Section {
  sectionTitle: string;
  lectures: Lecture[];
}

export interface Lecture {
  lectureTitle: string;
  lectureDescription: string;
  lectureContent: string;
  lectureResources: string;
}


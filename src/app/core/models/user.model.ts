import { SafeHtml } from "@angular/platform-browser";


export interface Instructor {
  _id?: string;
  registrationDetails: {
      fullName: string;
      userName: string;
      email: string;
      password?: string;
      verified?: boolean;
      verificationCode?: string;
      verificationCodeValidation?: number;
      forgotPasswordCode?: string;
      forgotPasswordCodeValidation?: number;
  };
  role: string;
  lastLoginAt?: Date | null;
  lastLogoutAt?: Date | null;
  status?: string; // Match backend enum
  createdAt?: Date; // Mongoose timestamps field
  updatedAt?: Date; // Mongoose timestamps field
}


export interface Student {
  _id?: string;
  registrationDetails: {
    firstName: string;
      lastName: string;
      userName: string;
      email: string;
      password?: string; // Optional since it's usually not returned from backend
      verified?: boolean;
      verificationCode?: string;
      verificationCodeValidation?: number;
      forgotPasswordCode?: string;
      forgotPasswordCodeValidation?: number;
  };
  role: string;
  lastLoginAt?: Date | null;
  lastLogoutAt?: Date | null;
  status?: "active" | "inactive"; // Match backend enum
  createdAt?: Date; // Mongoose timestamps field
  updatedAt?: Date; // Mongoose timestamps field
}


export interface InstructorProfile {
  _id?: string;
  profileDetails: {
    profilePicture: { fileName: string; url: string; };
    fullName: string;
    userName: string;
    email?: string;
    gender: string;
    socialMedia: [{ platform: string; url: string }];
    bioDescription: string;
    sanitizedBioDescription?: SafeHtml;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}




export interface StudentProfile {
  _id?: string;
  profileDetails: {
    profilePicture: { fileName: string;url: string;};
      firstName: string;
      lastName: string;
      userName:string;
      email?: string;
      gender: string;
      dateOfBirth: string;  // ✅ Fix: Keep as string since API returns a string
      phoneNumber: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
      bioDescription: string;
      sanitizedBioDescription?: SafeHtml;
    };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}




export interface InstructorProfileHeader {
  _id?: string;
  fullName: string;
  profilePictureUrl:string;
}





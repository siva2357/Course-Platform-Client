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


export interface InstructorProfileHeader {
  profile :{
  fullName: string;
profilePicture: { fileName: string;url: string;};  }

}




export interface Student {
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

export interface StudentProfile {
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


export interface StudentProfileHeader {
  profile :{
  fullName: string;
profilePicture: { fileName: string;url: string;};  }

}




export interface BasicProfile {
  _id?: string;
    fullName: string;
    userName: string;
    email?: string;
    gender: string;
    bioDescription: string;
    sanitizedBioDescription?: SafeHtml;
    createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ProfileUpload {
  _id?: string;
   profilePicture: { fileName: string; url: string };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface SocialMedia {
  _id?: string;
    socialMedia: [{ platform: string; url: string }];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

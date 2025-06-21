import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CourseTracking } from 'src/app/core/models/courseTracking.model';
import { Student } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-student-accomplishments',
  templateUrl: './student-accomplishments.component.html',
  styleUrls: ['./student-accomplishments.component.css']
})
export class StudentAccomplishmentsComponent  implements OnInit {

  courseId!: string;
  studentId!: string;
  studentDetails!: Student;
  fullName!: string;
  courseTracking!: CourseTracking;

  isCourseCompleted: boolean = false;
  hasCertificate: boolean = false;

  constructor(
    private courseService: CourseService,
    private storage: AngularFireStorage,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.studentId = localStorage.getItem('userId') || this.authService.getUserId() || '';
    this.fullName = this.authService.getFullName() || '';
    this.courseId = '68539fa6bc72b327d59fcb08'; // ✅ Replace with dynamic route param later

    this.fetchCourseProgress();
  }

  fetchCourseProgress(): void {
    this.courseService.getCourseProgress(this.courseId).subscribe({
      next: (res) => {
        this.courseTracking = res;
        this.isCourseCompleted = this.courseTracking.isCourseCompleted;
        this.hasCertificate = this.courseTracking.certificateIssued;
      },
      error: (err) => {
        console.error('❌ Failed to fetch course progress:', err);
      }
    });
  }

  downloadCertificate(): void {
    const studentName = 'this.fullName';
    const courseTitle = 'Mastering React'; // ✅ This should ideally come from course data
    const issueDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.courseService.generateCertificate(studentName, courseTitle, issueDate).subscribe({
      next: (blob) => {
        const pdfBlob = new Blob([blob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');

        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 10000);
      },
      error: (err) => {
        console.error('Download failed:', err);
        alert('Failed to download certificate.');
      }
    });
  }
completedSections = [
  {
    title: 'Getting Started with Angular',
    completedLectures: 5,
    totalLectures: 5
  },
  {
    title: 'Components & Templates',
    completedLectures: 8,
    totalLectures: 8
  },
  {
    title: 'Routing and Navigation',
    completedLectures: 6,
    totalLectures: 6
  },
  {
    title: 'HTTP and Services',
    completedLectures: 4,
    totalLectures: 4
  }
];

getSectionProgress(section: any): number {
  return Math.floor((section.completedLectures / section.totalLectures) * 100);
}



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { AuthService } from 'src/app/core/services/auth.service';


import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
// ⬇️ Set PDF.js worker
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;

@Component({
  selector: 'app-student-accomplishments',
  templateUrl: './student-accomplishments.component.html',
  styleUrls: ['./student-accomplishments.component.css']
})
export class StudentAccomplishmentsComponent implements OnInit {
  courseId!: string;
  fullName: string = '';
  profilePicture: string = '';
  issuedDate: string = '';
  title: string = '';
  thumbnail: string = '';
  courseDuration: string = '';
  isCourseCompleted: boolean = false;
  hasCertificate: boolean = false;
certificateImageUrl: string = '';

  curriculum: any[] = [];

  // New properties for HTML binding
  learningObjectives: string[] = [];
  courseRequirements: string[] = [];
  courseLevel: string[] = [];
isGeneratingImage: boolean = false;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    this.fullName = this.authService.getFullName() || '';

    this.loadCertificateData();
  }

  loadCertificateData(): void {
    this.courseService.getCertifiedCourseDetails(this.courseId).subscribe({
      next: (res) => {
        const data = res.data;

        this.title = data.title;
        this.profilePicture = data.student?.profilePicture || 'assets/default-avatar.jpg';
        this.issuedDate = data.createdAt;
        this.isCourseCompleted = data.isCompleted;
        this.hasCertificate = data.certificateIssued;
        this.curriculum = data.curriculum || [];
        this.thumbnail = data.thumbnail || 'assets/default-certificate.jpg';

        this.learningObjectives = data.learningObjectives || [];
        this.courseRequirements = data.courseRequirements || [];
        this.courseLevel = data.courseLevel || [];

        this.courseDuration = this.calculateTotalDuration(data.curriculum);
           // ✅ NOW: preview certificate only after data is ready
      if (this.isCourseCompleted && this.hasCertificate) {
        this.previewCertificateAsImage(); // ⬅️ generate the image now
      }
      },
      error: (err) => {
        console.error('❌ Failed to fetch certificate details:', err);
      }
    });
  }

  calculateTotalDuration(sections: any[]): string {
    let totalMinutes = 0;
    for (let section of sections) {
      for (let lecture of section.lectures || []) {
        const minutes = parseInt(lecture.lectureDuration.replace('m', ''), 10);
        totalMinutes += isNaN(minutes) ? 0 : minutes;
      }
    }
    return `${totalMinutes} minutes`;
  }
// 1. Preview method (convert PDF to image)
previewCertificateAsImage(): void {
  this.isGeneratingImage = true; // show spinner

  const issueDate = new Date(this.issuedDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  this.courseService.generateCertificate(this.fullName, this.title, issueDate).subscribe({
    next: async (blob) => {
      const pdfData = new Uint8Array(await blob.arrayBuffer());

      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      this.certificateImageUrl = canvas.toDataURL('image/png');
      this.isGeneratingImage = false;
    },
    error: () => {
      alert('❌ Failed to generate certificate preview');
      this.isGeneratingImage = false;
    }
  });
}


// 2. Actual PDF download
downloadCertificate(): void {
  const issueDate = new Date(this.issuedDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  this.courseService.generateCertificate(this.fullName, this.title, issueDate).subscribe({
    next: (blob) => {
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    },
    error: () => alert('❌ Failed to download certificate.')
  });
}


}

import { Component } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-student-certifications',
  templateUrl: './student-certifications.component.html',
  styleUrls: ['./student-certifications.component.css']
})
export class StudentCertificationsComponent {
  constructor(private courseService: CourseService) {}

downloadCertificate(): void {
  const studentName = 'Siva Prasad';
  const courseTitle = 'Mastering Angular';
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  this.courseService.generateCertificate(studentName, courseTitle, issueDate).subscribe({
    next: (blob) => {
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);

      // Open PDF in a new browser tab
      window.open(url, '_blank');

      // Optional: revoke URL later to free memory
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 10000); // wait 10 sec so user’s tab has loaded the PDF
    },
    error: (err) => {
      console.error('Download failed:', err);
      alert('Failed to download certificate.');
    }
  });
}



}

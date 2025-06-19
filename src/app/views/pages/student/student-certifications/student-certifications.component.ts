import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Folder } from 'src/app/core/enums/folder.enum';
import { CourseTracking } from 'src/app/core/models/courseTracking.model';
import { Student } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-student-certifications',
  templateUrl: './student-certifications.component.html',
  styleUrls: ['./student-certifications.component.css']
})
export class StudentCertificationsComponent {

  courseId!: string;
    studentId!: string;
    public studentDetails! :Student;
    public fullName!:string;
      previewURL: SafeResourceUrl | null = null;
courseTracking!: CourseTracking;


  constructor(private courseService: CourseService,private storage: AngularFireStorage, private domSanitizer: DomSanitizer, private router: Router,   private authService: AuthService,) {}


    ngOnInit() {

        // Get the userId and role from localStorage or AuthService
        this.studentId = localStorage.getItem('userId') || this.authService.getUserId() || '';
        const role = localStorage.getItem('userRole') || this.authService.getRole() || '';
        this.fullName = this.authService.getFullName() ||''  // e.g. "Jane Doe"
        console.log("User ID:", this.studentId);
        console.log("User Role:", role); // Log the user role for debugging
        }




viewCertificate(): void {
  const studentName = 'Siva Prasad';
  const courseTitle = 'Mastering Angular';
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // 1. Get PDF blob from backend
  this.courseService.generateCertificate(studentName, courseTitle, issueDate).subscribe({
    next: (blob) => {
      // ✅ Define file name first
      const fileName = `${courseTitle}-Certificate.pdf`;

      // ✅ Convert blob to File
      const file = new File([blob], fileName, { type: 'application/pdf' });

      // ✅ Firebase file path
      const filePath = `${Folder.Main_Folder}/${Folder.Student_Folder}/${this.fullName}/${Folder.Student_Sub_Folder_1}/${file.name}`;
      const fileRef = this.storage.ref(filePath);

      // ✅ Optional: Show local preview
      this.previewURL = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));

      // 2. Upload to Firebase
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().subscribe({
        next: (snapshot) => {
          if (snapshot?.state === 'success') {
            // 3. Get Firebase URL
            fileRef.getDownloadURL().subscribe((url) => {
              console.log('✅ Uploaded to Firebase. URL:', url);

              // 4. Save metadata to backend
              const certificateData = {
                studentName,
                courseTitle,
                issueDate,
                certificateUrl: url,
                courseId: "6852de0072653b6049617388"
              };

              this.courseService.saveCertificate(certificateData).subscribe({
                next: (res) => {
                  console.log('✅ Certificate record saved:', res);
                  this.router.navigate(['student/accomplishments/certificate', res.certificate._id]);
                },
                error: (err) => {
                  console.error('❌ Failed to save certificate metadata:', err);
                }
              });
            });
          }
        },
        error: (err) => {
          console.error('❌ Firebase upload failed:', err);
        }
      });
    },
    error: (err) => {
      console.error('❌ Certificate generation failed:', err);
      alert('Failed to generate certificate.');
    }
  });
}



}

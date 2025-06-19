import { CourseTracking } from './../../../../core/models/courseTracking.model';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { Certificate } from 'src/app/core/models/certificate.model';

@Component({
  selector: 'app-student-accomplishments',
  templateUrl: './student-accomplishments.component.html',
  styleUrls: ['./student-accomplishments.component.css']
})
export class StudentAccomplishmentsComponent implements OnInit {
  certificate: Certificate | null = null;
  certificateAvailable = false;
public trustedCertificateUrl: any;
courseId!:string
courseTracking!:CourseTracking

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {}

ngOnInit(): void {
  const certId = this.route.snapshot.paramMap.get('certId');

  if (certId) {
    this.courseService.getCertificateById(certId).subscribe({
      next: (res) => {
        this.certificate = res;
        this.certificateAvailable = true;

        // ✅ Set trusted URL for preview
        if (this.certificate.certificateUrl) {
          this.trustedCertificateUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.certificate.certificateUrl);
        }

        // ✅ courseId is already a string
        this.courseId = this.certificate.courseId;

        if (this.courseId) {
          this.courseService.getCourseProgress(this.courseId).subscribe({
            next: (progress) => {
              this.courseTracking = progress;
              console.log('✅ Course tracking:', progress);
            },
            error: (err) => {
              console.error('❌ Error fetching course progress:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('❌ Error fetching certificate:', err);
      }
    });
  }
}


  downloadCertificate(): void {
    if (this.certificate?.certificateUrl) {
      window.open(this.certificate.certificateUrl, '_blank');
    } else {
      alert('Certificate not available yet.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SOCIAL_ICONS, SocialPlatform } from 'src/app/core/enums/socialMedia.enum';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-student-profile-details',
  templateUrl: './student-profile-details.component.html',
  styleUrls: ['./student-profile-details.component.css']
})
export class StudentProfileDetailsComponent implements OnInit {
  studentId: string = '';
  studentProfile: any;
  purchasedCourses: any[] = [];
  enrolledCourses: any[] = [];
  showOverlay: { [key: string]: boolean } = {}; // Track overlay per course
  socialIcons = SOCIAL_ICONS;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('studentId');
      if (id) {
        this.studentId = id;
        this.loadStudentProfile(id);
      }
    });
  }

   loadStudentProfile(id: string): void {
    this.userService.getStudentProfileById(id).subscribe({
    next: (response: any) => {
      if (response.success && response.profile) {
       this.studentProfile = response.profile;
          console.log('✅ Student profile loaded:', this.studentProfile);      }
    }
  });
}


  playVideo(courseTitle: string, videoElement: HTMLVideoElement): void {
    videoElement.play();
    this.showOverlay[courseTitle] = false;
  }

  getSocialIcon(platform: string): string {
    const normalized = Object.keys(SocialPlatform).find(
      key => SocialPlatform[key as keyof typeof SocialPlatform].toLowerCase() === platform.toLowerCase()
    );
    return normalized
      ? this.socialIcons[SocialPlatform[normalized as keyof typeof SocialPlatform]]
      : 'bi bi-globe';
  }
}

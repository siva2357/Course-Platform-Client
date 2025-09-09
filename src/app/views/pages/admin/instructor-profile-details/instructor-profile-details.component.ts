import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SOCIAL_ICONS, SocialPlatform } from 'src/app/core/enums/socialMedia.enum';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-instructor-profile-details',
  templateUrl: './instructor-profile-details.component.html',
  styleUrls: ['./instructor-profile-details.component.css']
})
export class InstructorProfileDetailsComponent implements OnInit {
  instructorId: string = '';
  instructorProfile: any;
  @ViewChild('courseVideo') courseVideo!: ElementRef<HTMLVideoElement>;
public  showOverlay: boolean = true;
  socialIcons = SOCIAL_ICONS;

  constructor(
    private route: ActivatedRoute,
    private userService : UserService
  ) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('instructorId'); // ✅ match the route param name exactly
    if (id) {
      this.instructorId = id;
      this.loadInstructorProfile(id);
    }
  });
}


loadInstructorProfile(id: string): void {
  this.userService.getInstructorProfileById(id).subscribe({
    next: (response: any) => {
      if (response.success && response.profile) {
        this.instructorProfile = response.profile;
        console.log('✅ Client profile loaded:', this.instructorProfile);
      }
    }
  });
}


  playVideo(): void {
    const video = this.courseVideo.nativeElement;
    video.play();
    this.showOverlay = false;
  }

getSocialIcon(platform: string): string {
  // Normalize to enum keys
  const normalized = Object.keys(SocialPlatform).find(
    key => SocialPlatform[key as keyof typeof SocialPlatform].toLowerCase() === platform.toLowerCase()
  );

  return normalized
    ? this.socialIcons[SocialPlatform[normalized as keyof typeof SocialPlatform]]
    : 'bi bi-globe'; // fallback
}


}

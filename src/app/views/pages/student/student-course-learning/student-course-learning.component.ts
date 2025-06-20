import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/models/course.model';

@Component({
  selector: 'app-student-course-learning',
  templateUrl: './student-course-learning.component.html',
  styleUrls: ['./student-course-learning.component.css']
})
export class StudentCourseLearningComponent implements OnInit {

  courseId!: string;
  courseTitle!: string;
  sections: any[] = [];
  selectedSectionIndex = 0;
  selectedSection: any;
openedLectureIndex: number | null = null;
openedLectureIndices: { [sectionIndex: number]: number | null } = {};

  progressPercentage: number = 0;
  isCourseCompleted: boolean = false;
  certificateIssued: boolean = false;

  completedLectureIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('courseId');
      if (!id) return console.error('❌ Course ID not found');
      this.courseId = id;

      this.loadCourseProgress();
    });
  }

loadCourseProgress(callback?: () => void): void {
    this.courseService.getCourseProgress(this.courseId).subscribe(progress => {
      this.courseTitle = progress.courseTitle || 'Untitled';
      this.isCourseCompleted = progress.isCourseCompleted;
      this.certificateIssued = progress.certificateIssued;
      this.progressPercentage = Math.floor(progress.progressPercentage || 0);

      this.updateCurriculumStatuses(progress.curriculum || []);

 if (this.sections.length > 0) {
  this.selectSection(this.selectedSectionIndex);
}

if (callback) callback(); // ✅ Reopen the lecture

    });
  }

  private updateCurriculumStatuses(curriculum: any[]) {
    const completedIds = new Set(
      curriculum?.flatMap((s: any) =>
        s.lectures?.filter((l: any) => l.status === 'Completed').map((l: any) => l._id)
      ) || []
    );

    this.completedLectureIds = Array.from(completedIds);
    this.sections = curriculum;

    this.sections.forEach(section => {
      section.lectures?.forEach((lecture: any) => {
        lecture.status = completedIds.has(lecture._id) ? 'Completed' : 'Incomplete';
      });

      const totalLectures = section.lectures?.length || 0;
      const completedCount = section.lectures?.filter((l: any) => l.status === 'Completed').length;

      if (completedCount === totalLectures && totalLectures > 0) {
        section.status = 'Completed';
      } else if (completedCount > 0) {
        section.status = 'In Progress';
      } else {
        section.status = 'Pending';
      }
    });
  }

selectSection(index: number): void {
  this.selectedSectionIndex = index;
  this.selectedSection = this.sections[index];
  this.openedLectureIndex = this.openedLectureIndices[index] ?? null;
}


  goToCertificate(): void {
    this.router.navigate(['/student/my-certifications']);
  }

markAsCompleted(lectureId: string): void {
  const sectionIndex = this.selectedSectionIndex;
  const lectureIndex = this.openedLectureIndex;

  this.courseService.markLectureCompleted(this.courseId, lectureId).subscribe({
    next: () => {
      this.loadCourseProgress(() => {
        this.selectSection(sectionIndex);
        if (lectureIndex !== null) {
          this.openedLectureIndex = lectureIndex;
          this.openedLectureIndices[sectionIndex] = lectureIndex;
        }
      });
    },
    error: (err) => console.error('Error marking lecture complete', err)
  });
}


onLectureClick(lectureIndex: number): void {
  this.openedLectureIndex = lectureIndex;
  this.openedLectureIndices[this.selectedSectionIndex] = lectureIndex;
}


  isLectureCompleted(lectureId: string): boolean {
    return this.completedLectureIds.includes(lectureId);
  }
}

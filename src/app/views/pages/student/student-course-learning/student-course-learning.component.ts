import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-student-course-learning',
  templateUrl: './student-course-learning.component.html',
  styleUrls: ['./student-course-learning.component.css']
})
export class StudentCourseLearningComponent implements OnInit {
  courseId!: string;
  courseTitle: string = '';
  sections: any[] = [];
  selectedSectionIndex: number = 0;
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

  // 🔄 Load course progress and update UI
  loadCourseProgress(callback?: () => void): void {
    this.courseService.getCourseProgress(this.courseId).subscribe(progress => {
      this.courseTitle = progress.courseTitle || 'Untitled';
      this.progressPercentage = Math.floor(progress.progressPercentage || 0);
      this.isCourseCompleted = progress.isCourseCompleted;
      this.certificateIssued = progress.certificateIssued;

      this.updateCurriculumStatuses(progress.curriculum || []);

      if (this.sections.length > 0) {
        this.selectSection(this.selectedSectionIndex);
      }

      if (callback) callback(); // 🔁 Keep state after update
    });
  }

  // 📊 Determine section/lecture status
  private updateCurriculumStatuses(curriculum: any[]): void {
    const completedIds = new Set(
      curriculum.flatMap(section =>
        section.lectures?.filter((lecture: any) => lecture.status === 'Completed').map((l: any) => l._id)
      ) || []
    );

    this.completedLectureIds = Array.from(completedIds);
    this.sections = curriculum;

    this.sections.forEach(section => {
      section.lectures?.forEach((lecture: any) => {
        lecture.status = completedIds.has(lecture._id) ? 'Completed' : 'Incomplete';
      });

      const total = section.lectures?.length || 0;
      const completed = section.lectures?.filter((l: any) => l.status === 'Completed').length;

      section.status = completed === total && total > 0 ? 'Completed' :
                       completed > 0 ? 'In Progress' : 'Pending';
    });
  }

  // 🧭 Select current section
  selectSection(index: number): void {
    this.selectedSectionIndex = index;
    this.selectedSection = this.sections[index];
    this.openedLectureIndex = this.openedLectureIndices[index] ?? null;
  }

  // ✅ Navigate to certificate
  goToCertificate(): void {
    this.router.navigate(['/student/my-certifications']);
  }

  // ✅ Mark lecture completed
  markLectureCompleted(lectureId: string): void {
    this.courseService.markLectureCompleted(this.courseId, lectureId).subscribe({
      next: () => this.reloadSectionState(),
      error: err => console.error('Error marking lecture complete', err)
    });
  }

  // ✅ Mark individual content completed
  markContentCompleted(lectureId: string, contentId: string): void {
    this.courseService.markContentCompleted(this.courseId, lectureId, contentId).subscribe({
      next: () => this.reloadSectionState(),
      error: err => console.error('Error marking content complete', err)
    });
  }

  // ♻️ Reload UI state while preserving selected section/lecture
  private reloadSectionState(): void {
    const sectionIndex = this.selectedSectionIndex;
    const lectureIndex = this.openedLectureIndex;

    this.loadCourseProgress(() => {
      this.selectSection(sectionIndex);
      if (lectureIndex !== null) {
        this.openedLectureIndex = lectureIndex;
        this.openedLectureIndices[sectionIndex] = lectureIndex;
      }
    });
  }

  // 📖 Track opened lecture
  onLectureClick(lectureIndex: number): void {
    this.openedLectureIndex = lectureIndex;
    this.openedLectureIndices[this.selectedSectionIndex] = lectureIndex;
  }

  // ✅ Check if lecture is marked completed
  isLectureCompleted(lectureId: string): boolean {
    return this.completedLectureIds.includes(lectureId);
  }
}

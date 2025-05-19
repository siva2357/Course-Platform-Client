import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-course-page-details',
  templateUrl: './course-page-details.component.html',
  styleUrls: ['./course-page-details.component.css']
})
export class CoursePageDetailsComponent {

  activeSection = 'section1';

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    this.activeSection = sectionId;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];
    for (let section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}

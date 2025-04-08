import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {



  constructor(private router:Router) { }


  categories = [
    { id: 'all', label: 'All' },
    { id: 'animation', label: 'Animation' },
    { id: 'modeling', label: 'Modeling' },
    { id: 'conceptArt', label: 'Concept Art' },
    { id: 'visualEffects', label: 'Visual Effects' }
  ];

  selectedTab = 'all';
  selectedCategory: string = 'all'; // or default category ID like 'all'


  courses = [
    {
      title: 'Real-time Virtual Production',
      category: 'animation',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Concept Art Fundamentals',
      category: 'conceptArt',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744000400/all-courses-header-01_1_vcgijc.webp',
      description: 'Learn the basics of concept art...',
      time: '12 mins'
    }
    // more courses...
  ];

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }

  getCoursesByCategory(categoryId: string) {
    if (categoryId === 'all') return this.courses;
    return this.courses.filter(course => course.category === categoryId);
  }

  // This method will be triggered when the tab or dropdown changes
  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId;
    this.selectedTab = categoryId;
  }

  get selectedCategoryLabel(): string {
    const selected = this.categories.find(c => c.id === this.selectedCategory);
    return selected ? selected.label : '';
  }

  goToCoursePage(){
    this.router.navigateByUrl(`courses/courseName`);

  }

}

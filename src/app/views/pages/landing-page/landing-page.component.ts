import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router:Router) { }


  categories = [
    { id: 'all', label: 'All' },
    { id: 'animation', label: 'Animation' },
    { id: 'modeling', label: 'Modeling' },
    { id: 'conceptArt', label: 'Concept Art' },
    { id: 'visualEffects', label: 'Visual Effects' },
    { id: 'gameDesign', label: 'Game Development' }

  ];

  selectedTab = 'all';
  selectedCategory: string = 'all';


  courses = [
    {
      title: '3D Animation',
      category: 'animation',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Animation',
      category: 'animation',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Animation',
      category: 'animation',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Animation',
      category: 'animation',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Animation',
      category: 'animation',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Modeling',
      category: 'modeling',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Modeling',
      category: 'modeling',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Modeling',
      category: 'modeling',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
     {
      title: '3D Modeling',
      category: 'modeling',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: '3D Modeling',
      category: 'modeling',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Art Concept',
      category: 'conceptArt',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Art Concept',
      category: 'conceptArt',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Art Concept',
      category: 'conceptArt',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Art Concept',
      category: 'conceptArt',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Art Concept',
      category: 'conceptArt',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'VFX',
      category: 'visualEffects',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'VFX',
      category: 'visualEffects',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'VFX',
      category: 'visualEffects',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'VFX',
      category: 'visualEffects',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'VFX',
      category: 'visualEffects',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Gaming',
      category: 'gameDesign',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Gaming',
      category: 'gameDesign',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Gaming',
      category: 'gameDesign',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Gaming',
      category: 'gameDesign',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },
    {
      title: 'Gaming',
      category: 'gameDesign',
      imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1735393677/real-time-virtual-production-diploma-course-tile_mrfff0.webp',
      description: 'This is a wider card with supporting text...',
      time: '9 mins'
    },




    // more courses...
  ];

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }
  getCoursesByCategory(categoryId: string): any[] {
    if (categoryId === 'all') {
      return this.courses;
    } else {
      return this.courses.filter(course => course.category === categoryId);
    }
  }

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

  getCardsPerSlide(): number {
  const width = window.innerWidth;
  if (width >= 992) return 4; // large screens
  if (width >= 768) return 3; // medium screens
  return 1; // small screens
}

// ✅ Fix this function — make sure it refers to `this.courses`
getCarouselSlides(categoryId: string, cardsPerSlide: number): any[][] {
  const filtered = categoryId === 'all'
    ? this.courses
    : this.courses.filter(course => course.category === categoryId);

  const grouped: any[][] = [];
  for (let i = 0; i < filtered.length; i += cardsPerSlide) {
    grouped.push(filtered.slice(i, i + cardsPerSlide));
  }
  return grouped;
}



}

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
    { id: 'visualEffects', label: 'Visual Effects' },
    { id: 'gameDesign', label: 'Game Development' }

  ];

  selectedTab = 'all';
  selectedCategory: string = 'all'; // or default category ID like 'all'


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




  // onCategoryChange(categoryId: string) {
  //   this.selectedCategory = categoryId;
  //   this.selectedTab = categoryId;

  //   setTimeout(() => {
  //     const carouselElement = document.getElementById('carousel-' + categoryId);
  //     if (carouselElement) {
  //       new bootstrap.Carousel(carouselElement);
  //     }
  //   }, 0);


  // }


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
  getCarouselSlides(categoryId: string): any[][] {
    let filteredCourses = this.courses;

    if (categoryId !== 'all') {
      filteredCourses = this.courses.filter(course => course.category === categoryId);
    }

    const slides: any[][] = [];
    for (let i = 0; i < filteredCourses.length; i += 3) {
      slides.push(filteredCourses.slice(i, i + 3));
    }
    return slides;
  }






}

import { Component } from '@angular/core';

interface Course {
  title: string;
  description: string;
  imageUrl: string;
}

interface Category {
  label: string;
  id: string;
  courses: Course[];
}

@Component({
  selector: 'app-find-courses',
  templateUrl: './find-courses.component.html',
  styleUrls: ['./find-courses.component.css']
})
export class FindCoursesComponent {

  categories: Category[] = [
    {
      label: 'IT Development',
      id: 'it',
      courses: [
        { title: 'Frontend Developer', description: 'Learn HTML, CSS, JS & Angular', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Backend Developer', description: 'Node.js, Express & Databases', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Full Stack Engineer', description: 'Frontend + Backend Combined', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'DevOps Engineer', description: 'CI/CD pipelines & cloud', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Mobile App Developer', description: 'iOS & Android apps', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Cloud Engineer', description: 'AWS, Azure, GCP', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Software Tester', description: 'Manual & Automated Testing', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'QA Engineer', description: 'Quality Assurance & Tools', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'System Administrator', description: 'Servers & Networking', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'UI Developer', description: 'Interactive UI & Components', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
      ]
    },
    {
      label: 'Creative and Design',
      id: 'design',
      courses: [
        { title: 'UI/UX Designer', description: 'Design engaging user experiences', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Graphic Designer', description: 'Photoshop, Illustrator & Branding', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Animator', description: '2D/3D Animation and Motion Design', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Visual Designer', description: 'Visual storytelling & layouts', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Product Designer', description: 'End-to-end product design', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Brand Designer', description: 'Brand identity & style guides', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Illustrator', description: 'Digital illustration & drawing', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Motion Designer', description: 'Animations for web & video', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Packaging Designer', description: 'Product packaging design', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: '3D Artist', description: '3D modeling & rendering', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
      ]
    },
    {
      label: 'AI Services',
      id: 'ai',
      courses: [
        { title: 'Machine Learning Engineer', description: 'ML algorithms & pipelines', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Data Scientist', description: 'Data analysis & predictive modeling', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'NLP Engineer', description: 'Text & speech processing', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Computer Vision Engineer', description: 'Image & video processing', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Deep Learning Engineer', description: 'Neural networks & AI models', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Data Analyst', description: 'Data visualization & insights', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Chatbot Developer', description: 'Build conversational agents', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'MLOps Engineer', description: 'Deploy & manage ML pipelines', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'AI Product Manager', description: 'Lead AI product development', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
        { title: 'Automation Engineer', description: 'AI-driven automation', imageUrl: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1744170029/26196026_top_management_15_qdqj4g.jpg' },
      ]
    }
  ];

  selectedCategory: string = 'all';

getResponsiveSlides(courses: Course[]): Course[][] {
  const slides: Course[][] = [];
  const windowWidth = window.innerWidth;
  let chunkSize = 4; // default for large screens

  if (windowWidth < 768) {
    chunkSize = 1; // small devices
  } else if (windowWidth < 992) {
    chunkSize = 3; // medium devices
  }

  for (let i = 0; i < courses.length; i += chunkSize) {
    slides.push(courses.slice(i, i + chunkSize));
  }

  return slides;
}



}

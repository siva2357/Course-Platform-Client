import { Component} from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Purchase } from 'src/app/core/models/purchase.model';


@Component({
  selector: 'app-student-my-courses',
  templateUrl: './student-my-courses.component.html',
  styleUrls: ['./student-my-courses.component.css']
})
export class StudentMyCoursesComponent  {

  constructor() {}

public myCourses: any[] = [
  {
    courseTitle: 'Angular Crash Course',
    description: 'Master the basics of Angular step-by-step.',
    thumbnail: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1750510782/756150_c033_4_qcmqc0.webp',
    progress: 30
  },
  {
    courseTitle: 'React Fundamentals',
    description: 'Learn modern React with hooks and components.',
    thumbnail: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1750510836/5939718_4725_4_k2a8qq.webp',
    progress: 50
  },
  {
    courseTitle: 'Node.js API Development',
    description: 'Build real RESTful APIs using Node and Express.',
    thumbnail: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1750510923/6624533_08bc_3_zwmn8z.webp',
    progress: 20
  },
  {
    courseTitle: 'Full Stack with Django',
    description: 'Build full-stack apps using Django & React.',
    thumbnail: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1750510944/2243250_f8ef_10_m8spyc.webp',
    progress: 40
  }
];


  goToCourse(courseTitle: string) {
    alert('Go to course: ' + courseTitle);
    // Replace with routing logic if needed
  }




}

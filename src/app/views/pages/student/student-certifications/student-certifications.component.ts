import { Router } from '@angular/router';
import { Component} from '@angular/core';


@Component({
  selector: 'app-student-certifications',
  templateUrl: './student-certifications.component.html',
  styleUrls: ['./student-certifications.component.css']
})
export class StudentCertificationsComponent {

  constructor(private router : Router) {}

  viewCertificate(){
  this.router.navigateByUrl('/student/accomplishments/certificate/:certid');

  }

}

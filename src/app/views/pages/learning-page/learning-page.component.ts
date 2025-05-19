import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.css']
})
export class LearningPageComponent {

  constructor(private router:Router) { }
  goToRegistrationPage(){
    this.router.navigate(['learner/registration-page']);
  }

}

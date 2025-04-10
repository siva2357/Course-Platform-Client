import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teaching-page',
  templateUrl: './teaching-page.component.html',
  styleUrls: ['./teaching-page.component.css']
})
export class TeachingPageComponent {

  constructor( private router: Router) {}


  goToRegistrationPage(){
    this.router.navigate(['educator/registration-page']);
  }

}

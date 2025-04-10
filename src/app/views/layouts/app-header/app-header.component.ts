import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

  constructor(public router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  showMenu = false;
activeCategory: any = null;
hideTimeout: any = null;

onMenuEnter() {
  clearTimeout(this.hideTimeout);
  this.showMenu = true;

}

onMenuLeave() {
  this.hideTimeout = setTimeout(() => {
    this.showMenu = false;

    this.activeCategory = null;
  }, 200); // delay to allow re-entry
}



  mainCategories = [
    {
      name: 'Web Development',
      subcategories: ['HTML', 'CSS', 'Angular', 'React', 'Vue', 'Next.js']
    },
    {
      name: 'AI / Machine Learning',
      subcategories: ['Python ML', 'TensorFlow', 'PyTorch', 'Scikit-Learn']
    },
    {
      name: 'Mobile Development',
      subcategories: ['Flutter', 'React Native', 'Swift', 'Kotlin']
    },
    {
      name: 'Game Development',
      subcategories: ['Unity', 'Unreal Engine', 'Godot']
    }
  ];

}

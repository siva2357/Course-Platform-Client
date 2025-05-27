import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-account-settings-page',
  templateUrl: './instructor-account-settings-page.component.html',
  styleUrls: ['./instructor-account-settings-page.component.css'],
})
export class InstructorAccountSettingsPageComponent  {

  constructor(private router: Router,) {}

  goToDashboard(){
    this.router.navigate([`/instructor`]);
  }


}

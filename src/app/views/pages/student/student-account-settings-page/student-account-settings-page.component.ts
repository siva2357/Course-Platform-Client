import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-account-settings-page',
  templateUrl: './student-account-settings-page.component.html',
  styleUrls: ['./student-account-settings-page.component.css']
})
export class StudentAccountSettingsPageComponent {

    constructor(private router: Router,) {}

    goToDashboard(){
      this.router.navigate([`/student`]);
    }


}

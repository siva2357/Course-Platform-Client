import { Component } from '@angular/core';

@Component({
  selector: 'app-learner-purchases',
  templateUrl: './learner-purchases.component.html',
  styleUrls: ['./learner-purchases.component.css']
})
export class LearnerPurchasesComponent {

  activeTab: string = 'courses';

  setActiveTab(tab: string): void {
		this.activeTab = tab;
	}

}

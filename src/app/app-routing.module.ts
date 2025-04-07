import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Public and Shared Components
import { LandingPageComponent } from './views/pages/landing-page/landing-page.component';



const routes: Routes = [
  // Public routes
  { path: 'landing-page', component:  LandingPageComponent, title: 'Main page' },
  { path: '**', redirectTo: 'landing-page' }, // Fallback rou

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

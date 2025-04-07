import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';

import { AppFooterComponent } from '../../app-footer/app-footer.component';
import { AppHeaderComponent } from '../../app-header/app-header.component';

@NgModule({
  declarations: [

    AppHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
 exports: [
    AppHeaderComponent,
    AppFooterComponent
  ],
  providers: [DatePipe],
})
export class LayoutModule { }

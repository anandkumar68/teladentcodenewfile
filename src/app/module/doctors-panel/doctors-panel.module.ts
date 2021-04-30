import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsPanelRoutingModule } from './doctors-panel-routing.module';
import { DoctorsPanelComponent } from './doctors-panel.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';
import { DoctorsReviewsComponent } from './doctors-reviews/doctors-reviews.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    DoctorsPanelComponent,
    DoctorDashboardComponent,
    AppointmentsComponent,
    DoctorSidebarComponent,
    DoctorsReviewsComponent,
    ProfileSettingComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    DoctorsPanelRoutingModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TagInputModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    NgCircleProgressModule,
    NgxUiLoaderModule

  ],
})
export class DoctorsPanelModule { }

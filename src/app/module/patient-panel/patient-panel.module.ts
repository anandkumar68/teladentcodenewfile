import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientPanelRoutingModule } from './patient-panel-routing.module';
import { PatientPanelComponent } from './patient-panel.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientSidebarComponent } from './patient-sidebar/patient-sidebar.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PatientProfileSettingsComponent } from './patient-profile-settings/patient-profile-settings.component';
import { PatientChangePasswordComponent } from './patient-change-password/patient-change-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';


@NgModule({
  declarations: [PatientPanelComponent, PatientDashboardComponent, PatientSidebarComponent, FavouritesComponent, PatientProfileSettingsComponent, PatientChangePasswordComponent, RescheduleAppointmentComponent, InvoicePdfComponent],
  imports: [
    CommonModule,
    PatientPanelRoutingModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class PatientPanelModule { }

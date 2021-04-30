import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientAuthGuardGuard } from '../auth-guard/patient/patient-auth-guard.guard';
import { FavouritesComponent } from './favourites/favourites.component';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';
import { PatientChangePasswordComponent } from './patient-change-password/patient-change-password.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientPanelComponent } from './patient-panel.component';
import { PatientProfileSettingsComponent } from './patient-profile-settings/patient-profile-settings.component';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';

const routes: Routes = [
  {
    path:'',
    component: PatientPanelComponent,
    canActivate:[PatientAuthGuardGuard],
    children: [
      {
        path:'patient-dashboard',
        component: PatientDashboardComponent,
      },
      {
        path:'favourites',
        component: FavouritesComponent,
      },
      {
        path:'patient-profile-setting',
        component: PatientProfileSettingsComponent,
      },
      {
        path:'patient-change-password',
        component: PatientChangePasswordComponent,
      },
      {
        path:'reschedule-appointment/:providerId/:appointId',
        component: RescheduleAppointmentComponent,
      },
      {
        path:'invoice-details/:pdfId',
        component: InvoicePdfComponent,
      },
      {
        path: '',
        redirectTo: 'patient-dashboard',
        pathMatch:'full',
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientPanelRoutingModule { }

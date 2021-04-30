import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineDoctorAuthGuardGuard } from '../auth-guard/online-doctors/online-doctor-auth-guard.guard';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorsPanelComponent } from './doctors-panel.component';
import { DoctorsReviewsComponent } from './doctors-reviews/doctors-reviews.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';

const routes: Routes = [
  {
    path:'',
    component: DoctorsPanelComponent,
    canActivate:[OnlineDoctorAuthGuardGuard],
    children: [
      {
        path:'doctor-dashboard',
        component: DoctorDashboardComponent,
      },
      {
        path:'doctor-appointments',
        component: AppointmentsComponent,
      },
      {
        path:'doctor-reviews',
        component: DoctorsReviewsComponent,
      },
      {
        path:'doctor-change-password',
        component: ChangePasswordComponent,
      },
      {
        path:'doctor-profile-setting',
        component: ProfileSettingComponent,
      },
      {
        path: '',
        redirectTo: 'doctor-dashboard',
        pathMatch:'full',
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsPanelRoutingModule { }

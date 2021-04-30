import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginModal } from 'src/app/shared/components/login-modal/login-modal';
import { LoginModalService } from 'src/app/shared/components/login-modal/login-modal.service';
import { Constants } from 'src/app/shared/constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  modelData = new LoginModal();
  constructor(
    public router: Router,
    public toastr: ToastrService,
    private loginModalService: LoginModalService

  ) { }

  ngOnInit(): void {
    document.getElementById("copyright").innerHTML =
      "&copy; 2021 Teladent. All rights reserved. | Designed By <a href='javascript:void(0);'>Teladentist Solutions</a> ";
  }

  open(modalType: string, content: string) {
    this.modelData.type = modalType;
    this.modelData.content = content;
    this.loginModalService.open(this.modelData);
  }


  // Router Link
  footerRouter(routerLink) {
    this.router.navigateByUrl(routerLink);
  }

  // Patient Link
  patientRouter(linkType, modalType: string, content: string, allowUser: String) {
    try {

      if (linkType === 'login' || linkType === 'signup') {

        if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();

        }

        this.modelData.type = modalType;
        this.modelData.content = content;
        this.modelData.allowUser = allowUser;
        this.loginModalService.open(this.modelData);

      }

      if (linkType === 'booking' || linkType === 'patientDash') {

        if (!localStorage.getItem('token')) {

          if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

            (document.getElementById('logoutCall') as HTMLInputElement).click();

          }

          this.modelData.type = modalType;
          this.modelData.content = content;
          this.modelData.allowUser = allowUser;
          this.loginModalService.open(this.modelData);

        } else {

          Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'onlineDoctors' ?
            this.toastr.error('You are logged in as a Doctor. Please Login as a User.') : '';

          if (Constants.credentialsDecrypt(localStorage.getItem('loginAs')) !== 'user') {

            if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();

            }

            this.modelData.type = modalType;
            this.modelData.content = content;
            this.modelData.allowUser = allowUser;
            this.loginModalService.open(this.modelData);

          } else {

            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));

            if (isExpired) {

              if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

                (document.getElementById('logoutCall') as HTMLInputElement).click();

              }

              this.modelData.type = modalType;
              this.modelData.content = content;
              this.modelData.allowUser = allowUser;
              this.loginModalService.open(this.modelData);

            } else {

              linkType === 'booking' ?
                this.router.navigateByUrl('/online-consultation?limit=10&skip=0') :
                this.router.navigateByUrl('/patient-panel/patient-dashboard')

            }

          }

        }

      }

    } catch (error) {
      console.log(error.message);
    }
  }

  // Dentist Link
  densitRouter(linkType, modalType: string, content: string, allowUser: String) {
    try {

      if (linkType === 'login' || linkType === 'signup') {

        if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();

        } 
        
        this.modelData.type = modalType;
        this.modelData.content = content;
        this.modelData.allowUser = allowUser;
        this.loginModalService.open(this.modelData);

      }

      if (linkType === 'appointment' || linkType === 'doctorDash') {

        if (!localStorage.getItem('token')) {

          if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

            (document.getElementById('logoutCall') as HTMLInputElement).click();

          }
          this.modelData.type = modalType;
          this.modelData.content = content;
          this.modelData.allowUser = allowUser;
          this.loginModalService.open(this.modelData);

        } else {

          Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'user' ?
            this.toastr.error('You are logged in as a User. Please Login as a Dentist.') : '';

          if (Constants.credentialsDecrypt(localStorage.getItem('loginAs')) !== 'onlineDoctors') {

            if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();

            }

            this.modelData.type = modalType;
            this.modelData.content = content;
            this.modelData.allowUser = allowUser;
            this.loginModalService.open(this.modelData);

          } else {

            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));

            if (isExpired) {

              if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

                (document.getElementById('logoutCall') as HTMLInputElement).click();

              }
              this.modelData.type = modalType;
              this.modelData.content = content;
              this.modelData.allowUser = allowUser;
              this.loginModalService.open(this.modelData);

            } else {

              linkType === 'doctorDash' ?
                this.router.navigateByUrl('/doctor-dashboard') :
                this.router.navigateByUrl('/doctors-panel/doctor-appointments')

            }

          }

        }

      }

    } catch (error) {
      console.log(error.message);
    }
  }

}

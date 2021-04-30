import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from 'src/app/shared/constant';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctorId: any;
  doctorDetail: any;

  constructor(
    public apiService: WebApiService,
    public activatedRouter: ActivatedRoute,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.doctorId = this.activatedRouter.snapshot.params.doctorId;
    this.doctorDetails();

  }

  doctorDetails() {
    try {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      this.ngxLoader.startLoader('loader-01');
      
      this.apiService.getDoctorDetails(this.doctorId).subscribe((resolve) => {

        if(resolve.status === 'success') {

          this.doctorDetail = resolve.data;
          console.log(this.doctorDetail);
          this.ngxLoader.stopLoader('loader-01');

        }
        
        if(resolve.status === 'error') {

          this.toastr.error(resolve.message);
          this.ngxLoader.stopLoader('loader-01');

        }

      },
      err => this.ngxLoader.stopLoader('loader-01'))

    } catch (error) {
      console.log(error);
    }
  }

  bookAppointments(doctorId) {
    try {

      if(localStorage.getItem('token') === null) {
        (document.getElementById('loginCall') as HTMLInputElement).click();
      } else {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));
        if(isExpired) {
          (document.getElementById('loginCall') as HTMLInputElement).click();
        } else {
          this.router.navigateByUrl(`/booking/${doctorId}`);
        }
      }
      

    } catch (error) {
      console.log(error)
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Constants } from '../../shared/constant';
import { NgxUiLoaderService } from 'ngx-ui-loader';




@Component({
  selector: 'app-online-consultation',
  templateUrl: './online-consultation.component.html',
  styleUrls: ['./online-consultation.component.css']
})
export class OnlineConsultationComponent implements OnInit {

  userDoctorList = [];
  userDoctorSpecialistList = [];
  specialistObject = {};
  genderList = {
    Male: false,
    Female: false
  };
  totalDocuments = 0;
  isDisabledClassActive = true;
  pageNum = 1;
  limit = 10;


  math = Math;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };

  constructor(
    public serviceApi: WebApiService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public ngxLoader: NgxUiLoaderService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.activatedRoute.queryParams.subscribe(response => {
          this.doctorList(response);
        });
      }
    });
  }

  ngOnInit(): void {

    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).removeAttribute('style');

    this.doctorSpecialistList();
    this.activatedRoute.queryParams.subscribe(response => {

      if (response['gender']) {
        (document.getElementById(response['gender']) as HTMLInputElement).checked = true;
        this.genderList[response['gender']] = true;
      }

      setTimeout(() => {
        if (response['speciality']) {

          for (let special of response['speciality']) {

            (document.getElementById(special) as HTMLInputElement).checked = true;
            this.specialistObject[special] = true;

          }
        }
      }, 500);

      this.doctorList(response);
    });
  }

  // Doctor List
  doctorList(data) {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      this.ngxLoader.startLoader('loader-01');
      this.serviceApi.getUserDoctorlist(data).subscribe((resolve) => {

        if (resolve.status === 'success') {

          this.userDoctorList = resolve.data.doctorList;
          this.totalDocuments = resolve.data.totalDocuments;
          this.ngxLoader.stopLoader('loader-01');

        } else {
          this.ngxLoader.stopLoader('loader-01');
        }
      },
        err => {
          this.ngxLoader.stopLoader('loader-01');
          Constants.handleError(err);
        })
    } catch (error) {
      console.log(error);
    }
  }

  // ON PAGE CHANGE EVENTS
  onPageChange(page: number) {
    this.pageNum = page;
  }

  // Doctor Specialist list
  doctorSpecialistList() {
    try {

      this.serviceApi.getUserSpecialistDoctorlist().subscribe((resolve) => {

        if (resolve.status === 'success') {

          this.userDoctorSpecialistList = resolve.data;
          for (let specialist of this.userDoctorSpecialistList) {
            this.specialistObject[specialist] = false;
          }

        }
      },
        err => console.log(err));

    } catch (error) {
      console.log(error);
    }
  }

  filterSpecialist(checkedValue) {

    this.specialistObject[checkedValue] = (document.getElementById(checkedValue) as HTMLInputElement).checked;
    this.searchValidation();
  }

  filterGender(checkedValue) {

    this.genderList[checkedValue] = (document.getElementById(checkedValue) as HTMLInputElement).checked;
    if (checkedValue === 'Male') {
      (document.getElementById('Female') as HTMLInputElement).checked = false;
      this.genderList['Female'] = false;
    }
    else {
      (document.getElementById('Male') as HTMLInputElement).checked = false;
      this.genderList['Male'] = false;
    }


    this.searchValidation();
  }

  // Search Validation
  searchValidation() {

    try {
      let searchValidationValue = false;

      if (
        JSON.stringify(this.genderList).search('true') > -1 ||
        JSON.stringify(this.specialistObject).search('true') > -1
      ) {
        searchValidationValue = true;
      }

      searchValidationValue ? this.isDisabledClassActive = false : this.isDisabledClassActive = true;
      if (!searchValidationValue) {
        this.router.navigate(['/online-consultation'], { queryParams: { limit: this.limit, skip: 0 } });
      }

    } catch (error) {
      console.log(error);
    }

  }

  // Doctor Filter
  filterDoctor() {
    try {
      let queryParams = {};
      for (let gender in this.genderList) {
        if (this.genderList[gender] === true) {
          queryParams['gender'] = gender
        }
      }

      for (let specialist in this.specialistObject) {
        if (this.specialistObject[specialist] === true) {

          if (!queryParams['speciality']) {
            queryParams['speciality'] = [];
          }

          queryParams['speciality'].push(specialist);

        }
      }

      queryParams['limit'] = this.limit;
      queryParams['skip'] = (this.pageNum * this.limit) - this.limit;
      this.router.navigate(['/online-consultation'], { queryParams: queryParams });

    } catch (error) {
      console.log(error);
    }
  }

  appointmentForward(doctorId) {
    try {

      if (localStorage.getItem('token') === null) {
        (document.getElementById('loginCall') as HTMLInputElement).click();
      } else {

        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));

        if (isExpired) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();
          setTimeout(() => {
            (document.getElementById('loginCall') as HTMLInputElement).click();
          }, 200);

        } else {
          this.router.navigateByUrl(`/booking/${doctorId}`);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  viewProfile(doctorId) {
    try {

      if (localStorage.getItem('token') === null) {
        (document.getElementById('loginCall') as HTMLInputElement).click();
      } else {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));
        if (isExpired) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();
          setTimeout(() => {
            (document.getElementById('loginCall') as HTMLInputElement).click();
          }, 200);

        } else {
          this.router.navigateByUrl(`/doctor-profile/${doctorId}`);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
}

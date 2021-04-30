import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  math = Math;

  currentPage = 1;
  perPage = 10;
  dashboardData = [];
  dashboardTodayData = [];
  progressData: any;
  individualDetails: any;
  todayDate: Date;

  dashboardTab = 'all';
  total = 0;

  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  updateDrug = [];
  urls = [];
  completeAppointId: any;
  isDescription = false;
  completeForm: any;
  constructor(
    private api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    $('.form').find('input, textarea').on('keyup blur focus', function (e) {

      var $this = $(this),
        label = $this.prev('label');

      if (e.type === 'keyup') {
        if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
      } else if (e.type === 'blur') {
        if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.removeClass('highlight');
        }
      } else if (e.type === 'focus') {

        if ($this.val() === '') {
          label.removeClass('highlight');
        }
        else if ($this.val() !== '') {
          label.addClass('highlight');
        }
      }

    });

    $('.tab a').on('click', function (e) {

      e.preventDefault();

      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');

      const target = $(this).attr('href');

      $('.pop-tab-content > div').not(target).hide();

      $(target).fadeIn(600);

    });
    this.todayDate = new Date();
    this.getDashboardDetails('all');
    this.completeFormValidation();
    window.scroll({ // <- Scroll window instead of scrollContainer
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


  // FOR GET APPOINTMENT LIST
  getDashboardDetails(value: any) {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.getDoctorDashboardDetails(this.perPage, (this.currentPage * this.perPage) - this.perPage, value).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {
          this.dashboardData = [];
          this.progressData = {};
          this.total = res.data.currentListCount;
          this.dashboardData = res.data.dashboardList;
          this.progressData = res.data;

        }
        if (res.status === 'error') {
          this.dashboardData = [];
          this.progressData = {};

        }
      }, error => {
        this.ngxLoader.stopLoader('loader-02');
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // ON PAGE CHANGE EVENTS
  onPageChange(page: number) {
    this.currentPage = page;
    this.getDashboardDetails(this.dashboardTab);
  }

  async updateStatus(status, appointId) {
    try {

      let body = {
        status: status,
        appointId: appointId,
        description: ''
      }

      if (status === "accept" || status === "reallocate") {
        Swal.fire({
          // title: 'Are you sure',
          text: status === 'accept' ? 'Are you sure want to confirm the appointment?' : 'Are you sure want to reschedule the appointment?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proceed'
        }).then((result) => {
          if (result.isConfirmed) {
            this.ngxLoader.startLoader('loader-02');
            this.api.updateAppointmentStatus(body).subscribe((res: any) => {
              this.ngxLoader.stopLoader('loader-02');
              if (res.status === 'success') {
                this.toastr.success(res.message);
                this.getDashboardDetails(this.dashboardTab);
              }
              if (res.status === 'error') {
                this.toastr.error(res.message);
              }
            }, (error: any) => {
              console.log(error);
              this.ngxLoader.stopLoader('loader-02');
            });
          }
        })
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  // INDIVIDUAL APPOINTMENT DETAILS
  individualAppointmentDetails(appointId) {
    try {

      let body = {
        appointId: appointId
      }

      this.ngxLoader.startLoader('loader-02');
      this.api.individualAppointmentDetails(body).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {

          this.individualDetails = res.data;

        }
        if (res.status === 'error') {
          this.toastr.error(res.message);
        }
      }, (error: any) => {
        console.log(error);
        this.ngxLoader.stopLoader('loader-02');
      });

    } catch (error) {
      console.log(error);
    }
  }


  checkTabValue(value) {
    try {
      this.currentPage = 1;
      if (value === 'all') {
        this.dashboardTab = 'all';
        this.getDashboardDetails(value);
      }

      if (value === 'pending') {
        this.dashboardTab = 'pending';
        this.getDashboardDetails(value);
      }

      if (value === 'confirm') {
        this.dashboardTab = 'confirm';
        this.getDashboardDetails(value);
      }

      if (value === 'completed') {
        this.dashboardTab = 'completed';
        this.getDashboardDetails(value);
      }

      if (value === 'reschedule') {
        this.dashboardTab = 'reschedule';
        this.getDashboardDetails(value);
      }
    } catch (error) {
      console.error(error);
    }
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.updateDrug.push(event.target.files[0])
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  completeRequest(appointId) {
    try {

      this.completeAppointId = appointId;
      this.completeForm.get('appointId').setValue(appointId);

    } catch (error) {
      console.log(error);
    }
  }

  submitCompleteRequest() {
    try {      
      
      this.ngxLoader.startLoader('loader-02');
      this.api.updateAppointmentStatus(this.completeForm.value).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');

        if (res.status === 'success') {

          this.updateDrug.length === 0 ? this.toastr.success(res.message) : '';
          this.updateDrug.length === 0 ? (document.getElementById('closeApp') as HTMLInputElement).click() : '';
          this.updateDrug.length === 0 ? this.getDashboardDetails(this.dashboardTab) : '';
          this.updateDrug.length === 0 ? this.ngxLoader.stopLoader('loader-02') : '';

          if(this.updateDrug.length > 0) {

            let formData = new FormData();

            for (let file of this.updateDrug) {
              formData.append('drug', file);
            }

            this.api.updatePrescription(formData, this.completeAppointId).subscribe((resolve) => {

              if (resolve.status === 'success') {

                (document.getElementById('closeApp') as HTMLInputElement).click()
                this.toastr.success(res.message);
                this.getDashboardDetails(this.dashboardTab);
                this.ngxLoader.stopLoader('loader-02');
        
              }
        
              if (resolve.status === 'error') {
        
                this.toastr.error(resolve.message);
                this.ngxLoader.stopLoader('loader-02');
        
              }
  
            },(err) => {
              this.ngxLoader.stopLoader('loader-02');
            });

          }

        }
        if (res.status === 'error') {
          this.toastr.error(res.message);
        }
      }, (error: any) => {
        console.log(error);
        this.ngxLoader.stopLoader('loader-02');
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  removePhoto(id) {
    try {
      this.urls.splice(Number(id), 1);
      this.updateDrug.splice(Number(id), 1);
    } catch (error) {
      console.log(error.message);
    }
  }

  // FOR SUBMIT COMPLETE FORM
  completeFormValidation() {
    try {
      this.completeForm = this.fb.group({
        status: new FormControl('completed', Validators.required),
        description: new FormControl('', Validators.required),
        suggestion: new FormControl('', Validators.required),
        appointId: new FormControl('', Validators.required)
      });
    } catch (error) {
      console.error(error);
    }
  }

  // FOR LOGIN FORM VALIDATION ERRORS
  get completeValidation() {
    return this.completeForm.controls;
  }


}

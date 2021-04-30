import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from 'src/app/shared/constant';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointmentList = [];
  math = Math;
  currentPage = 1;
  perPage = 10;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  individualDetails: any;
  urls = [];
  updateDrug = [];
  completeAppointId: any;
  isDescription = false;
  completeForm: any;
  total = 0;

  maxDateType: Date;
  maxDate: string;
  startDate = '';
  endDate = '';
  filterStatus: any;

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

      $('.tab-content > div').not(target).hide();

      $(target).fadeIn(600);

    });

    this.getAppointmentList();
    this.completeFormValidation();
    window.scroll({ // <- Scroll window instead of scrollContainer
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  // FOR GET APPOINTMENT LIST
  getAppointmentList() {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.getDoctorAppiontmentlist(
        this.perPage, 
        (this.currentPage * this.perPage) - this.perPage,
        this.filterStatus,
        this.startDate,
        this.endDate
        ).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {
          this.appointmentList = [];
          this.appointmentList = res.data.list;
          this.total = res.data.count;
        }
        if (res.status === 'error') {
          this.appointmentList = [];
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
    this.getAppointmentList();
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
                this.getAppointmentList();
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
          this.updateDrug.length === 0 ? this.getAppointmentList() : '';
          this.updateDrug.length === 0 ? this.ngxLoader.stopLoader('loader-02') : '';

          if (this.updateDrug.length > 0) {

            let formData = new FormData();

            for (let file of this.updateDrug) {
              formData.append('drug', file);
            }

            this.api.updatePrescription(formData, this.completeAppointId).subscribe((resolve) => {

              if (resolve.status === 'success') {

                (document.getElementById('closeApp') as HTMLInputElement).click()
                this.toastr.success(res.message);
                this.getAppointmentList();
                this.ngxLoader.stopLoader('loader-02');

              }

              if (resolve.status === 'error') {

                this.toastr.error(resolve.message);
                this.ngxLoader.stopLoader('loader-02');

              }

            }, (err) => {
              console.log(err.message);
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

  // FOR RANGE DATEPICKER 
  rangeDatesUpdated(dateValues) {
    try {
      if (dateValues === null || dateValues === [null] || dateValues[0] === null || dateValues[1] === null) {
        this.startDate = '';
        this.endDate = '';
      } else {
        
        this.startDate = moment(dateValues[0]).format('YYYY-MM-DD');
        this.endDate = moment(dateValues[1]).format('YYYY-MM-DD');

        this.currentPage = 1;
        this.getAppointmentList();
        
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // For reset filter table data
  async reset() {
    try {
      var cleanIdValues = ['date'];
      (document.getElementById('status') as HTMLInputElement).value = 'all';
      Constants.resetForm(cleanIdValues);
      this.startDate = '';
      this.endDate = '';
      this.currentPage = 1;
      this.filterStatus = 'all'
      this.getAppointmentList();
    } catch (err) {
      console.log(err.message);
    }
  }

  statusChange(value) {
    try {
      this.currentPage = 1;
      this.filterStatus = value;
      this.getAppointmentList();
    } catch (error) {
      console.log(error.message);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {

  doctorId: any;
  weekDays = [];
  availableSlot: {
    weekDays: [],
    availableSlot: []
  };
  previousTimeSlotSelected: any;
  selectedSlotValues: any;
  doctorDetail: any;
  appointId: any;


  constructor(
    public activatedRouter: ActivatedRoute,
    public apiService: WebApiService,
    public router: Router,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {

    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).removeAttribute('style');



    this.doctorId = this.activatedRouter.snapshot.params.providerId;
    this.appointId = this.activatedRouter.snapshot.params.appointId;
    this.availableSlotList();
    this.doctorDetails();
  }

  availableSlotList() {
    try {
      this.ngxLoader.startLoader('loader-01');
      this.apiService.getDoctorAvailableSlot().subscribe((resolve) => {

        if(resolve.status === 'success') {
          this.availableSlot = resolve.data;
          this.ngxLoader.stopLoader('loader-01');
        } else {
          this.ngxLoader.stopLoader('loader-01');
        }

      },
      err => this.ngxLoader.stopLoader('loader-01'))


    } catch (error) {
      console.log(error);
    }
  }

  selectedSlot(timeslot,slotId,slotDate) {
    try {

      if(this.previousTimeSlotSelected) {
        
        (document.getElementById(this.previousTimeSlotSelected) as HTMLInputElement).classList.remove('selected');
        (document.getElementById(slotId) as HTMLInputElement).classList.add('selected');
        this.previousTimeSlotSelected = slotId;

      } else {
        (document.getElementById(slotId) as HTMLInputElement).classList.add('selected');
        this.previousTimeSlotSelected = slotId;
      }

      this.selectedSlotValues = {
        timeslot: timeslot,
        slotDate: slotDate
      }

    } catch (error) {
      console.log(error);
    }
  }

  doctorDetails() {
    try {
      
      this.apiService.getDoctorDetails(this.doctorId).subscribe((resolve) => {

        if(resolve.status === 'success') {

          this.doctorDetail = resolve.data;

        }

      },
      err => console.log(err))

    } catch (error) {
      console.log(error);
    }
  }

  bookingConfirm() {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      this.ngxLoader.startLoader('loader-02');
      this.apiService.rescheduleAppointment({

        doctorId: this.doctorId,
        appointId: this.appointId,
        slotDate: this.selectedSlotValues.slotDate,
        timeslot: this.selectedSlotValues.timeslot

      }).subscribe((resolve) => {
        if(resolve.status === 'success') {
          this.toastr.success(resolve.message)
          this.ngxLoader.stopLoader('loader-02')
          this.router.navigateByUrl('/patient-panel/patient-dashboard')
        }

        if(resolve.status === 'error') {
          this.toastr.error(resolve.message);
          this.ngxLoader.stopLoader('loader-02');
          this.router.navigateByUrl('/patient-panel/patient-dashboard')
        }

      },
      err => this.ngxLoader.stopLoader('loader-02'))

    } catch (error) {
      console.log(error);
    }
  }

}

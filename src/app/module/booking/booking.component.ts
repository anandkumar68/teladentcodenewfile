import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  doctorId: any;
  weekDays = [];
  availableSlot: {
    weekDays: [],
    availableSlot: []
  };
  previousTimeSlotSelected: any;
  selectedSlotValues: any;
  doctorDetail: any;

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
      this.ngxLoader.startLoader('loader-01');
      this.apiService.createOrderId({amount: this.doctorDetail.price, currency: "INR", doctorId: this.doctorId}).subscribe((resolve) => {
        if(resolve.status === 'success') {
          resolve.data.doctorId = this.doctorId;
          resolve.data.slotVlaue = this.selectedSlotValues;
          resolve.data.doctorDetails = this.doctorDetail;

          sessionStorage.setItem('checkout', JSON.stringify(resolve.data));
          this.ngxLoader.stopLoader('loader-01')
          this.router.navigateByUrl('/checkout');
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

}

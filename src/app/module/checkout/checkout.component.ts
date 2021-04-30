import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  allowForPay: any;
  sessionValue: any;
  isEmailExist = false;
  emailErrorMsg= '';
  paidAmt = 0;
  buttonValue = 'Confirm and Pay';
  isServiceSelected = false;
  serviceErrMsg = "Please Select Service Type"

  options = {};


  constructor(
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

    if(sessionStorage.getItem('checkout') !== null) {

      this.sessionValue = JSON.parse(sessionStorage.getItem('checkout'));
      this.allowForPay = true;
      this.sessionValue.email === null ? this.isEmailExist = false :  this.isEmailExist = true;
      this.paidAmt = this.sessionValue.amount / 100;
      this.paidAmt === 0 ? this.buttonValue = 'Confirm Appointment':'';

    } else {
      this.allowForPay = undefined;
    }

  }

  payViaRazor() {
    try {

    if(this.paidAmt > 0) {
      
      this.options = {
        "key": "rzp_test_A6SWGpN4db7LYP", // Enter the Key ID generated from the Dashboard
        "amount": `${this.sessionValue.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Tela Dent",
        "description": "Dentistry Anytime Anywhere",
        "image": "assets/img/tela-square-logo.jpg",
        "order_id": `${this.sessionValue.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "theme": {
          "color": "#3399cc"
        },
        "handler": function (response){
          this.handle_response(response); //does not work as cannot identify 'this'
      }.bind(this)
      }
      var rzp1 = new Razorpay(this.options);

      rzp1.on('payment.failed', function (response){

        this.toastr.error(response.error.code);
        this.toastr.error(response.error.description);
        this.toastr.error(response.error.source);
        this.toastr.error(response.error.step);
        this.toastr.error(response.error.reason);
        this.toastr.error(response.error.metadata.order_id);
        this.toastr.error(response.error.metadata.payment_id);
    });

    rzp1.open();

    } else {

      this.handle_response({
        razorpay_order_id: '',
        razorpay_payment_id: '',
        razorpay_signature: ''
      })

    }
    } catch (error) {
      console.log(error);
    }
  }

  emailVerification(value) {
    try {
      
      let emailValue = (document.getElementById(value) as HTMLInputElement).value;

      if(emailValue.length === 0) {
        this.emailErrorMsg = '';
      } else {

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailValue.match(mailformat))
        {
          this.emailErrorMsg = "Invalid Email Address";
          this.isEmailExist = false
        } else {
          this.sessionValue.email = emailValue;
          this.isEmailExist = true;
          this.emailErrorMsg = '';
      }

      }

      emailValue.length === 0 ? this.emailErrorMsg = '': '';
      

    } catch (error) {
      console.log(error);
    }
  }

  handle_response(res: any){
   this.ngxLoader.startLoader('loader-01')
    this.apiService.verfiyPaymentSignature({
      razorOrderId: res.razorpay_order_id,
      razorPayId: res.razorpay_payment_id,
      razorSignature: res.razorpay_signature,
      sessionValue: this.sessionValue
    }).subscribe((resolve) => {

      console.log(resolve);

      if(resolve.status ==='success') {
        this.router.navigateByUrl('/booking-confirm')
        this.ngxLoader.stopLoader('loader-01');
      }

      if(resolve.status === 'error') {
        this.toastr.error(resolve.message);
        this.ngxLoader.stopLoader('loader-01');
      }

    },
    err => this.ngxLoader.stopLoader('loader-01'))
  }

  selectService(serviceType) {
    this.sessionValue.serviceType = serviceType;
    this.isServiceSelected = true;
    this.serviceErrMsg = "";
  }

}

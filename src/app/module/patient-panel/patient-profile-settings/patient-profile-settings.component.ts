import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from 'src/app/shared/constant';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { parsePhoneNumberFromString } from 'libphonenumber-js';


@Component({
  selector: 'app-patient-profile-settings',
  templateUrl: './patient-profile-settings.component.html',
  styleUrls: ['./patient-profile-settings.component.css']
})
export class PatientProfileSettingsComponent implements OnInit {


  profileForm: FormGroup | any;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;

  submitted = false;
  imageUrl: any



  constructor(
    private fb: FormBuilder,
    public datePipe: DatePipe,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
    public api: WebApiService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.setCountry = CountryISO.India;
    this.formValidation();
    this.getUserDetails();
  }


  // FOR FORM VALIDATION
  formValidation() {
    try {
      this.profileForm = this.fb.group({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        dob: new FormControl(''),
        email: new FormControl('', Validators.compose([
          Validators.pattern(Constants.EMAIL_PATTERN)
        ])),
        phone: new FormControl({
          value: undefined,
          disabled: true
        }),
        addressLine1: new FormControl(''),
        addressLine2: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipcode: new FormControl('', Validators.compose([
          Validators.pattern(Constants.ZIPCODE_PATTERN)
        ])),
        country: new FormControl(''),
        gender:new FormControl('')
      })
    } catch (error) {
      console.error(error);
    }
  }


  // GET PROFILE FORM USER DETAILS
  getUserDetails() {
    try {

      this.ngxLoader.startLoader('loader-02');
      this.api.individualPatientDetails().subscribe((res: any) => {
        this.imageUrl = res.data.imageUrl
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {
          this.profileForm.get('firstName')?.setValue(res.data?.firstName);
          this.profileForm.get('lastName')?.setValue(res.data?.lastName);
          this.profileForm.get('dob')?.setValue(new Date(res.data?.dob));
          this.profileForm.get('email')?.setValue(res.data?.email);
          this.profileForm.get('addressLine1')?.setValue(res.data?.addressLine1);
          this.profileForm.get('addressLine2')?.setValue(res.data?.addressLine2);
          this.profileForm.get('city')?.setValue(res.data?.city);
          this.profileForm.get('state')?.setValue(res.data?.state);
          this.profileForm.get('country')?.setValue(res.data?.country);
          this.profileForm.get('zipcode')?.setValue(res.data?.zipcode);
          this.profileForm.get('gender')?.setValue(res.data?.gender);


          // FOR SET COUNTRY DIAL CODE
          let phoneNumber = parsePhoneNumberFromString(`+${res.data.countryCode + '' + res.data.phone}`);
          if (phoneNumber) {
            if (phoneNumber.isValid()) {
              this.setCountry = phoneNumber.country;
              this.profileForm.controls.phone.setValue(phoneNumber.nationalNumber);
              return null;
            } else {
              this.setCountry = CountryISO.India;
              this.profileForm.controls.phone.setValue('');
              return {
                phoneNumber: {
                  valid: false
                }
              }
            }
          } else {
            this.setCountry = CountryISO.India;
            this.profileForm.controls.phone.setValue('');
            return {
              phoneNumber: {
                valid: false
              }
            }
          }
        }
        if (res.status === 'error') {
          this.toastr.error(res.error, res.message);
        }

      }, (error: any) => {
        this.ngxLoader.stopLoader('loader-02');
        console.log(error);
      });
    } catch (error) {
      this.ngxLoader.stopLoader('loader-02');
      console.error(error);
    }
  }



  // FOR GET VALIDATION ERRORS
  get validation() {
    return this.profileForm.controls;
  }


  submitForm(): any {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      this.submitted = true;
      if (this.profileForm.invalid) {
        return;
      }
      if (this.profileForm.valid) {
        this.ngxLoader.startLoader('loader-02');
          this.api.updateUserProfileDetails(this.profileForm.value).subscribe((res: any) => {
            this.ngxLoader.stopLoader('loader-02');
            if (res.status === 'success') {
              this.toastr.success(res.message);
              window.location.reload()
            }
            if (res.status === 'error') {
              this.toastr.error(res.message);
            }
          }, (error: any) => {
            console.log(error);
            this.ngxLoader.stopLoader('loader-02');
          });
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR GET DATE VALUE
  onDateSelect(event: any) {
    try {
      if (event == 'Invalid Date') {
        this.profileForm.get('dob')?.setErrors({ invalidDate: true });
      } else {
        this.profileForm.get('dob')?.updateValueAndValidity();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // on image select
  onSelectFile(event) {
    try {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        if (event.target.files[0].size > 2000000) {
          this.toastr.error('File Size Exceeded');
        } else {
          if (event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event: any) => { // called once readAsDataURL is completed
              this.imageUrl = event.target.result;
            }
            let imgBlob = event.target.files[0];
            let formData = new FormData();
            formData.append('profilePic', imgBlob);
            this.ngxLoader.startLoader('loader-02');
            this.api.updateAvatar(formData).subscribe(response => {
              this.ngxLoader.stopLoader('loader-02');
              this.toastr.success(response.message);
              window.location.reload();
            }, error => {
              this.toastr.error(error.message);
              this.ngxLoader.stopLoader('loader-02');
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from 'src/app/shared/constant';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { parsePhoneNumberFromString } from 'libphonenumber-js';


@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {

  addDoctorForm: FormGroup | any;
  submitted = false;

  showPrice = false;
  services = [];
  specialization = [];
  dentistType = [];

  showServiceError!: boolean;
  showSpecializationError!: boolean;
  showDentistTypeError!: boolean;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;


  profileDetails: any;
  imageUrl: any;



  constructor(
    private fb: FormBuilder,
    public datePipe: DatePipe,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
    public api: WebApiService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.formValidation();
    this.getProfileDetails();

  }


  // FOR GET DOCTOR PROFILE DETAILS
  getProfileDetails() {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.getDoctorProfileDetails().subscribe((res: any) => {

        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {
          this.profileDetails = {};
          if (res.data.length > 0) {
            this.profileDetails = res.data[0];
            this.imageUrl = this.profileDetails.imageUrl;
            this.services = this.profileDetails.services;
            this.specialization = this.profileDetails.specialization;
            this.dentistType = this.profileDetails.dentistType;
            this.addDoctorForm.get('firstName')?.setValue(this.profileDetails.firstName);
            this.addDoctorForm.get('lastName')?.setValue(this.profileDetails.lastName);
            this.addDoctorForm.get('gender')?.setValue(this.profileDetails.gender);
            this.addDoctorForm.get('dob')?.setValue(new Date(this.profileDetails.dob));
            this.addDoctorForm.get('biography')?.setValue(this.profileDetails.bio);
            this.addDoctorForm.get('addressLine1')?.setValue(this.profileDetails.addressLine1);
            this.addDoctorForm.get('addressLine2')?.setValue(this.profileDetails.addressLine2);
            this.addDoctorForm.get('city')?.setValue(this.profileDetails.city);
            this.addDoctorForm.get('country')?.setValue(this.profileDetails.country);
            this.addDoctorForm.get('state')?.setValue(this.profileDetails.state);
            this.addDoctorForm.get('zipcode')?.setValue(this.profileDetails.zipcode);
            this.addDoctorForm.get('pricingType')?.setValue(this.profileDetails.pricingType);
            this.addDoctorForm.get('pricingType')?.setValue(this.profileDetails.pricingType);
            this.showPrice = this.profileDetails.pricingType === 'Custom Price' ? true : false;
            this.addDoctorForm.get('priceCharges')?.setValue(this.profileDetails.priceCharges);

              
            if (this.profileDetails?.education.length > 0) {
              for (let i = 0; i < this.profileDetails?.education.length; i++) {
                (this.addDoctorForm.get('education') as FormArray).push(this.fb.group({
                  degree: new FormControl(this.profileDetails.education[i].degree),
                  collegName: new FormControl(this.profileDetails.education[i].collegName),
                  fromYear: new FormControl(this.profileDetails.education[i].fromYear, Validators.pattern(Constants.YEAR_PATTERN)),
                  completionYear: new FormControl(this.profileDetails.education[i].completionYear, Validators.pattern(Constants.YEAR_PATTERN))
                }));
              }
            } else {
              this.addNewGroup('education');
            }


            if (this.profileDetails?.experience.length > 0) {
              for (let i = 0; i < this.profileDetails?.experience.length; i++) {
                (this.addDoctorForm.get('experience') as FormArray).push(this.fb.group({
                  hospitalName: new FormControl(this.profileDetails.experience[i].hospitalName),
                  from: new FormControl(this.profileDetails.experience[i].from, Validators.pattern(Constants.YEAR_PATTERN)),
                  to: new FormControl(this.profileDetails.experience[i].to, Validators.pattern(Constants.YEAR_PATTERN))
                }));
              }
            } else {
              this.addNewGroup('experience');
            }



            if (this.profileDetails?.awards.length > 0) {
              for (let i = 0; i < this.profileDetails?.awards.length; i++) {
                (this.addDoctorForm.get('awards') as FormArray).push(this.fb.group({
                  name: new FormControl(this.profileDetails.awards[i].name),
                  year: new FormControl(this.profileDetails.awards[i].year, Validators.pattern(Constants.YEAR_PATTERN)),
                }));
              }
            } else {
              this.addNewGroup('awards');
            }
            if (this.profileDetails?.registrations.length > 0) {
              for (let i = 0; i < this.profileDetails?.registrations.length; i++) {
                (this.addDoctorForm.get('registrations') as FormArray).push(this.fb.group({
                  name: new FormControl(this.profileDetails.registrations[i].name),
                  year: new FormControl(this.profileDetails.registrations[i].year, Validators.pattern(Constants.YEAR_PATTERN)),
                }));
              }
            } else {
              this.addNewGroup('registrations');
            }

            if (this.profileDetails?.membership.length > 0) {
              for (let i = 0; i < this.profileDetails?.membership.length; i++) {
                (this.addDoctorForm.get('membership') as FormArray).push(this.fb.control(''));
              }
            } else {
              this.addNewGroup('membership');
            }




            // FOR SET COUNTRY DIAL CODE
            let phoneNumber = parsePhoneNumberFromString(`+${this.profileDetails.countryCode + '' + this.profileDetails.phone}`);
            if (phoneNumber) {
              if (phoneNumber.isValid()) {
                this.setCountry = phoneNumber.country;
                this.addDoctorForm.controls.phone.setValue(phoneNumber.nationalNumber);
                return null;
              } else {
                this.setCountry = CountryISO.India;
                this.addDoctorForm.controls.phone.setValue('');
                return {
                  phoneNumber: {
                    valid: false
                  }
                }
              }
            } else {
              this.setCountry = CountryISO.India;
              this.addDoctorForm.controls.phone.setValue('');
              return {
                phoneNumber: {
                  valid: false
                }
              }
            }

          }
        }
        if (res.status === 'error') {
          this.profileDetails = {};
        }
      }, error => {
        this.ngxLoader.stopLoader('loader-02');
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // FOR FORM VALIDATION
  formValidation() {
    try {
      this.setCountry = CountryISO.India;
      this.addDoctorForm = this.fb.group({
        services: new FormControl(''),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        gender: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(Constants.ZIPCODE_PATTERN)
        ])),
        addressLine1: new FormControl('', Validators.required),
        addressLine2: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        biography: new FormControl('', Validators.required),
        pricingType: new FormControl('Free', Validators.required),
        priceCharges: new FormControl('0', Validators.required),

        education: this.fb.array([]),
        experience: this.fb.array([]),
        awards: this.fb.array([]),
        registrations: this.fb.array([]),
        membership: this.fb.array([])
      });
    } catch (error) {
      console.error(error);
    }
  }

  // FOR GET VALIDATION ERRORS
  get validation() {
    return this.addDoctorForm.controls;
  }

  // FOR ADD DYNAMIC INPUT
  addNewGroup(formValue: any) {
    const add = this.addDoctorForm.get(formValue) as FormArray;
    if (formValue === 'education') {
      add.push(this.fb.group({
        degree: new FormControl(''),
        collegName: new FormControl(''),
        fromYear: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
        completionYear: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN))
      }))
    }

    if (formValue === 'experience') {
      add.push(this.fb.group({
        hospitalName: new FormControl(''),
        from: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
        to: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN))
      }))
    }

    if (formValue === 'awards') {
      add.push(this.fb.group({
        name: new FormControl(''),
        year: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
      }))
    }

    if (formValue === 'registrations') {
      add.push(this.fb.group({
        name: new FormControl(''),
        year: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
      }))
    }

    if (formValue === 'membership') {
      add.push(this.fb.control(''))
    }
  }


  // FOR GET MEMBERSHIP INPUT VALUE IN ARRAY
  get membership(): FormArray | any {
    try {
      return this.addDoctorForm.get('membership') as FormArray;
    } catch (error) {
      console.log(error.message);
    }

  }

  // FOR DELETE GROUP DYNAMICALLY
  deleteAddressGroup(index: number, formValue: any) {
    const add = this.addDoctorForm.get(formValue) as FormArray;
    add.removeAt(index)
  }


  submitForm(): any {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      this.submitted = true;
      this.checkInput();
      if (this.addDoctorForm.invalid) {
        return;
      }
      if (this.addDoctorForm.valid) {
        if (this.showSpecializationError === false && this.showServiceError === false && this.showDentistTypeError === false) {

          let servicesData = [];
          for (let data of this.services) {
            data.value ? servicesData.push(data['value']) :
            servicesData.push(data);
          }


          let specializationData = [];
          for (let data of this.specialization) {
            data.value ? specializationData.push(data['value']) :
            specializationData.push(data);
          }


          let dentistTypeData = [];
          for (let data of this.dentistType) {
            data.value ? dentistTypeData.push(data['value']) :
            dentistTypeData.push(data);
          }
          
          let data = {
            "firstName": this.addDoctorForm.get('firstName')?.value.trim(),
            "lastName": this.addDoctorForm.get('lastName')?.value.trim(),
            "phone": this.addDoctorForm.get('phone')?.value.e164Number.replace(this.addDoctorForm.get('phone').value.dialCode, ''),
            "dob": this.datePipe.transform(this.addDoctorForm.get('dob')?.value, 'yyyy-MM-dd'),
            "gender": this.addDoctorForm.get('gender')?.value.trim(),
            "zipcode": this.addDoctorForm.get('zipcode')?.value.trim(),
            "addressLine1": this.addDoctorForm.get('addressLine1')?.value.trim(),
            "addressLine2": this.addDoctorForm.get('addressLine2')?.value.trim(),
            "city": this.addDoctorForm.get('city')?.value.trim(),
            "state": this.addDoctorForm.get('state')?.value.trim(),
            "country": this.addDoctorForm.get('country')?.value.trim(),
            "countryCode": this.addDoctorForm.get('phone')?.value.dialCode.substr(1),
            "biography": this.addDoctorForm.get('biography')?.value.trim(),
            "pricingType": this.addDoctorForm.get('pricingType')?.value,
            "priceCharges": this.addDoctorForm.get('priceCharges')?.value,
            "services": servicesData,
            "specialization": specializationData,
            "dentistType": dentistTypeData,
            "membership": this.addDoctorForm.get('membership')?.value,
            "education": this.addDoctorForm.get('education')?.value,
            "experience": this.addDoctorForm.get('experience')?.value,
            "awards": this.addDoctorForm.get('awards')?.value,
            "registrations": this.addDoctorForm.get('registrations')?.value,
          }

          this.ngxLoader.startLoader('loader-02');
          this.api.updateDoctorProfile(data).subscribe((res: any) => {
            this.ngxLoader.stopLoader('loader-02');
            if (res.status === 'success') {
              this.toastr.success(res.message);
            }
            if (res.status === 'error') {
              this.toastr.error(res.message);
            }
          }, (error: any) => {
            console.log(error);
            this.ngxLoader.stopLoader('loader-02');
          });

        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR GET DATE VALUE
  onDateSelect(event: any) {
    try {
      if (event == 'Invalid Date') {
        this.addDoctorForm.get('dob')?.setErrors({ invalidDate: true });
      } else {
        this.addDoctorForm.get('dob')?.updateValueAndValidity();
      }
    } catch (error) {
      console.error(error);
    }
  }


  // ON RADIO BUTTON SELECT
  handleChange(event: any) {
    try {
      let type = event.target.value;
      if (type === 'Custom Price') {
        this.addDoctorForm.get('priceCharges')?.setValue('')
        this.showPrice = true;
      }

      if (type === 'Free') {
        this.addDoctorForm.get('priceCharges')?.setValue('0')
        this.showPrice = false;

      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR CHECK NGX CHIPS INPUT
  checkInput() {
    try {
      if (this.services.length === 0) {
        this.showServiceError = true;
      } else {
        this.showServiceError = false;
      }

      if (this.specialization.length === 0) {
        this.showSpecializationError = true;
      } else {
        this.showSpecializationError = false;
      }

      if (this.dentistType.length === 0) {
        this.showDentistTypeError = true;
      } else {
        this.showDentistTypeError = false;
      }

    } catch (error) {
      console.error(error);
    }
  }

  // AFTER CHIPS REMOVED
  onRemoveChips(tag: any, attrTyp: any) {

    attrTyp === 'service' ?
      this.services.length === 0 ?
        this.showServiceError = true : this.showServiceError = false :
      attrTyp === 'special' ?
        this.specialization.length === 0 ?
          this.showSpecializationError = true : this.showSpecializationError = false :
        attrTyp === 'dentist' ?
          this.dentistType.length === 0 ?
            this.showDentistTypeError = true : this.showDentistTypeError = false : '';
  }

  // AFTER CHIPS ADDED
  onAddChips(tag: any, attrTyp: any) {

    attrTyp === 'service' ?
      this.showServiceError = false :
      attrTyp === 'special' ?
        this.showSpecializationError = false :
        attrTyp === 'dentist' ?
          this.showDentistTypeError = false : '';

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
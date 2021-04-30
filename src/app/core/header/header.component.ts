import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CountdownComponent } from 'ngx-countdown';
import {
  CountryISO,
  SearchCountryField,
  TooltipLabel,
} from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { CommonFunctionService } from 'src/app/shared/common-function.service';
import { Constants } from 'src/app/shared/constant';
import { UserApiService } from 'src/app/shared/user-api/user-api.service';
declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('countdown', { static: false })
  private counter: CountdownComponent;


  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;
  otp: string;
  timer = 300;

  userId: any;
  otpType: any;
  showUser = false;
  userDetails: any;

  showHideForm = {
    login: false,
    signup: false,
    otp: false,
    forgotPassword: false,
    setNewPassword: false,
  };

  // LOGIN FORM
  loginForm: FormGroup;
  loginSubmit = false;

  // SIGNUP FORM
  signupForm: FormGroup;
  signupSubmit = false;

  // FORGOT FORM
  forgotForm: FormGroup;
  forgotSubmit = false;

  // SET NEW PASSWORD FORM
  setNewPasswordForm: FormGroup;
  setNewPasswordSubmit = false;

  constructor(
    public fb: FormBuilder,
    private toastr: ToastrService,
    public api: UserApiService,
    public router: Router,
    public commonFunction:CommonFunctionService
  ) { }

  ngOnInit(): void {
    window.onscroll = function () {
      myFunction();
    };

    var header = document.getElementById('mainHeader');
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }

    var tabs = $('.tabs');
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $('.selector').css({
      left: activeItem.position.left + 'px',
      width: activeWidth + 'px',
    });

    $('.tabs').on('click', 'a', function (e) {
      e.preventDefault();
      $('.tabs a').removeClass('active');
      $(this).addClass('active');
      var activeWidth = $(this).innerWidth();
      var itemPos = $(this).position();
      $('.selector').css({
        left: itemPos.left + 'px',
        width: activeWidth + 'px',
      });
    });

    this.setCountry = CountryISO.India;
    this.loginFormValidation();
    this.signupFormValidation();
    this.forgotFormValidation();
    this.setNewPasswordFormValidation();
    let userId = Constants.credentialsDecrypt(localStorage.getItem('userId'));
    this.showUser = !userId ? false : true;
    this.loginUserDetails();


    this.commonFunction.currentMessage.subscribe((message) => {
     if(message === 'loginKey'){
      let userId = Constants.credentialsDecrypt(localStorage.getItem('userId'));
      this.showUser = !userId ? false : true;
      this.loginUserDetails();
     }
    });
  }

  // FOR LOGIN USER DETAILS
  loginUserDetails() {
    try {
      if (this.showUser) {
        this.userDetails = JSON.parse(
          Constants.credentialsDecrypt(localStorage.getItem('user')));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR LOGIN FORM VALIDATION
  loginFormValidation() {
    try {
      this.loginForm = this.fb.group({
        phone: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      });
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SIGNUP FORM VALIDATION
  signupFormValidation() {
    try {
      this.signupForm = this.fb.group(
        {
          phone: new FormControl('', Validators.required),
          name: new FormControl('', Validators.required),
          password: new FormControl(
            '',
            Validators.compose([
              Validators.required,
              Validators.pattern(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
              ),
            ])
          ),
          confirmPassword: new FormControl('', Validators.required),
        },
        {
          validator: Constants.mustMatch('password', 'confirmPassword'),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  // FOR FORGOT-PASSWORD FORM VALIDATION
  forgotFormValidation() {
    try {
      this.forgotForm = this.fb.group({
        phone: new FormControl('', Validators.required),
      });
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SET NEW-PASSWORD FORM VALIDATION
  setNewPasswordFormValidation() {
    try {
      this.setNewPasswordForm = this.fb.group({
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/),
        ])),
        confirmPassword: new FormControl('', Validators.required),
      },
        {
          validator: Constants.mustMatch('password', 'confirmPassword'),
        });
    } catch (error) {
      console.error(error);
    }
  }

  // FOR LOGIN FORM VALIDATION ERRORS
  get loginValidation() {
    return this.loginForm.controls;
  }

  // FOR SIGNUP FORM VALIDATION ERRORS
  get signupValidation() {
    return this.signupForm.controls;
  }

  // FOR FORGOT FORM VALIDATION ERRORS
  get forgotValidation() {
    return this.forgotForm.controls;
  }

  // FOR SET NEW FORM VALIDATION ERRORS
  get setNewPasswordValidation() {
    return this.setNewPasswordForm.controls;
  }

  // FOR SUBMIT LOGIN FORM
  submitLogin() {
    try {
      this.loginSubmit = true;
      if (this.loginForm.invalid) {
        return;
      }
      if (this.loginForm.valid) {
        let data = {
          username: this.loginForm
            .get('phone')
            .value.e164Number.replace(
              this.loginForm.get('phone').value.dialCode,
              ''
            ),
          countryCode: this.loginForm.get('phone')?.value.dialCode.substr(1),
          password: this.loginForm.get('password')?.value.trim(),
        };
        this.api.userLoginApi(data).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.toastr.success(response.message);
              localStorage.setItem('userId', Constants.credentialsEncrypt(response.data.userId));
              localStorage.setItem('user', Constants.credentialsEncrypt(JSON.stringify(response.data)));
              localStorage.setItem('token', Constants.credentialsEncrypt(response.data.token));
              localStorage.setItem('loginAs', Constants.credentialsEncrypt(response.data.userType));
              this.showUser = true;
              this.loginUserDetails();
              (document.getElementById('closeModal') as HTMLElement).click();
            }

            if (response.status === 'error') {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SUBMIT SIGNUP FORM
  submitSignup() {
    try {
      this.signupSubmit = true;
      if (this.signupForm.invalid) {
        return;
      }
      if (this.signupForm.valid) {
        let data = {
          name: this.signupForm.get('name').value.trim(),
          phone: this.signupForm
            .get('phone')
            .value.e164Number.replace(
              this.signupForm.get('phone').value.dialCode,
              ''
            ),
          countryCode: this.signupForm.get('phone').value.dialCode.substr(1),
          password: this.signupForm.get('password').value.trim(),
          passwordConfirmation: this.signupForm
            .get('confirmPassword')
            .value.trim(),
        };
        this.api.userRegisterApi(data).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.userId = response.data._id;
              this.otpType = 'signup';
              this.toastr.success(response.message);
              localStorage.setItem(
                'otpVerify',
                Constants.credentialsEncrypt(JSON.stringify(response.data))
              );
              this.showOtp();
            }

            if (response.status === 'error') {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SUBMIT FORGOT FORM
  submitForgot() {
    try {
      this.forgotSubmit = true;
      if (this.forgotForm.invalid) {
        return;
      }
      if (this.forgotForm.valid) {
        let data = {
          phone: this.forgotForm
            .get('phone')
            .value.e164Number.replace(
              this.forgotForm.get('phone').value.dialCode,
              ''
            ),
          countryCode: this.forgotForm.get('phone').value.dialCode.substr(1),
        };
        this.api.userForgotPasswordApi(data).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.userId = response.data.user_id;
              this.otpType = 'forgot';
              this.toastr.success(response.message);
              localStorage.setItem(
                'otpVerify',
                Constants.credentialsEncrypt(JSON.stringify(response.data))
              );
              this.showOtp();
            }

            if (response.status === 'error') {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  // FOR LOGIN
  login() {
    try {
      this.showHideForm.login = true;
      this.showHideForm.signup = false;
      this.showHideForm.otp = false;
      this.showHideForm.forgotPassword = false;
      this.showHideForm.setNewPassword = false;

      this.loginForm.reset();
      this.loginSubmit = false;
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SIGNUP
  signup() {
    try {
      this.showHideForm.login = false;
      this.showHideForm.signup = true;
      this.showHideForm.otp = false;
      this.showHideForm.forgotPassword = false;
      this.showHideForm.setNewPassword = false;

      this.signupForm.reset();
      this.signupSubmit = false;
    } catch (error) {
      console.error(error);
    }
  }

  // FOR OTP
  showOtp() {
    try {
      this.showHideForm.login = false;
      this.showHideForm.signup = false;
      this.showHideForm.otp = true;
      this.showHideForm.forgotPassword = false;
      this.showHideForm.setNewPassword = false;
    } catch (error) {
      console.error(error);
    }
  }

  // FOR FORGOT PASSWORD
  forgotPassword() {
    try {
      this.showHideForm.login = false;
      this.showHideForm.signup = false;
      this.showHideForm.otp = false;
      this.showHideForm.setNewPassword = false;
      this.showHideForm.forgotPassword = true;
      this.forgotForm.reset();
      this.forgotSubmit = false;
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SET NEW PASSWORD
  setNewPassword() {
    try {
      this.showHideForm.login = false;
      this.showHideForm.signup = false;
      this.showHideForm.otp = false;
      this.showHideForm.forgotPassword = false;
      this.showHideForm.setNewPassword = true;
      this.setNewPasswordForm.reset();
      this.setNewPasswordSubmit = false;
    } catch (error) {
      console.error(error);
    }
  }

  // CHECK TIMER EVENT WHEN START OR CLOSE
  handleEvent($event) {
    try {
      if ($event.action === 'done' && $event.text === '00:00') {
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // SUBMIT OTP DETAILS
  submitOtp() {
    try {
      if (this.otp.length > 6) {
        this.toastr.error('Invalid OTP');
      }
      if (this.otp.length === 6) {
        let data = {
          code: this.otp,
          userId: this.userId,
        };
        this.api.verifyLoginCode(data).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.toastr.success(response.message);
              if (this.otpType === 'forgot') {
                this.setNewPassword();
              } else {
                localStorage.setItem('userId', Constants.credentialsEncrypt(response.data.userId));
                localStorage.setItem('user', Constants.credentialsEncrypt(JSON.stringify(response.data)));
                localStorage.setItem('token', Constants.credentialsEncrypt(response.data.token));
                localStorage.setItem('loginAs', Constants.credentialsEncrypt(response.data.userType));
                this.showUser = true;
                this.loginUserDetails();
                (document.getElementById('closeModal') as HTMLElement).click();
              }
            }

            if (response.status === 'error') {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SUBMIT SET NEW PASSWORD VALUES
  submitNewPassword() {
    try {
      this.setNewPasswordSubmit = true;
      if (this.setNewPasswordForm.invalid) {
        return;
      }
      if (this.setNewPasswordForm.valid) {
        let data = {
          token: this.otp,
          password: this.setNewPasswordForm.get('password')?.value,
          passwordConfirmation: this.setNewPasswordForm.get('confirmPassword')?.value,
        }
        this.api.setNewPasswordApi(data).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.toastr.success(response.message);
              this.login();
            }

            if (response.status === 'error') {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR LOGOUT USER
  logout() {
    try {
      localStorage.setItem('userId', null);
      localStorage.setItem('user', null);
      localStorage.setItem('loginAs', null);
      localStorage.setItem('token', null);
      this.showUser = false;
      this.router.navigateByUrl('/index')
    } catch (error) {
      console.error(error);
    }
  }

  // NAVIGATION HEADER
  navigateHeader(navigate) {
    try {

      this.router.navigateByUrl(navigate);

    } catch (error) {
      console.log(error);
    }
  }

  headerRouter(linkType) {
    try {

          const helper = new JwtHelperService();
          const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));
          
          if(isExpired) {
  
            if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();
              setTimeout(() => {
                (document.getElementById('loginCall') as HTMLInputElement).click();
              }, 200);
  
            } else {
  
              (document.getElementById('loginCall') as HTMLInputElement).click();
  
            }
            
          } else {

            if(Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'user') {
              linkType === 'dashboard' ?
              this.router.navigateByUrl('/patient-panel/patient-dashboard') : 
              this.router.navigateByUrl('/patient-panel/patient-profile-setting');
            }

            if(Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'onlineDoctors') {
              linkType === 'dashboard' ?
              this.router.navigateByUrl('/doctor-dashboard') : 
              this.router.navigateByUrl('/doctors-panel/doctor-profile-setting');
            }

          }
      
    } catch (error) {
      console.log(error.message);
    }
  }
}

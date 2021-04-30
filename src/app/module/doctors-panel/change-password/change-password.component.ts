import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from 'src/app/shared/constant';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  setPassForm: FormGroup | any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
    public api: WebApiService,
  ) { }

  ngOnInit(): void {

    this.formValidation();

  }

  formValidation() {
    try {

      this.setPassForm = this.fb.group({
        oldPassword : new FormControl('', Validators.required),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
            )
          ])
        ),
        passwordConfirmation: new FormControl('', Validators.required),
      },
      {
        validator: Constants.mustMatch('password', 'passwordConfirmation'),
      }
      );

    } catch (error) {
      console.error(error);
    }
  }

  // FOR GET VALIDATION ERRORS
  get validation() {
    return this.setPassForm.controls;
  }

  submitForm() {
    try {
      
      this.submitted = true;      

      if(this.setPassForm.valid) {

        this.ngxLoader.startLoader('loader-02');
        this.api.setDoctorDashboardPassword(this.setPassForm.value).subscribe((resolve) => {
          this.ngxLoader.stopLoader('loader-02');

          if(resolve.status === 'success') {
            this.toastr.success(resolve.message);
          }

          if(resolve.status === 'error') {
            this.toastr.error(resolve.message);
          }

        },(error: any) => {
          console.log(error);
          this.ngxLoader.stopLoader('loader-02');
        })

      }

    } catch (error) {
      console.log(error.message);
    }
  }

}

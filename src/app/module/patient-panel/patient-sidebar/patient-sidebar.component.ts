import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constant';
import * as moment from 'moment';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.css']
})
export class PatientSidebarComponent implements OnInit {
  userDetails: any
  age: any;
  city: any;
  state: any;
  constructor(
    public api: WebApiService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // this.
    this.api.individualPatientDetails().subscribe((resolve) => {

      if(resolve.status === 'success') {
        this.userDetails = resolve.data;

        if(this.userDetails.dob) {

          this.age = `${moment(new Date()).diff(this.userDetails.dob, 'years')}`;
    
        }
    
        if(this.userDetails.city && this.userDetails.state) {
          this.state = this.userDetails.state;
          this.city = this.userDetails.city;
        }

      }

      if(resolve.status === 'error') {
        this.toastr.error(resolve.message)
      }

    })

  }

}

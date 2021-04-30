import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constant';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.css']
})
export class DoctorSidebarComponent implements OnInit {
  userDetails: any;

  constructor(
    public api: WebApiService
  ) { }

  ngOnInit(): void {

    this.api.getDoctorSideBarDetails().subscribe((resolve) => {
      this.userDetails = resolve.data;
    })

  }

}

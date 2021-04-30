import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.css']
})
export class PatientPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // var element = (document.getElementById('show-nav') as HTMLInputElement);
    // element.parentNode.removeChild(element);
  }

}

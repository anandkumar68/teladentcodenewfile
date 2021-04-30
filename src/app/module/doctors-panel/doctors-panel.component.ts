import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors-panel',
  templateUrl: './doctors-panel.component.html',
  styleUrls: ['./doctors-panel.component.css']
})
export class DoctorsPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // var element = (document.getElementById('show-nav') as HTMLInputElement);
    // element.parentNode.removeChild(element);

    // (document.getElementById('show-nav-btn') as HTMLInputElement).style.display = 'none';
  }

}

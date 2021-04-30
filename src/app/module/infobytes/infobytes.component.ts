import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infobytes',
  templateUrl: './infobytes.component.html',
  styleUrls: ['./infobytes.component.css']
})
export class InfobytesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.add('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).setAttribute('style', "left: 195.469px; width: 102.453px;");

  }

}

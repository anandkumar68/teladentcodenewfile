import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  snapshot: any;
  show404: boolean;
  show500: boolean;
  showOther: boolean;
  constructor(
    private location: Location,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    var pageX = $(document).width();
    var pageY = $(document).height();
    var mouseY = 0;
    var mouseX = 0;

    $(document).mousemove(function (event) {
      //verticalAxis
      mouseY = event.pageY;
      const yAxis = (pageY / 2 - mouseY) / pageY * 300;
      //horizontalAxis
      mouseX = event.pageX / -pageX;
      const xAxis = -mouseX * 100 - 100;

      $('.box__ghost-eyes').css({ 'transform': 'translate(' + xAxis + '%,-' + yAxis + '%)' });

      //console.log('X: ' + xAxis);

    });

    this.snapshot = this.router.snapshot.paramMap.get('status');
    this.pageLayout();
  }

  // go on the previous location
  goBack() {
    try {
      this.location.back();
    } catch (error) {
      console.log(error.message);
    }
  }

  // for set page component according to error
  pageLayout() {
    try {
      if (this.snapshot === '404') {
        this.show404 = true;
        this.show500 = false;
        this.showOther = false;

      } else if (this.snapshot === '500') {
        this.show404 = false;
        this.show500 = true;
        this.showOther = false;

      } else {
        this.show404 = false;
        this.show500 = false;
        this.showOther = true;

      }
    } catch (error) {
      console.log(error.message);
    }
  }

}

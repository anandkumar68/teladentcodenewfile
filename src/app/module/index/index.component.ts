import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  webBlogDetails = [];

  constructor(
    private apiService: WebApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    (document.getElementById('home') as HTMLAnchorElement).classList.add('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).setAttribute('style', "left: 0px; width: 78.7812px;");
    this.blogDetails();
  }

  blogDetails() {
    try {
      
      this.apiService.blogDetailsWeb(0,4).subscribe((resolve: any) => {

        if(resolve.status === 'success') {

          this.webBlogDetails = resolve.data.list;

        }

      })

    } catch (error) {
      console.log(error.message);
    }
  }

  blogRouting(blogId: any) {
    this.router.navigateByUrl(`/blog/${blogId}`)
  }

  viewBlogRoute() {
    this.router.navigateByUrl(`/blog`)
  }

}

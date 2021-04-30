import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from 'src/app/shared/constant';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogId: string;
  blogDetails: any;
  currentPage = 1;
  perPage = 1;
  total = 0;
  allBlogDetails: any[] = [];
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  math = Math;

  constructor(
    private activateRoute: ActivatedRoute,
    private api: WebApiService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService
  ) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('webmenu') as HTMLAnchorElement).removeAttribute('style');
    this.blogId = this.activateRoute.snapshot.paramMap.get('blogId'); 
  }

  ngOnInit(): void {
    this.blogId !== null ? this.blogIndividualList() : this.listBlogDetails(); 
  }

  blogIndividualList() {
    try {
      this.ngxLoader.startLoader('loader-01');
      this.api.blogIndividualList(this.blogId).subscribe((resolve: any) => {

        if(resolve.status === 'success') {
          this.blogDetails = resolve.data;

          let blogDesc = this.blogDetails.blogDescription.split('\n');
          this.blogDetails.blogDesc = blogDesc.filter((blog: any) => {
            return blog.length > 0;
          })

          for(let sub of this.blogDetails.subTitle) {

            if(sub.description.length > 0) {
              let subDesc = sub.description.split('\n');
              sub.subDescArray = subDesc.filter((subDesc: any) => {
                return subDesc.length > 0;
              })
            }

          }

          this.ngxLoader.stopLoader('loader-01');
        }

        if(resolve.status === 'error') {
          this.toastr.error(resolve.message);
          this.ngxLoader.stopLoader('loader-01');
        }

      },(error: any) => {
        this.ngxLoader.stopLoader('loader-01');
        Constants.handleError(error);
      })

    } catch (error) {
      this.ngxLoader.stopLoader('loader-01');
      console.log(error.message);
    }
  }

  listBlogDetails() {
    this.ngxLoader.startLoader('loader-01');
    try {
      this.api.blogDetailsWeb( ((this.perPage * this.currentPage) - this.perPage), this.perPage).subscribe((resolve: any) => {

        if(resolve.status === 'success') {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          this.allBlogDetails = [];
          let blogDetails = resolve.data.list[0];

          let blogDesc = blogDetails.blogDescription.split('\n');
          blogDetails.blogDesc = blogDesc.filter((blog: any) => {
            return blog.length > 0;
          })

          for(let sub of blogDetails.subTitle) {

            if(sub.description.length > 0) {
              let subDesc = sub.description.split('\n');
              sub.subDescArray = subDesc.filter((subDesc: any) => {
                return subDesc.length > 0;
              })
            }

          }
          this.total = resolve.data.count;
          this.allBlogDetails.push(blogDetails);
          this.ngxLoader.stopLoader('loader-01');
        }

        if(resolve.status === 'error') {
          this.ngxLoader.stopLoader('loader-01');
          this.toastr.error(resolve.message);
        }

      },(error: any) => {
        this.ngxLoader.stopLoader('loader-01');
        Constants.handleError(error);
      })
    } catch (error) {
      this.ngxLoader.stopLoader('loader-01');
      console.log(error);
    }

  }

  // ON PAGE CHANGE EVENTS
  onPageChange(page: number) {
    this.currentPage = page;
    this.listBlogDetails();
 }

}

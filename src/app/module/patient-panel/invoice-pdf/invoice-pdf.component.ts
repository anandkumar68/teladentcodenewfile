import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.css']
})
export class InvoicePdfComponent implements OnInit {
  invoicePdfDetails : any;
  bankDetails : any;
  pdfId: any;

  constructor(
    public api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
    public activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.pdfId = this.activatedRouter.snapshot.params.pdfId;
    this.loadPdfDetails();

  }

  public openPDF():void {
    let DATA = document.getElementById('htmlData');
  
    console.log(DATA);
        
    html2canvas(DATA).then( async canvas => {
        
        let fileWidth = 250;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        // let fileHeight = 200;
        
        const FILEURI = canvas.toDataURL('image/jpeg')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('angular-demo.pdf');
    });     
  }

  loadPdfDetails () {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.pdfInvoiceDetails(this.pdfId).subscribe((resolve) => {
        
        if(resolve.status === 'success') {

          this.invoicePdfDetails = resolve.data.list;
          this.bankDetails = resolve.data.bankDetails          
          this.ngxLoader.stopLoader('loader-02');

        }

        if(resolve.status === 'error') {
          
          this.ngxLoader.stopLoader('loader-02');

        }

      }, (error) => {
          this.ngxLoader.stopLoader('loader-02');
          console.log(error.message);
      })

    } catch (error) {
      this.ngxLoader.stopLoader('loader-02');
      console.log(error);
    }
  }

}

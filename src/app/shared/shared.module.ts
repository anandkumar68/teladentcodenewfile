import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModalService } from './components/login-modal/login-modal.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CountdownModule,
  ],
  exports:[LoginModalComponent],
  providers:[BsModalService, LoginModalService]
})
export class SharedModule { }

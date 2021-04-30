import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginModal } from './login-modal';

declare let $: any;

@Injectable()
export class LoginModalService {

    modalData = new Subject<LoginModal>();

    modalDataEvent = this.modalData.asObservable();

    open(modalData: any) {
        this.modalData.next(modalData);
    }

}
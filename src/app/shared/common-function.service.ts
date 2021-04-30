import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class CommonFunctionService {

    constructor(
    ) {

    }
    private messageSource = new BehaviorSubject(undefined);
    currentMessage = this.messageSource.asObservable();

    changeMessage(message: string) {
        this.messageSource.next(message);
    }
}

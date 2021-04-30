import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  BASE_URL = environment.apiBaseUrl;
 
  constructor(public http: HttpClient) {}

  // SUBMIT USER REGISTER API
  userRegisterApi(data): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/signup`;
      return this.http.post(apiUrl, data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // VERIFY OTP WHEN USER SIGNUP
  verifyLoginCode(data): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/verify-phone`;
      return this.http.post(apiUrl, data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // SUBMIT USER LOGIN API
  userLoginApi(data): Observable<any> {
    try {
      const apiUrl=`${this.BASE_URL}/user/login`;
      return this.http.post(apiUrl, data);
    } catch (error) {
      console.log(error.message);
    }
  }


  // SUBMIT USER FORGOT PASSWORD FORM API
  userForgotPasswordApi(data): Observable<any> {
    try {
      const apiUrl=`${this.BASE_URL}/user/forgot-password`;
      return this.http.post(apiUrl, data);
    } catch (error) {
      console.log(error.message);
    }
  }

    // SUBMIT USER SET NEW PASSWORD FORM API
    setNewPasswordApi(data): Observable<any> {
      try {
        const apiUrl=`${this.BASE_URL}/user/password/set-new-password`;
        return this.http.post(apiUrl, data);
      } catch (error) {
        console.log(error.message);
      }
    }
}

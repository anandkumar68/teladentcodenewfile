import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  BASE_URL = environment.apiBaseUrl;

  constructor(public http: HttpClient) { }

  // USER DOCTOR API LIST
  getUserDoctorlist(data: { limit: any; skip: any; gender: any; speciality: any; }): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/doctor-list?limit=${data.limit}&skip=${data.skip}&gender=${data.gender}&speciality=${data.speciality}`;
      return this.http.get(apiUrl);
    } catch (error) {
      console.log(error.message);
    }
  }

  // USER DOCTOR API SPECIALIST LIST
  getUserSpecialistDoctorlist(): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/doctor-specialiist-list`;
      return this.http.get(apiUrl);
    } catch (error) {
      console.log(error.message);
    }
  }

  // GET AVAILABLE SLOTS
  getDoctorAvailableSlot(): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/available-time-slot`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Doctor Details
  getDoctorDetails(doctorId: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/individual-details/${doctorId}`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  createOrderId(data: { amount: any; currency: string; doctorId: any; }): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/create-razor-order-id`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  verfiyPaymentSignature(data: { razorOrderId: any; razorPayId: any; razorSignature: any; sessionValue: any; }): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/verify-razor-payment-signature`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }



  /********************************* FOR DOCTOR DASHBOARD **********************/

  // USER DOCTOR API LIST
  getDoctorAppiontmentlist(limit: any, skip: any, status: any, startDate: any, endDate: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/get-appointments`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
        params: new HttpParams().set('limit', limit).set('skip', skip).set('status', status).set('startDate', startDate).set('endDate', endDate)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // UPDATE DOCTOR PROFILE
  updateDoctorProfile(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/update-profile`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // UPDATE APPOINTMENT STATUS
  updateAppointmentStatus(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor-appointment-action`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // INDIVIDUAL APPOINTMENT DETAILS
  individualAppointmentDetails(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor-appointment-individual-details`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // DOCTOR SET PASSWORD
  setDoctorDashboardPassword(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor-update-password-from-dashboard`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /********************************* FOR ADMIN DOCTOR PROFILE SETTING DETAILS **********************/

  // USER DOCTOR API LIST
  getDoctorProfileDetails(): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/update-individual-details`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  /********************************* FOR DOCTOR DASHBOARD DETAILS **********************/

  //GET DOCTOR DASHBOARD DETAILS
  getDoctorDashboardDetails(limit: any, skip: any, status: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor-dashboard-details`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
        params: new HttpParams().set('limit', limit).set('skip', skip).set('status', status)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //GET DOCTOR DASHBOARD SIDDEBAR DETAILS
  getDoctorSideBarDetails(): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor-individual-details`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**********************************************************************************/
  /********************************* PATIENT PANEL API START ****************************/
  /**********************************************************************************/


  /********************************* FOR PATIENT DASHBOARD DETAILS *******************/

  //GET PATIENT DASHBOARD DETAILS
  getPatientDashboardDetails(limit: any, skip: any, dashboardType: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/get-dasboard-details`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
        params: new HttpParams().set('limit', limit).set('skip', skip).set('dashboardType', dashboardType)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // RESCHEDULE APPOINTMENT
  rescheduleAppointment(data): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/reschedule-appointment`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // INDIVIDUAL APPOINTMENT PATIENT DETAILS
  individualAppointmentPatDetails(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/individual-appointment-details`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // INDIVIDUAL APPOINTMENT PATIENT DETAILS
  updatePrescription(data: any, appointId: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/update-appt-drug/${appointId}`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // INDIVIDUAL PRESCRIPTION PATIENT DETAILS
  individualPresPatDetails(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/individual-appt-presc-details`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

   // PATIENT SET PASSWORD
   setPatientDashboardPassword(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user-update-password-from-dashboard`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  // INDIVIDUAL PATIENT DETAILS
  individualPatientDetails(): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/individual-details`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

   // UPDATE USER PATIENT PROFILE DETAILS
   updateUserProfileDetails(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/update-details`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // UPDATE USER AVATAR
  updateAvatar(data: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/update-profile`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  /**********************************************************************************/
  /********************************* BLOG API ****************************/
  /**********************************************************************************/


  // BLOG DETAILS ON WEB
  blogDetailsWeb(skip: any, limit: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/list-web-blog?skip=${skip}&limit=${limit}`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // BLOG INDIVIDUAL LIST API
  blogIndividualList(blogId: any): any {
    try {
      let token: any;
      token = localStorage.getItem('adminToken');
      const apiUrl = `${this.BASE_URL}/user/list-web-individual-blog/${blogId}`;
      return this.http.get(apiUrl);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**********************************************************************************/
  /********************************* PDF DOWNLOAD DETAILS API ****************************/
  /**********************************************************************************/

  // BLOG INDIVIDUAL LIST API
  pdfInvoiceDetails(invoiceId: any): any {
    try {

      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/pdf-invoice-details/${invoiceId}`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });

    } catch (error) {
      console.log(error.message);
    }
  }

}

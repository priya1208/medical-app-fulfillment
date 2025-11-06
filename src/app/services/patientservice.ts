import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Patient {
  id?: string;
  first_name: string;
  last_name?: string;
  mobile: string;
  zipcode?: string;
  dob?: string;
  gender?: string;
  blood_group?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'https://dev-api.evitalrx.in/v1/fulfillment/'; 


  constructor(private http: HttpClient) { }

  savePatient(data: any): Observable<any> {
    console.log('Sending patient data:', data); // ✅ debug log
    return this.http.post(this.apiUrl, data);
  }

 

  // getCurrentPatient(): Patient | null {
  //   return this.currentPatient;
  // }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'https://staging-search.evitalrx.in/v1/fulfillment/medicines/pillo/search'; // your Node.js or real API URL
  private apiKey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3'; // replace with actual key

  constructor(private http: HttpClient) {}

  searchMedicines(searchString: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      searchstring: searchString,
      apikey: this.apiKey
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}

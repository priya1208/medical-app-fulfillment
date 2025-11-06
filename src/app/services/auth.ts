import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private Base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //  LOGIN API CALL
  login(mobile: string, password: string): Observable<any> {
    const url = `${this.Base}login`; // example: https://api.evitalrx.com/login
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': environment.apiKey,
    });

    return this.http.post(url, { mobile, password }, { headers }).pipe(
      tap((response: any) => {
        // Store login flag or token after success
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        localStorage.setItem('loggedIn', 'true');
      })
    );
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
  }

  // ✅ CHECK LOGIN STATUS
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }


  searchMedicines(query: string): Observable<any> {
    const url = `${this.Base}medicine/search?query=${query}`;
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(url, { headers });
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  readonly apiUrlUsers = "http://localhost:5030/api/users";
  readonly apiUrlLogintables = "http://localhost:5030/api/loginTables";


  constructor(private http: HttpClient) {}

  register(signupRequest): Observable<any> {
    return this.http.post(this.apiUrlUsers, signupRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) { // Assuming 409 is the status code for email already exists
          return throwError('Email already exists.'); // You can customize the error message here
        } else {
          return throwError('Registration failed. Please try again later.'); // Generic error message
        }
      })
    );
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogintables, loginRequest);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.apiUrlLogintables}?email=${email}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        // Check if response is an array and has length greater than 0
        return Array.isArray(response) && response.length > 0;
      }),
      catchError(() => {
        // Handle errors here if necessary
        return of(false); // Return false in case of error
      })
    );
  }

  getUserInfo(): Observable<any> {
    // Retrieve the authentication token from wherever it's stored (e.g., localStorage)
    const authToken = localStorage.getItem('authToken');

    // Ensure there's a token before making the request
    if (!authToken) {
      throw new Error('Authentication token is missing.');
    }

    // Include the token in the request headers
    const headers = { 'Authorization': 'Bearer ' + authToken };

    // Make the GET request with the headers
    return this.http.get<any>(this.apiUrlUsers, { headers });
  }

  setCurrentUser(user: any): void {
    // Set the current user
  }
}

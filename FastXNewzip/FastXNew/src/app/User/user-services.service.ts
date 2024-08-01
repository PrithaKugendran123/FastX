import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Route } from '../module/admin/services/route.model';
import { Router } from '@angular/router';
import { Seat } from '../Operator/shared/seat.model';
import { Bus } from './bus.model';
import { Booking } from '../Operator/shared/booking.model';
import { Schedule } from '../Operator/shared/schedule.model';
import { User } from '../module/admin/services/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  readonly BppApiUrl = "http://localhost:5030/api/busroutes"; 
  readonly SppApiUrl = "http://localhost:5030/api/seats";
  readonly BusesApiUrl = "http://localhost:5030/api/buses";
  readonly ScheduleApiUrl = 'http://localhost:5030/api/BusSchedules';
  readonly bookingApiUrl = 'http://localhost:5030/api/bookings';
  readonly ApiUrl='http://localhost:5030/api/users'
  public blist: Route[] = [];
  public seats: Seat[] = [];
  public buses: Bus[] = [];
  bppData: Route = new Route();
  selectedSeatNumber: number;
  private currentUserId: number;
  private selectedBusId: number;
  private selectedSeatId: number;
  private bookingData: any;

  constructor(private http: HttpClient, private router: Router) {}

  public getBusRouteList(): Observable<any> {
    return this.http.get<any>(this.BppApiUrl).pipe(
      tap((data) => console.log('Received data:', data)),
      catchError((error) => {
        console.error('Error fetching bus route list:', error);
        return throwError(error);
      })
    );
  }

  public getBusListByRouteId(routeId: number): Observable<any[]> {
    const url = `${this.BppApiUrl}/${routeId}`;
    return this.http.get<any[]>(url);
  }
  
  public checkSeatAvailability(busId: number): void {
    const seatAvailabilityRoute = `/seat-availability/${busId}`;
    this.router.navigate([seatAvailabilityRoute]);
  }

  public getSeatList(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.SppApiUrl); 
  }


  public getBusById(busId: number): Observable<any> {
    const url = `${this.BusesApiUrl}/${busId}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching bus details:', error);
        return throwError(error);
      })
    );
  }
  public getBuses(): Observable<Bus[]> {
    const url = `${this.BusesApiUrl}`;
    return this.http.get<Bus[]>(url);
  }

  public getSeatsByBusId(busId: number): Observable<Seat[]> {
    const url = `${this.SppApiUrl}?busId=${busId}`;
    return this.http.get<Seat[]>(url).pipe(
      tap((data) => console.log('Fetched Seat Availability Data:', data)),
      catchError((error) => {
        console.error('Error fetching seat availability:', error);
        return throwError(error);
      })
    );
  }
  public getScheduleByBusId(busId: number): Observable<Schedule> {
    const url = `${this.ScheduleApiUrl}/ByBusId/${busId}`;
    return this.http.get<Schedule>(url).pipe(
      catchError((error) => {
        console.error('Error fetching schedule details:', error);
        return throwError(error);
      })
    );
  }
  setSelectedBusId(busId: number): void {
    this.selectedBusId = busId;
  }
 
  getSelectedBusId(): number | null {
    return this.selectedBusId;
  }
  public getBookings(bookingId: number): Observable<Booking> {
    const url = `${this.bookingApiUrl}/${bookingId}`;
    return this.http.get<Booking>(url);
  } 

  public postBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingApiUrl, booking);
  }
  

  public setCurrentUserId(userId: number): void {
    this.currentUserId = userId;
    console.log('Current user ID set in service:', this.currentUserId); 
  }
  
  public getCurrentUserId(): number {
    console.log('Getting current user ID:', this.currentUserId); 
    return this.currentUserId;
  }
  setSelectedSeatId(seatId: number): void {
    this.selectedSeatId = seatId;
  }

  getSelectedSeatId(): number {
    return this.selectedSeatId;
  }
  public getScheduleDetailsById(scheduleId: number): Observable<Schedule> {
    const url = `${this.ScheduleApiUrl}/${scheduleId}`;
    return this.http.get<Schedule>(url).pipe(
      tap((data) => console.log('Received schedule details:', data)),
      catchError((error) => {
        console.error('Error fetching schedule details:', error);
        return throwError(error);
      })
    );
  }
  public getBusDetailsById(busId: number): Observable<Bus> {
    const url = `${this.BusesApiUrl}/${busId}`;
    return this.http.get<Bus>(url).pipe(
      catchError((error) => {
        console.error('Error fetching bus details:', error);
        return throwError(error);
      })
    );
  }
  setBookingData(data: any): void {
    this.bookingData = data;
  }

  getBookingData(): any {
    return this.bookingData;
  }
  public getBookingsByUserId(userId: number): Observable<Booking[]> {
    const url = `${this.bookingApiUrl}/user/${userId}`;
    return this.http.get<Booking[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching bookings for user:', error);
        return throwError(error);
      })
    );
  }
  getUser(): Observable<User> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      return throwError("No user ID available");
    }
  
    return this.http.get<User>(`${this.ApiUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching user details:', error);
        return throwError(error);
      })
    );
  }
  

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.ApiUrl}/${user.UserId}`, user).pipe(
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }
}
